import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    passwordItemsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    showStatus: false,
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onToggleShowPasswords = () => {
    this.setState(prevState => ({
      showStatus: !prevState.showStatus,
    }))
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  getFilterSearchList = () => {
    const {passwordItemsList, searchInput} = this.state
    const filteredSearchResults = passwordItemsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return filteredSearchResults
  }

  onDelete = id => {
    const {passwordItemsList} = this.state
    const filteredList = passwordItemsList.filter(
      eachItem => eachItem.id !== id,
    )

    this.setState({passwordItemsList: filteredList})
  }

  onClickAdd = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    if (websiteInput !== '' && usernameInput !== '' && passwordInput !== '') {
      const updatedPasswordList = {
        id: uuidv4(),
        website: websiteInput,
        username: usernameInput,
        password: passwordInput,
      }

      this.setState(prevState => ({
        passwordItemsList: [
          ...prevState.passwordItemsList,
          updatedPasswordList,
        ],
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
      }))
    }
  }

  render() {
    const {
      passwordItemsList,
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      showStatus,
    } = this.state
    const searchFilteredList = this.getFilterSearchList()
    const count = passwordItemsList.length
    return (
      <div className="app-container">
        <div className="password-manager-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="password-manager-logo"
          />
          <div className="password-input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-image"
            />
            <form
              className="password-input-search-container"
              onSubmit={this.onClickAdd}
            >
              <h1 className="new-password-heading ">Add New Password</h1>
              <div className="logo-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="image"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input-element"
                  onChange={this.onChangeWebsite}
                  value={websiteInput}
                />
              </div>
              <div className="logo-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="image"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input-element"
                  onChange={this.onChangeUsername}
                  value={usernameInput}
                />
              </div>
              <div className="logo-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="image"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input-element"
                  onChange={this.onChangePassword}
                  value={passwordInput}
                />
              </div>
              <div className="button-container ">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="bottom-container">
            <div className="container">
              <div className="passwords-container">
                <h1 className="your-password-heading ">Your Passwords</h1>
                <p className="password-count">{count}</p>
              </div>
              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="image"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  value={searchInput}
                  onChange={this.onSearch}
                />
              </div>
            </div>

            <hr className="header-line" />
            <div className="show-password-container">
              <input
                type="checkbox"
                id="showPasswords"
                onChange={this.onToggleShowPasswords}
                value={showStatus}
              />
              <label htmlFor="showPasswords">Show Passwords</label>
            </div>
            {searchFilteredList.length === 0 ? (
              <div className="no-passwords-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-image"
                />
                <p>No Passwords</p>
              </div>
            ) : (
              <ul className="passwords-list-container">
                {searchFilteredList.map(eachItem => (
                  <PasswordItem
                    passwordDetails={eachItem}
                    showStatus={showStatus}
                    key={eachItem.id}
                    onDelete={this.onDelete}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
