<template>
  <f7-card class="flip-container">
    <div class="flipper">
      <div class="front">
        <f7-card-header no-border class="popover-member">
          <div class="image" v-if="!member.root" :style=" { backgroundImage: 'url(\''+member.image + '?access_token=' + token +'\')' }"></div>
          <div class="image" v-if="member.root" :style=" { backgroundImage: 'url(\''+member.image + '&sz=100' +'\')' }"></div>
          <img v-if="member.gender == 'm'" class="image placeholder" src="../../../../../css/img/man.png">
          <img v-if="member.gender == 'f'" class="image placeholder" src="../../../../../css/img/woman.png">
  
          <div class="title">{{member.name}}</div>
          <div class="age">Age: 56 Years</div>
        </f7-card-header>
        <f7-card-footer>
          <a href="#" @click="toggle()">
            <f7-icon v-if="isFolder && !open" material="arrow_drop_down"></f7-icon>
            <f7-icon v-if="isFolder && open" material="arrow_drop_up"></f7-icon>
          </a>
        </f7-card-footer>
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