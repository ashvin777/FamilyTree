<template>
<div>
  <Modal v-if="showModal" @close="showModal = false" class="friends-modal">
    <h3 slot="header">
      <md-input-container md-inline>
       <label>Search</label>
       <md-input v-model="query"></md-input>
     </md-input-container>
    </h3>
    <div slot="body">
      <div class="friends-modal-body">
        <md-card md-with-hover v-for="friend in friends" :key="friend.id">
          <md-card-media>
            <md-card-media md-ratio="1:1">
              <img :src="friend.picture.data.url">
            </md-card-media>
            <md-card-area>
              <md-card-header>
                <input v-model="friend.name" disabled="" />
              </md-card-header>

              <md-card-actions>
                <md-button class="md-icon-button">
                  <md-icon>person_add</md-icon>
                </md-button>
              </md-card-actions>
            </md-card-area>
          </md-card-media>
        </md-card>
        <infinite-loading :on-infinite="loadMoreFriends" ref="infiniteLoading"></infinite-loading>
      </div>
    </div>
    <div slot="footer"></div>
  </Modal>
  <button id="show-modal" @click="showModal = true">Show Modal</button>
</div>
</template>

<script>
import Modal from "../components/Modal.vue"
import FB from "../service/FB"
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: "FacebookFriendsPicker",
  components: {
    Modal,
    InfiniteLoading
  },
  data: () => {
    return {
      friendsFullList: [],
      friends: [],
      showModal: false,
      query: ""
    }
  },
  mounted() {
    var self = this;
    FB.getFriendsAndAccountDetails((profile, friends) => {
      self.friendsFullList = friends;
      self.loadMoreFriends();
    });
  },
  watch: {
    query() {
      var self = this;
      if (self.query.length > 2) {
        setTimeout(() => {
          this.friends = this.friendsFullList.filter(function(friend) {
            return friend.name.toLowerCase().indexOf(self.query.toLowerCase()) > -1
          });
          this.friends = this.friends.slice(0, 20);
        }, 1000);
      }
    }
  },
  methods: {
    loadMoreFriends() {
      let self = this;
      setTimeout(() => {
        console.log("loadMoreFriends")
        if (this.friendsFullList.length > 0) {
          var length = this.friends.length;
          this.friends = this.friendsFullList.slice(0, length + 10);
          if (this.$refs.infiniteLoading)
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
        }
      });
    }
  }
}
</script>

<style lang="scss">
.friends-modal {
    .modal-container {
        width: 80%;
        height: 80%;
        color: black;
        background: white;
        .md-card {
            width: calc( 92% / 5 );
            float: left;
            margin: 1%;
            &:first-child,
            &:nth-child(5n + 1) {
                margin-left: 0;
            }
            &:nth-child(5n) {
                margin-right: 0;
            }
        }
        .md-input-container,
        .md-input-focused {}
        .friends-modal-title {
            line-height: 50px;
        }
        .friends-modal-body {
            max-height: 400px;
            overflow: scroll;
        }
    }
}
@media only screen and (max-width: 500px) {
    .friends-modal .modal-container {
        height: 100%;
        width: 100%;
        .md-card {
            width: calc( 90% / 2 );
            float: left;
            margin: 5%;
            &:nth-child(5n + 1) {
                margin: 5%;
            }
            &:nth-child(5n) {
                margin: 5%;
            }
            &:nth-child(1),
            &:nth-child(2n + 1){
              margin-left:0px;
            }
            &:nth-child(2n){
              margin-left:0px;
            }
        }
        .friends-modal-body {
            max-height: 500px;
        }
    }
}
</style>
