<template>
  <f7-subnavbar class="toolbar">
    <f7-link @click.native="$emit('add')">
      <f7-icon material="add"></f7-icon>
    </f7-link>
    <f7-link @click.native="$emit('addRoot')">
      <f7-icon material="person_add"></f7-icon>
    </f7-link>
    <f7-link @click.native="$emit('reset')">
      <f7-icon material="filter_center_focus"></f7-icon>
    </f7-link>
    <f7-link @click.native="$emit('zoomOut')">
      <f7-icon material="zoom_out"></f7-icon>
    </f7-link>
    <f7-link @click.native="$emit('zoomIn')">
      <f7-icon material="zoom_in"></f7-icon>
    </f7-link>
    <!--<f7-link @click.native="$emit('toggleView')">
        <f7-icon material="fullscreen_exit"></f7-icon>
      </f7-link>-->
    <f7-link @click.native="$emit('toggleListView')">
      <f7-icon material="list"></f7-icon>
    </f7-link>
    <f7-link @click.native="$emit('deleteTree')">
      <f7-icon material="delete"></f7-icon>
    </f7-link>
  </f7-subnavbar>
</template>

<script src="./toolbar.js"/>
<style lang="scss" src="./toolbar.scss"/>