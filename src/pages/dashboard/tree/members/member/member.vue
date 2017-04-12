<template>
  <f7-card>
    <f7-card-header no-border class="popover-member open-popover" @click.native="openMemberPopover(member)">
      <div class="image" v-if="!member.root" :style=" { backgroundImage: 'url(\''+member.image + '?access_token=' + token +'\')' }"></div>
      <div class="image" v-if="member.root" :style=" { backgroundImage: 'url(\''+member.image + '&sz=100' +'\')' }"></div>
      <img class="image placeholder" src="../../../../../css/img/man.png">

      <div class="title">{{member.name}}</div>
      <div class="age">Age: 56 Years</div>
    </f7-card-header>
    <f7-card-footer>
      <a href="#" @click="toggle()">
        <f7-icon v-if="isFolder && !open" material="arrow_drop_down"></f7-icon>
        <f7-icon v-if="isFolder && open" material="arrow_drop_up"></f7-icon>
      </a>
    </f7-card-footer>
  </f7-card>
</template>

<script src="./member.js"/>
<style lang="scss" src="./member.scss"/>