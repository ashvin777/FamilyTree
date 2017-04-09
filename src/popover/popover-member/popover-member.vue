<template>
  <f7-popover class="popover-member" v-if="member != null">
    <div class="row">
      <div class="col-30">
        <div class="image" v-if="!member.picture" v-bind:style=" { backgroundImage: 'url(\'http://graph.facebook.com/'+member.id+'/picture?type=square&height=400\')' }"></div>
        <div class="image" v-if="member.picture" v-bind:style=" { backgroundImage: 'url(\''+member.picture.data.url+'\')' }"></div>
      </div>
      <div class="col-70">
        <div class="title">{{member.name}}</div>
        <div class="gender">Gender : Male</div>
        <div class="marriage">Single/Married : Married</div>
        <div class="birth">Birth Date : 11<sup>th</sup> Feb 1989</div>
        <div class="mobile">Mobile : 8805194648</div>
        <div class="email">Email : ashvin.suthar777@gmail.com</div>
        <div class="buttons">
          <a href="#" class="button button-raised button-fill color-pink open-popup close-popover" data-popup=".popup-member-details" @click="editMember()">
            <i class="f7-icons">compose_fill</i> Edit
          </a>
          <a href="#" class="button button-raised button-fill color-pink open-popup close-popover" data-popup=".popup-add-member">
            <i class="f7-icons">add</i> Add Relative
          </a>
          <a href="#" class="button button-raised button-fill color-pink button-icon" @click="deleteMember()">
            <i class="f7-icons">trash</i>
          </a>
        </div>
      </div>
    </div>
  </f7-popover>
</template>

<script src="./popover-member.js"/>
<style lang="scss" src="./popover-member.scss"/>