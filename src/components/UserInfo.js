class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._userName.textContent;
    userInfo.about = this._userAbout.textContent;
    return userInfo;
  }

  saveUserId(userId) {
    this._userId = userId;
  }

  getUserId() {
    return this._userId;
  }

  setUserInfo(newUserParameters) {
    this._userName.textContent = newUserParameters.name;
    this._userAbout.textContent = newUserParameters.about;
  }

  setUserAvatar(newUserAvatar) {
    this._userAvatar.src = newUserAvatar;
  }
}

const userInfo = new UserInfo(
  "#profile-name",
  "#profile-about",
  "#profile-avatar"
);

export default userInfo;
