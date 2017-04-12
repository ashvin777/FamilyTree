<template>
  <f7-popover class="popover-member" v-if="member != null">
    <div class="header">
      <div class="image" v-if="member.image" v-bind:style=" { backgroundImage: 'url(\''+member.image + '?access_token=' + token +'\')' }"></div>
      <div class="title">{{member.name}}</div>
    </div>
    <div class="gender" v-show="member.gender">Gender : {{member.gender}}</div>
    <div class="birth"  v-show="member.dob">Birth Date : {{member.dob}}</div>
    <div class="mobile"  v-show="member.phoneNumber">Mobile : {{member.phoneNumber}}</div>
    <div class="email"  v-show="member.email">Email : {{member.email}}</div>
    <div class="buttons">
      <a href="#" class="button button-raised button-fill color-pink open-popup close-popover" data-popup=".popup-member-details" @click="editMember()">
        <i class="icon material-icons">mode_edit</i> Edit
      </a>
      <a href="#" class="button button-raised button-fill color-pink open-popup close-popover" data-popup=".popup-add-member">
        <i class="icon material-icons">add</i> Add Relative
      </a>
      <a href="#" class="button button-raised button-fill color-pink button-icon close-popover" @click="deleteMember()">
       <i class="icon material-icons">delete</i>
      </a>
    </div>
  </f7-popover>
</template>

<script src="./popover-member.js"/>
<style lang="scss" src="./popover-member.scss"/>