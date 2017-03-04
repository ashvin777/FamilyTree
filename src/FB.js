export default {
  init(callback) {
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
        xfbml   : true,
        version : 'v2.0',
        status  : true,
        cookie  : true,
        oauth   : true
      });
      FB.getLoginStatus(function(response) {
        callback(response);
      })
    }
  },
  getProfile(callback) {
    let vm = this
    FB.api('/me', function(response) {
      callback(response);
    })
  },
  getFriends: function(callback) {
    FB.api('/me/taggable_friends?fields=id,name,picture.type(large)', function(response) {
      callback(response);
    })
  },
  getPicture: function(userId){

  },
  login(callback) {
    let vm = this
    FB.login(function(response) {
      callback(response);
    }, {
      scope: 'user_friends, public_profile'
    })
  },
  logout(callback) {
    let vm = this
    FB.logout(function(response) {
      callback(response);
    })
  }
}
