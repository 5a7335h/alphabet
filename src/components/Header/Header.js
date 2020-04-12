import { useDispatch } from "react-redux";
import * as Actions from '../../actions/index.js'
import React, {useState} from "react"

const Header = () => {

  const [autoPlayStatus, setAutoPlayStatus] = useState(false);
  const dispatch = useDispatch();

  const handleAutoplayChk = ()=> {
    setAutoPlayStatus(!autoPlayStatus );
    dispatch(Actions.ChangeAutoPlay(!autoPlayStatus))
  }

  return <div>
            <input
            type="checkbox"
            style={{ width: "30px", height: "30px" }}
            className="form-control"
            onClick={handleAutoplayChk}
            />
            <label>Autoplay</label>
        </div>
}

export default Header;