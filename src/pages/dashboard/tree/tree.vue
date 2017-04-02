<template>
  <div class="tree">
    <toolbar @reset=" onResetClick " @zoomIn="onZoomInClick " @zoomOut="onZoomOutClick "></toolbar>
    <ul v-bind:style="{ transform: 'scale('+zoom+ ')' } ">
      <members :model="treeData" v-if="treeData"></members>
    </ul>
  </div>
</template>

<script src="./tree.js"/>
<style lang="scss" src="./tree.scss"/>