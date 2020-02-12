import React, { Component } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'

class AuthorizedUser extends Component {
  state = { signingIn: false }

  componentDidMount() {
    if (window.location.search.match(/code=/)) {
      this.setState({ signingIn: true })
    }
    const code = window.location.search.replace('?code=', '')
    // eslint-disable-next-line no-alert
    alert(code)
    this.props.history.replace('/')
  }

  requestCode() {
    const clientId = process.env.REACT_APP_GITHUB_API_CLIENT_ID
    const githubHost = process.env.REACT_APP_GITHUB_URL
    window.location = `${githubHost}/login/oauth/authorize?client_id=${clientId}&scope=user`
  }

  render() {
    return (
      <button onClick={this.requestCode} disabled={this.state.signingIn}>
        Sign In with GitHub
      </button>
    )
  }
}

AuthorizedUser.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
}

export default withRouter(AuthorizedUser)
