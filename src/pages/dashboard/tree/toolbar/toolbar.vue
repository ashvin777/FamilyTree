<template>
  <f7-subnavbar class="toolbar">
    <f7-link @click.native="$emit('reset')">
      <f7-icon material="face"></f7-icon>
    </f7-link>
    <f7-link @click.native="$emit('zoomOut')">
      <f7-icon material="zoom_out"></f7-icon>
    </f7-link>
    <f7-link @click.native="$emit('zoomIn')">
      <f7-icon material="zoom_in"></f7-icon>
    </f7-link>
  </f7-subnavbar>
</template>

<script src="./toolbar.js"/>
<style lang="scss" src="./toolbar.scss"/>