/*
** Auth module configuration
** See https://auth.nuxtjs.org/
*/
export const auth = {
  strategies: {
    local: {
      autoFetchUser: false,
      endpoints: {
        login: {
          url: `${process.env.BASE_URL}login`,
          method: 'post',
          propertyName: false,
          headers: {
            'x-gsr-source': 'website'
          }
        },
        user: {
          url: `${process.env.BASE_URL}user`,
          method: 'get',
          propertyName: false,
          headers: {
            'x-gsr-source': 'website'
          }
        },
        logout: false,
      }
    },
    google: {
      autoFetchUser: false,
      client_id: process.env.GOOGLE_CLIENT_ID,
      codeChallengeMethod: '',
      responseType: 'code',
      endpoints: {
        token: `${process.env.BASE_URL}social-login/google`,
        userInfo: `${process.env.BASE_URL}user`
      }
    },
    linkedin: {
      _scheme: 'oauth2',
      authorization_endpoint: 'https://www.linkedin.com/oauth/v2/authorization',
      userinfo_endpoint: 'https://api.linkedin.com/v2/me',
      scope: ['r_liteprofile', 'r_emailaddress'],
      access_type: 'client_credentials',
      access_token_endpoint: 'https://www.linkedin.com/oauth/v2/accessToken',
      response_type: 'code',
      token_type: 'Bearer',
      client_id: process.env.LINKEDIN_CLIENT_ID,
      redirect_uri:`${process.env.APP_URL}/social-login/linkedin`,
    }
  },
  cookie: {
    options: {
      secure: process.env.NODE_ENV === "production", // Enable in Prod only!
      sameSite: 'lax',
    }
  },
  localStorage: false
}
