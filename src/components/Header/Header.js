import { useDispatch } from "react-redux";
import * as Actions from '../../actions/index.js'
import React, {useState} from "react"

const Header = () => {

  const [autoPlayStatus, setAutoPlayStatus] = useState(false);
  const dispatch = useDispatch();
  const [category, setCategory] = useState('random');

  const handleAutoplayChk = ()=> {
    setAutoPlayStatus(!autoPlayStatus );
    dispatch(Actions.ChangeAutoPlay(!autoPlayStatus))
  }

  const handleCategoryChkChange = (changedCategory) => {
    setCategory(changedCategory);
    dispatch(Actions.ChangeCategory(changedCategory));
  }

  return <div>
    <table>
      <tr>
        <td>
            <input
              type="checkbox"
              style={{ width: "30px", height: "30px" }}
              className="form-control"
              onClick={handleAutoplayChk}
            />
            <label>Autoplay</label>
        </td>
        <td>
            <input
              type="checkbox"
              style={{ width: "30px", height: "30px" }}
              className="form-control"
              checked={category === 'random'}
              onClick={()=>handleCategoryChkChange('random')}
            />
            <label>Random</label>
        </td>
        <td>
            <input
              type="checkbox"
              style={{ width: "30px", height: "30px" }}
              className="form-control"
              checked={category === 'vegetables'}
              onClick={()=>handleCategoryChkChange('vegetables')}
            />
            <label>Vegetables</label>
        </td>
        <td>
            <input
              type="checkbox"
              style={{ width: "30px", height: "30px" }}
              className="form-control"
              checked={category === 'animals'}
              onClick={()=>handleCategoryChkChange('animals')}
            />
            <label>Animals</label>
        </td>
      </tr>
    </table>
  </div>
}

export default Header;