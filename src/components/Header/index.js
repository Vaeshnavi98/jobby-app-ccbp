import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-div">
      <Link className="nav-link" to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="logo-deco2"
          alt="website logo"
        />
      </Link>
      <ul className="ul-items">
        <Link className="nav-link" to="/">
          <li className="li-deco">Home</li>
        </Link>
        <Link className="nav-link" to="/jobs">
          <li className="li-deco">Jobs</li>
        </Link>
        <li className="li-deco">
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
