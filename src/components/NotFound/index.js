import Header from '../Header'
import './index.css'

const NotFound = props => {
  const {history} = props

  const onClickOfGoHome = () => {
    history.replace('/')
  }

  return (
    <div>
      <Header />
      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="failure-view-image"
        />
        <div className="not-found-info-container">
          <h1 className="text-danger">Page Not Found</h1>
          <p className="error-info">
            We are sorry, the page you requested could not be found
          </p>

          <button
            className="go-home-btn"
            type="button"
            onClick={onClickOfGoHome}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
