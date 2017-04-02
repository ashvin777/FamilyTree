<template>
  <f7-card class="popover-member open-popover" @click.native="openMemberPopover(member)">
    <f7-card-header no-border v-if="!member.picture" v-bind:style=" { backgroundImage: 'url(\'http://graph.facebook.com/'+member.id+'/picture?type=square&height=400\')' }">
      <input v-model="member.name" />
    </f7-card-header>
    <f7-card-header no-border v-if="member.picture" v-bind:style=" { backgroundImage: 'url(\''+member.picture.data.url+'\')' }">
      <input v-model="member.name" />
    </f7-card-header>
    <f7-card-footer>
      <f7-link @click.native="toggle()">
        <f7-icon v-if="isFolder && !open" material="arrow_drop_down"></f7-icon>
        <f7-icon v-if="isFolder && open" material="arrow_drop_up"></f7-icon>
      </f7-link>
    </f7-card-footer>
  </f7-card>
</template>

<script src="./member.js"/>
<style lang="scss" src="./member.scss"/>