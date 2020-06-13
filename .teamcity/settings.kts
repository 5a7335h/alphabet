import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2019_2.projectFeatures.githubConnection
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.finishBuildTrigger
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.vcs

/*
The settings script is an entry point for defining a TeamCity
project hierarchy. The script should contain a single call to the
project() function with a Project instance or an init function as
an argument.

VcsRoots, BuildTypes, Templates, and subprojects can be
registered inside the project using the vcsRoot(), buildType(),
template(), and subProject() methods respectively.

To debug settings scripts in command-line, run the

    mvnDebug org.jetbrains.teamcity:teamcity-configs-maven-plugin:generate

command and attach your debugger to the port 8000.

To debug in IntelliJ Idea, open the 'Maven Projects' tool window (View
-> Tool Windows -> Maven Projects), find the generate task node
(Plugins -> teamcity-configs -> teamcity-configs:generate), the
'Debug' option is available in the context menu for the task.
*/

version = "2020.1"

project {

    buildType(BuildDockerImage)
    buildType(PublishDockerImage)
    buildType(Deploy)

    features {
        githubConnection {
            id = "PROJECT_EXT_2"
            displayName = "GitHub.com"
            clientId = "bc439535b8fa6b1d0cc0"
            clientSecret = "credentialsJSON:a120e2c9-ce8c-4251-9851-61ee7afcd6cc"
        }
    }
    buildTypesOrder = arrayListOf(BuildDockerImage)
}

object BuildDockerImage : BuildType({
    name = "BuildDockerImage"

    vcs {
        root(DslContext.settingsRoot)
    }

    steps {
        script {
            scriptContent = """
                docker build -t alphabetui:1.0.${'$'}BUILD_NUMBER .
            """.trimIndent()
        }
    }

    triggers {
        vcs {
            branchFilter = ""
            perCheckinTriggering = true
            enableQueueOptimization = false
        }
    }
})

object PublishDockerImage : BuildType({
    name = "PublishDockerImage"

    vcs {
        root(DslContext.settingsRoot)
    }

    steps {
        script {
            scriptContent = """
                cat /home/pi/secret/teamcity-docker-password.txt | docker login --username spagolu9 --password-stdin
                docker tag alphabetui:1.0.${'$'}BUILD_NUMBER spagolu9/alphabet-ui:1.0.${'$'}BUILD_NUMBER
                docker push spagolu9/alphabet-ui:1.0.${'$'}BUILD_NUMBER
                echo "##teamcity[setParameter name='env.CurrentImageName' value='spagolu9/alphabet-ui:1.0.${'$'}BUILD_NUMBER']"
            """.trimIndent()
        }
    }

    triggers {
        finishBuildTrigger {
            buildType = "${BuildDockerImage.id}"
            successfulOnly = true
        }
    }

    dependencies {
        snapshot(BuildDockerImage) {
            onDependencyFailure = FailureAction.CANCEL
            onDependencyCancel = FailureAction.CANCEL
        }
    }
})

object Deploy : BuildType({
    name = "Deploy"

    vcs {
        root(DslContext.settingsRoot)
    }

    steps {
        script {
            scriptContent = """
                docker stop alphabet-ui
                docker rm alphabet-ui
                docker run -d --name=alphabet-ui -p 5018:5004 --restart=always ${PublishDockerImage.depParamRefs["env.CurrentImageName"]}
            """.trimIndent()
        }
    }

    triggers {
        finishBuildTrigger {
            buildType = "${PublishDockerImage.id}"
            successfulOnly = true
        }
    }

    dependencies {
        snapshot(PublishDockerImage) {
            onDependencyFailure = FailureAction.CANCEL
            onDependencyCancel = FailureAction.CANCEL
        }
    }
})
