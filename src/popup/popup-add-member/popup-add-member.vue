<template>
  <f7-popup class="popup-add-member modal-in">
    <div class="toolbar tabbar">
      <div class="toolbar-inner">
        <a class="tab-link active" href="#tab1">
          <i class="f7-icons">social_facebook_fill</i> Add From Facebook
        </a>
        <a class="tab-link" href="#tab2">
          <i class="f7-icons">compose_fill</i> Add Manualy
        </a>
      </div>
    </div>
    <div class="tabs">
      <div id="tab1" class="tab active">
        <a href="#" class="fb-friend" v-for="friend in friends" >
          <div @click="addMember(friend)">
            <i class="f7-icons">add</i>
            <div class="fb-friend-pic" v-bind:style=" { backgroundImage: 'url(\''+friend.picture.data.url+'\')' }"></div>
            <div class="fb-friend-name">{{friend.name}}</div>
          </div>
        </a>
      </div>
      <div id="tab2" class="tab">
        <p>This is tab 2 content</p>
      </div>
    </div>
  </f7-popup>
</template>

<script src="./popup-add-member.js"/>
<style lang="scss" src="./popup-add-member.scss"/>