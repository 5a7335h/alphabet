FROM node:latest as base
WORKDIR /artifacts
COPY . .
RUN npm install
RUN npm run build

FROM node:latest as server
WORKDIR /app
COPY --from=base /artifacts/build ./build
RUN npm install -g serve
ENTRYPOINT ["serve", "-s", "build", "-l", "5004"]