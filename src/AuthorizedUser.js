import React, { Component } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { ROOT_QUERY } from './App'

const GITHUB_AUTH_MUTATION = gql`
  mutation githubAuth($code: String!) {
    githubAuth(code: $code) {
      token
    }
  }
`

class AuthorizedUser extends Component {
  state = { signingIn: false }

  authorizationComplete = (cache, { data }) => {
    localStorage.setItem('token', data.githubAuth.token)
    this.props.history.replace('/')
    this.setState({ signingIn: false })
  }

  componentDidMount() {
    if (window.location.search.match(/code=/)) {
      this.setState({ signingIn: true })
      const code = window.location.search.replace('?code=', '')
      this.githubAuthMutation({ variables: { code } })
    }
  }

  requestCode() {
    const clientId = process.env.REACT_APP_GITHUB_API_CLIENT_ID
    const githubHost = process.env.REACT_APP_GITHUB_URL
    window.location = `${githubHost}/login/oauth/authorize?client_id=${clientId}&scope=user`
  }

  render() {
    return (
      <Mutation
        mutation={GITHUB_AUTH_MUTATION}
        update={this.authorizationComplete}
        refetchQueries={[{ query: ROOT_QUERY }]}
      >
        {mutation => {
          this.githubAuthMutation = mutation
          return (
            <button onClick={this.requestCode} disabled={this.state.signingIn}>
              Sign In with GitHub
            </button>
          )
        }}
      </Mutation>
    )
  }
}

AuthorizedUser.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
}

export default withRouter(AuthorizedUser)
