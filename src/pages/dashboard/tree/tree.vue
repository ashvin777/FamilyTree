<template>
  <div class="tree">
    <toolbar @reset=" onResetClick " @zoomIn="onZoomInClick " @zoomOut="onZoomOutClick" @toggleView="toggleView" @add="add"></toolbar>
    <ul v-bind:style="{ transform: 'scale('+zoom+ ')' } " :class="view">
      <members :model="treeData" v-if="treeData"></members>
    </ul>
  </div>
</template>

<script src="./tree.js"/>
<style lang="scss" src="./tree.scss"/>