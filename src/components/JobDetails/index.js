import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class JobDetails extends Component {
  state = {
    jobDetailsList: [],
    apiStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getEachJobDetails()
  }

  getEachJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const jwtToken = Cookies.get('jwt_token')
    const {id} = params

    this.setState({apiStatus: 'INPROGRESS'})
    const url = `https://apis.ccbp.in/jobs/${id}`
    console.log(url)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(eachSkill => ({
          name: eachSkill.name,
          imageUrl: eachSkill.image_url,
        })),
        title: data.job_details.title,
        similarJobs: data.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          rating: eachJob.rating,
          title: eachJob.title,
          location: eachJob.location,
        })),
      }
      this.setState({jobDetailsList: updatedData, apiStatus: 'SUCCESS'})
    } else if (response.ok === 404) {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  jobItemDetails = () => {
    const {jobDetailsList} = this.state
    console.log(jobDetailsList.skills)

    return (
      <div className="jobDetails-section-container">
        <Header />
        <div className="empty-div">
          <div className="details-container">
            <div>
              <div className="logo-div-deco">
                <img
                  src={jobDetailsList.companyLogoUrl}
                  alt="job details company logo"
                  className="company-logo-deco"
                />
                <div className="container-margin">
                  <h3 className="title-heading">{jobDetailsList.title}</h3>
                  <div className="rating-container">
                    <AiFillStar className="rating-icon" />
                    <p className="rating-heading">{jobDetailsList.rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-package-container">
                <div className="location-employee-container">
                  <div className="location-container">
                    <GoLocation className="location-icon" />
                    <p className="location-heading">
                      {jobDetailsList.location}
                    </p>
                    <BsBriefcase className="brief-case-icon" />
                    <p className="location-heading">
                      {jobDetailsList.employmentType}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="package-heading">
                    {jobDetailsList.packagePerAnnum}
                  </p>
                </div>
              </div>
              <hr className="line" />
              <div>
                <div className="description-container">
                  <h1 className="description-heading">Description</h1>
                  <p className="visit">
                    <a
                      href={`${jobDetailsList.companyWebsiteUrl}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Visit
                    </a>
                  </p>
                </div>
                <p className="description-text">
                  {jobDetailsList.jobDescription}
                </p>
              </div>
            </div>
            <div>
              <h1 className="text">Skills</h1>
              <div>
                <ul className="empty-skills-container">
                  {jobDetailsList.skills.map(eachItem => (
                    <li className="skills-container">
                      <img
                        src={eachItem.imageUrl}
                        alt={eachItem.name}
                        className="skills-image"
                      />
                      <p className="text">{eachItem.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h1 className="text">Life at Company</h1>
              <div className="life-at-company-container">
                <p className="description-text">
                  {jobDetailsList.lifeAtCompany.description}
                </p>
                <img
                  src={jobDetailsList.lifeAtCompany.imageUrl}
                  alt="life at company"
                />
              </div>
            </div>
          </div>
          <div className="align-self-container">
            <h1>Similar Jobs</h1>
            <ul className="similar-jobs-container">
              {jobDetailsList.similarJobs.map(eachItem => (
                <li className="similar-jobs-item" key={eachItem.id}>
                  <div className="logo-div-deco">
                    <img
                      src={eachItem.companyLogoUrl}
                      alt="similar job company logo"
                      className="company-logo-deco"
                    />
                    <div className="container-margin">
                      <h3 className="title-heading">{eachItem.title}</h3>
                      <div className="rating-container">
                        <AiFillStar className="rating-icon" />
                        <p className="rating-heading">{eachItem.rating}</p>
                      </div>
                    </div>
                  </div>
                  <h1 className="description-heading">Description</h1>
                  <p className="description-text">{eachItem.jobDescription}</p>
                  <div className="location-container">
                    <GoLocation className="location-icon" />
                    <p className="location-heading">{eachItem.location}</p>
                    <BsBriefcase className="brief-case-icon" />
                    <p className="location-heading">
                      {eachItem.employmentType}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderItemLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderItemFailureView = () => {
    const onClickOfRetry = () => {
      this.getEachJobDetails()
    }

    return (
      <div>
        <Header />
        <div className="not-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="failure-view-image"
          />
          <div className="not-found-info-container">
            <h1 className="text-danger">Oops! Something Went Wrong</h1>
            <p className="error-info">
              We cannot seem to find the page you are looking for
            </p>

            <button
              className="go-home-btn"
              type="button"
              onClick={onClickOfRetry}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  getFinalJobItemDetails = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case 'SUCCESS':
        return this.jobItemDetails()
      case 'INPROGRESS':
        return this.renderItemLoadingView()
      case 'FAILURE':
        return this.renderItemFailureView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.getFinalJobItemDetails()}</div>
  }
}
export default JobDetails
