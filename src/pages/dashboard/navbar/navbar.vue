<template>
  <f7-navbar>
    <f7-nav-center sliding>Family Tree</f7-nav-center>
    <f7-nav-right>
      <select v-model="treeName">
        <option v-for="(tree, key) in trees">{{key}}</option>
      </select>
      <f7-link>
        <!--<i class="icon material-icons">face</i>-->
        {{profile.name}}
      </f7-link>
      <f7-link>
        <i class="icon material-icons" @click="logout()">exit_to_app</i>
      </f7-link>
    </f7-nav-right>
  </f7-navbar>
</template>

<script src="./navbar.js"/>
<style lang="scss" src="./navbar.scss"/>