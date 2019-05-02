const I = actor();

module.exports = {
  fields: {
    okta_username: '#okta-signin-username',
    okta_passwd: '#okta-signin-password',
  },
  okta_login_button: '#okta-signin-submit',

  login(username, password) {
    I.fillField(this.fields.okta_username, username)
    I.fillField(this.fields.okta_passwd, password)
    I.click(this.okta_login_button)
  }
};
