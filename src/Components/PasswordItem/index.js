import './index.css'

const PasswordItem = props => {
  const {passwordDetails, showStatus, onDelete} = props
  const {website, username, password, id} = passwordDetails
  const logo = website[0].toUpperCase()

  const onClickDeleteButton = () => {
    onDelete(id)
  }

  return (
    <li className="password-item-list-container">
      <div className="first-name-container">
        <h1 className="first-letter">{logo}</h1>
      </div>
      <div>
        <p className="website-name">{website}</p>
        <p className="name">{username}</p>
        {showStatus ? (
          <p className="name">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="masked-password"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-icon-button"
        onClick={onClickDeleteButton}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}
export default PasswordItem
