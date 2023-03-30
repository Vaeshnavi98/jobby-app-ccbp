import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const JobItems = props => {
  const {jobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobItem

  return (
    <Link to={`/jobs/${id}`} class="link-item">
      <div className="job-item-div">
        <div className="logo-div-deco">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-deco"
          />
          <div className="container-margin">
            <h3 className="title-heading">{title}</h3>
            <div className="rating-container">
              <AiFillStar className="rating-icon" />
              <p className="rating-heading">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-container">
          <div className="location-employee-container">
            <div className="location-container">
              <GoLocation className="location-icon" />
              <p className="location-heading">{location}</p>
              <BsBriefcase className="brief-case-icon" />
              <p className="location-heading">{employmentType}</p>
            </div>
          </div>
          <div>
            <p className="package-heading">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />
        <div>
          <h1 className="description-heading">Description</h1>
          <p className="description-text">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobItems
