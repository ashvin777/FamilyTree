export default {
  profile: {},
  friends: [],
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
        xfbml: true,
        version: 'v2.0',
        status: true,
        cookie: true,
        oauth: true
      });
      FB.getLoginStatus(function(response) {
        callback(response);
      })
    }
  },
  getProfile(callback) {
    var self = this;
    if (Object.keys(self.profile).length > 0) {
      callback(self.profile);
    } else {
      FB.api('/me', function(response) {
        self.profile = response;
        callback(response);
      })
    }
  },
  getFriends: function(callback) {
    var self = this;
    if (self.friends.length > 0) {
      callback(self.friends);
    } else {
      FB.api('/me/taggable_friends?fields=id,name,picture.type(large)', function(response) {
        self.friends = response.data;
        callback(response.data);
      })
    }
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
  },
  getFriendsAndAccountDetails(callback) {
    var self = this;
    if (Object.keys(self.profile).length > 0 && self.friends.length > 0) {
      callback(self.profile, self.friends);
    } else {
      self.init(function(response) {
        if (response.status === 'connected') {
          self.onLoginSuccess(callback);
        } else if (response.status === 'not_authorized') {
          self.login(function() {
            self.onLoginSuccess(callback);
          });
        } else {
          console.log("other login error");
        }
      });
    }
  },
  onLoginSuccess(callback) {
    let self = this;
    if (Object.keys(self.profile).length > 0) {
      self.onProfileSuccess(self.profile, callback);
    } else {
      self.getProfile(function(profile) {
        self.profile = profile;
        self.onProfileSuccess(profile, callback);
      });
    }
  },
  onProfileSuccess(profile, callback) {
    let self = this;
    if (self.friends.length > 0) {
      callback(profile, self.friends);
    } else {
      self.getFriends(function(friends) {
        self.friends = friends;
        callback(profile, friends);
      });
    }
  }
}
