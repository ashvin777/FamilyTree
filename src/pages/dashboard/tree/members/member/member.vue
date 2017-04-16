<template>
  <f7-card class="flip-container">
    <div class="flipper">
      <div class="front">
        <div class="image-container">
          <div class="image" v-if="!member.root" :style=" { backgroundImage: 'url(\''+member.image + '?access_token=' + token +'\')' }"></div>
          <div class="image" v-if="member.root" :style=" { backgroundImage: 'url(\''+member.image + '&sz=100' +'\')' }"></div>
          
          <img v-if="member.gender != 'f' && !age" class="image placeholder" src="../../../../../css/img/man.png">
          <img v-if="member.gender != 'f' && age <= 12" class="image placeholder" src="../../../../../css/img/boy.png">
          <img v-if="member.gender != 'f' && age > 12 && age <= 50" class="image placeholder" src="../../../../../css/img/man.png">
          <img v-if="member.gender != 'f' && age > 50" class="image placeholder" src="../../../../../css/img/old-man.png">

          <img v-if="member.gender == 'f' && !age" class="image placeholder" src="../../../../../css/img/woman.png">
          <img v-if="member.gender == 'f' && age <= 12" class="image placeholder" src="../../../../../css/img/girl.png">
          <img v-if="member.gender == 'f' && age > 12 && age <= 50" class="image placeholder" src="../../../../../css/img/woman.png">
          <img v-if="member.gender == 'f' && age > 50" class="image placeholder" src="../../../../../css/img/old-woman.png">
        </div>
        <f7-card-header no-border class="popover-member">
          <div class="title">{{member.name}}</div>
          <div class="age" v-if="age <= 1">{{age}} Year</div>
          <div class="age" v-if="age > 1">{{age}} Years</div>
        </f7-card-header>
      </div>
      <div class="back">
        <div class="buttons">
          <a href="#" class="button button-raised button-fill color-pink open-popover" data-popup=".popover-member" @click="openMemberPopover(member)">
            <i class="icon material-icons">remove_red_eye</i>
          </a>
          <a href="#" class="button button-raised button-fill color-pink open-popup" data-popup=".popup-member-details" @click="editMember()">
            <i class="icon material-icons">mode_edit</i>
          </a>
          <a href="#" class="button button-raised button-fill color-pink open-popup" data-popup=".popup-add-member" @click="addMember()">
            <i class="icon material-icons">add</i>
          </a>
          <a href="#" class="button button-raised button-fill color-pink" @click="deleteMember()">
            <i class="icon material-icons">delete</i>
          </a>
        </div>
      </div>
    </div>
  </f7-card>
</template>

<script src="./member.js"/>
<style lang="scss" src="./member.scss"/>