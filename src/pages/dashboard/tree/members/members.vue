<template>
  <li>
    <div class="node" v-for="partner in model.partners" :key="partner.id" :class="{ 'partners' : model.partners.length > 1,  'open' : open, 'root' : !$parent.model}">
      <member :model="model" :member="partner" @open-action="onOpenAction"></member>
  
      <a href="#" @click="toggle()" class="toggle" :class="{ 'toggle-center' : model.partners.length > 1 }">
        <f7-icon v-if="isFolder && !open" material="arrow_drop_down"></f7-icon>
        <f7-icon v-if="isFolder && open" material="arrow_drop_up"></f7-icon>
      </a>
  
    </div>
  
    <ul v-show="open" v-if="isFolder">
      <members class="item" v-for="(model, index) in model.children" :model="model" :key="index">
      </members>
    </ul>
  </li>
</template>

<script src="./members.js"/>
<style lang="scss" src="./members.scss"/>