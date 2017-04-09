export default {
  init(callback, error) {
    let vm = this;

    (function(d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s);
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    window.fbAsyncInit = () => {
      FB.init({
        appId: '553330161412370',
        xfbml: true,
        version: 'v1.0',
        status: true,
        cookie: true,
        oauth: true
      });
      FB.getLoginStatus(function(response) {
        callback(response);
      }, function(){
        error();
      })
    }
  },
  getProfile(callback) {
    var self = this;
    FB.api('/me', function(response) {
      callback(response);
    })
  },
  getFriends: function(callback) {
    var self = this;
    FB.api('/me/taggable_friends?fields=id,name,picture.type(large)', function(response) {
      callback(response.data);
    })
  },
  login(callback) {
    FB.login(function(response) {
      callback(response);
    }, {
      scope: 'user_friends, public_profile'
    })
  },
  logout(callback) {
    FB.logout(function(response) {
      callback(response);
    })
  }
}
