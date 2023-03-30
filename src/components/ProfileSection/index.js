import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class ProfileSection extends Component {
  state = {
    profileDetails: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data.profile_details.name)
      //   const updatedData = data.profile_details.map(eachItem => ({
      //     name: eachItem.name,
      //     profileImgUrl: eachItem.profile_image_url,
      //     shortBio: eachItem.short_bio,
      //   }))
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      console.log(updatedData)
      this.setState({profileDetails: updatedData})
    }
  }

  render() {
    const {profileDetails} = this.state
    const {name, shortBio} = profileDetails

    return (
      <div className="profile-div">
        <img
          src={profileDetails.profileImageUrl}
          alt="profile"
          className="profile-deco"
        />
        <h1 className="profile-head">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }
}

export default ProfileSection
