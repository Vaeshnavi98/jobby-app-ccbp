import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'

import ProfileSection from '../ProfileSection'
import JobItems from '../JobItems'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

class Jobs extends Component {
  state = {
    jobsList: [],

    apiStatus: 'INITIAL',
    employmentType: '',
    salaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {employmentType, salaryRange, searchInput} = this.state

    this.setState({
      apiStatus: 'INPROGRESS',
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,

        apiStatus: 'SUCCESS',
      })
    } else if (response.ok === 404) {
      this.setState({
        apiStatus: 'FAILURE',
      })
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    return (
      <div>
        {jobsList.length === 0 ? (
          <div className="no-job-image-div">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs"
            />
            <div>
              <h1 className="text">No Jobs Found</h1>
              <p className="text">
                We could not find any jobs. Try another filters.
              </p>
            </div>
          </div>
        ) : (
          <div>
            {jobsList.map(eachItem => (
              <JobItems jobItem={eachItem} key={eachItem.id} />
            ))}
          </div>
        )}
      </div>
    )
  }

  renderJobsFailureView = () => {
    const onClickOfRetry = () => {
      this.getJobsList()
    }

    return (
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
    )
  }

  renderLoadingView = () => (
    <div className="loading-div" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onChangeEmploymentType = event => {
    const {employmentType} = this.state

    this.setState(
      {employmentType: [...employmentType, event.target.value]},
      this.getJobsList,
    )
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  onChangeSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.getJobsList)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getFinalJobsList = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderJobsList()
      case 'FAILURE':
        return this.renderJobsFailureView()
      case 'INPROGRESS':
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div>
        <Header />
        <div className="jobs-div">
          <div className="profile-section-div1">
            <ProfileSection />
            <hr />
            <div>
              <h1>Type of Employment</h1>
              <ul>
                {employmentTypesList.map(eachItem => (
                  <li key={eachItem.id} className="list">
                    <input
                      type="checkbox"
                      id={eachItem.employmentTypeId}
                      name="fav_language"
                      value={eachItem.employmentTypeId}
                      onChange={this.onChangeEmploymentType}
                    />
                    <label htmlFor="FULLTIME" className="filter-label">
                      {eachItem.label}
                    </label>
                    <br />
                  </li>
                ))}
              </ul>
              {/* <input
                type="checkbox"
                id="FULLTIME"
                name="fav_language"
                value="FULLTIME"
                onChange={this.onChangeEmploymentType}
              />
              <label htmlFor="FULLTIME" className="filter-label">
                Full Time
              </label>
              <br />
              <input
                type="checkbox"
                id="PARTTIME"
                name="fav_language"
                value="PARTTIME"
                onChange={this.onChangeEmploymentType}
              />
              <label htmlFor="PARTTIME" className="filter-label">
                Part Time
              </label>
              <br />
              <input
                type="checkbox"
                id="FREELANCE"
                name="fav_language"
                value="FREELANCE"
                onChange={this.onChangeEmploymentType}
              />
              <label htmlFor="FREELANCE" className="filter-label">
                Freelance
              </label>
              <br />
              <input
                type="checkbox"
                id="INTERNSHIP"
                name="fav_language"
                value="INTERNSHIP"
                onChange={this.onChangeEmploymentType}
              />
              <label htmlFor="INTERNSHIP" className="filter-label">
                Internship
              </label> */}
              <br />
              <hr className="line-break" />
              <h1 className="filter-heading">Salary Range</h1>
              <ul>
                {salaryRangesList.map(eachItem => (
                  <li key={eachItem.id} className="list">
                    <input
                      type="radio"
                      id={eachItem.salaryRangeId}
                      name="fav_language"
                      value={eachItem.salaryRangeId}
                      onChange={this.onChangeSalaryRange}
                    />
                    <label
                      htmlFor={eachItem.salaryRangeId}
                      className="filter-label"
                    >
                      {eachItem.label}
                    </label>
                    <br />
                  </li>
                ))}
              </ul>
              {/* <input
                type="radio"
                id="1000000"
                name="fav_language"
                value="1000000"
                onChange={this.onChangeSalaryRange}
              />
              <label htmlFor="1000000" className="filter-label">
                10LPA and above
              </label>
              <br />
              <input
                type="radio"
                id="2000000"
                name="fav_language"
                value="2000000"
                onChange={this.onChangeSalaryRange}
              />
              <label htmlFor="2000000" className="filter-label">
                20LPA and above
              </label>
              <br />
              <input
                type="radio"
                id="3000000"
                name="fav_language"
                value="3000000"
                onChange={this.onChangeSalaryRange}
              />
              <label htmlFor="3000000" className="filter-label">
                30LPA and above
              </label>
              <br />
              <input
                type="radio"
                id="4000000"
                name="fav_language"
                value="4000000"
                onChange={this.onChangeSalaryRange}
              />
              <label htmlFor="4000000" className="filter-label">
                40LPA and above
              </label>
              <br /> */}
            </div>
          </div>
          <div className="jobs-list-deco1">
            <div className="search-container">
              <input
                type="search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
                className="search-input"
                placeholder="Search"
                onKeyDown={this.onEnterSearchInput}
              />
              <div className="search-icon-container">
                <AiOutlineSearch fill="white" />
              </div>
            </div>
            {this.getFinalJobsList()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
