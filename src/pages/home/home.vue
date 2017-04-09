<template>
  <f7-page name="home" class="home">
    <div class="home-section">
      <img class="app-logo" src="../../css/img/tree.png">
      <h1>Welcome to Family Tree App</h1>

      <span class="preloader color-blue" v-show="googleStatus == 'sdk:loading'"></span>
      <span class="login-status" v-if="googleStatus == 'login:not_authorized'">Sorry, you are not authorized to login with Facebook</span>
      <span class="login-status" v-if="googleStatus == 'login:connected' && (contacts.length == 0 || !profile)">Loading Profile and Friends Details...</span>
      <span class="login-status" v-if="googleStatus == 'login:connected' && contacts.length > 0 && profile">Loading Dashboard...</span>
  
      <f7-button @click="loginGoogle" v-show="googleStatus == 'sdk:loaded'" class="button button-round button-fill">
        <i class="f7-icons">social_googleplus</i> Continue with Google
      </f7-button>

      <f7-button @click="loginGoogle" v-show="googleStatus == 'login:not_authorized'" class="button button-round button-fill">
        Try Again
      </f7-button>
    </div>
  </f7-page>
</template>

<script src="./home.js"/>
<style lang="scss" src="./home.scss">