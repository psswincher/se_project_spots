import { userProfileSettings } from "../utils/constants.js"; 

export default class UserProfile {
    constructor({ userName = userProfileSettings.defaultUsername, profileDescription = userProfileSettings.defaultDescription, imageUrl = userProfileSettings.defaultProfileImage, initialize } = {}) {
        this._userName = document.querySelector(userProfileSettings.profileNameSelector);
        this._userProfileDescription = document.querySelector(userProfileSettings.profileDescriptionSelector);
        this._userProfileAvatar = document.querySelector(userProfileSettings.profileAvatarSelector);
        this.setUserName(userName);
        this.setUserDescription(profileDescription);
        this.setUserImage(imageUrl);
        this.initialize = initialize;
    }

    setUserName(userName = userProfileSettings.defaultUsername) {
        this._userName.textContent = userName;
    }

    setUserDescription(profileDescription = userProfileSettings.defaultDescription) {
        this._userProfileDescription.textContent = profileDescription;
    }

    setUserImage(imageUrl = userProfileSettings.defaultProfileImage) {
        this._userProfileAvatar.setAttribute('src',imageUrl);
    }

    setProfileData({userName = userProfileSettings.defaultUsername, profileDescription = userProfileSettings.defaultDescription, imageUrl = userProfileSettings.defaultProfileImage} = {}) {
        this.setUserName(userName);
        this.setUserDescription(profileDescription);
        this.setUserImage(imageUrl);
    }

    getUserProfile() {
        return {"profile-name": this._userName.textContent, "profile-description": this._userProfileDescription.textContent } 
    }
    
}