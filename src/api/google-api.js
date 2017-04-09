export default {
  token: null,
  endpoint: 'https://www.google.com/m8/feeds',
  scope: 'https://www.google.com/m8/feeds https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me',
  scriptUrl: '//apis.google.com/js/client.js',
  client_id: '503829874595-v48nmlefgvstk57d5h9p64upnmgor7sc.apps.googleusercontent.com',
  init(success, failure) {
    let self = this;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function () {
      setTimeout(function () { success() }, 1000);
    };
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = "//apis.google.com/js/client.js";
  },
  login: function (success, failure) {
    let self = this;
    var config = {
      'client_id': this.client_id,
      'scope': this.scope
    };
    gapi.auth.authorize(config, function () {
      self.token = gapi.auth.getToken();
      console.log(self.token);
      success(self.token);
    });
  },
  getContacts: function (success, failure) {
    let self = this;
    var url = this.endpoint + "/contacts/default/full?alt=json&max-results=10000000";
    $.ajax({
      url: url,
      dataType: "jsonp",
      data: self.token
    }).done(success).fail(failure);
  },
  getContactPhoto: function(contact, success, failure){
    let self = this;
    var url = this.endpoint + "/photos/media/default/"+contact.id;
    $.ajax({
      url: url,
      methods: "GET",
      data: { access_token : self.token.access_token }
    }).done(success).fail(failure);
  },
  getProfile: function (success, failure) {
    let self = this;
    var url = "https://www.googleapis.com/plus/v1/people/me";
    $.ajax({
      url: url,
      dataType: "jsonp",
      data: { access_token : self.token.access_token }
    }).done(success).fail(failure);
  }
}