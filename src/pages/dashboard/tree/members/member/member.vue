<template>
  <f7-card>
    <!--<f7-card-header no-border v-if="!member.picture" v-bind:style=" { backgroundImage: 'url(\'http://graph.facebook.com/'+member.id+'/picture?type=square&height=400\')' }" class="popover-member open-popover" @click.native="openMemberPopover(member)">
      <div class="title">{{member.name}}</div>
    </f7-card-header>-->
    <f7-card-header no-border v-bind:style=" { backgroundImage: 'url()' }" class="popover-member open-popover" @click.native="openMemberPopover(member)">
      <div class="title">{{member.name}}</div>
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