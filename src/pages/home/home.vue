<template>
  <f7-page name="home" class="home">
    <div class="home-section">
      <img class="app-logo" src="../../css/img/tree.png">
      <h1>Welcome to Family Tree App</h1>

      <span class="preloader color-blue" v-show="fbStatus == 'sdk:loading'"></span>
      <span class="login-status" v-if="fbStatus == 'login:not_authorized'">Sorry, you are not authorized to login with Facebook</span>
      <span class="login-status" v-if="fbStatus == 'login:connected' && friends.length == 0 && !profile">Loading Profile and Friends Details...</span>
      <span class="login-status" v-if="fbStatus == 'login:connected' && friends.length > 0 && profile">Loading Dashboard...</span>
  
      <f7-button @click="loginFacebook" v-show="fbStatus == 'sdk:loaded'" class="button button-round color-blue button-fill">
        Continue with Facbook
      </f7-button>

      <f7-button @click="loginFacebook" v-show="fbStatus == 'login:not_authorized'" class="button button-round color-blue button-fill">
        Try Again
      </f7-button>
    </div>
  </f7-page>
</template>

<script src="./home.js"/>
<style lang="scss" src="./home.scss">