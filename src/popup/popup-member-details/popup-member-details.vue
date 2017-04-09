<template>
  <f7-popup class="popup-member-details popup-member modal-in" v-if="selectedNewMember">
    <f7-navbar>
      <f7-nav-left>
        <f7-link class="open-popup" data-popup=".popup-add-member">
          <i class="f7-icons">left</i>
        </f7-link>
      </f7-nav-left>
      <f7-nav-left>
        <i class="f7-icons">person</i>
      </f7-nav-left>
      <f7-nav-center sliding>Contact Details</f7-nav-center>
    </f7-navbar>
    <div class="popover-content">
      <div class="list-block">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon f7-icons">person</i></div>
              <div class="item-inner">
                <div class="item-title label">Name</div>
                <div class="item-input">
                  <input type="text" placeholder="Your name" :value="selectedNewMember.name" @keydown="updateProperty('name', $event.target.value)">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon f7-icons">email</i></div>
              <div class="item-inner">
                <div class="item-title label">E-mail</div>
                <div class="item-input">
                  <!--<div v-for="(email, index) in selectedNewMember.email">-->
                  <input type="email" placeholder="E-mail" @keydown="updateProperty('email', $event.target.value)" :value="selectedNewMember.email"></input>
                  <!--</div>-->
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon f7-icons">phone</i></div>
              <div class="item-inner">
                <div class="item-title label">Phone</div>
                <div class="item-input">
                  <!--<div v-for="(number, index) in selectedNewMember.phoneNumber">-->
                  <input type="tel" placeholder="Phone" @keydown="updateProperty('phoneNumber', $event.target.value)" :value="selectedNewMember.phoneNumber">
                </div>
                <!--</div>-->
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon f7-icons">persons</i></div>
              <div class="item-inner">
                <div class="item-title label">Gender</div>
                <div class="item-input">
                  <select>
                                    <option>Male</option>
                                    <option>Female</option>
                                  </select>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon f7-icons">calendar</i></div>
              <div class="item-inner">
                <div class="item-title label">Birth date</div>
                <div class="item-input">
                  <input type="date" placeholder="Birth day" value="2014-04-30">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon f7-icons">persons</i></div>
              <div class="item-inner">
                <div class="item-title label">Relation</div>
                <div class="item-input">
                  <select v-model="relation">
                      <option value="children">Children</option>
                      <option value="spouse">Spouse</option>
                      <option value="brother">Brother</option>
                      <option value="parent">Add Parent</option>
                    </select>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  
    <div class="toolbar">
      <div class="toolbar-inner">
        <f7-button class="button button-round utton-fill close-popup" @click="addRelative(selectedNewMember)">
          Save Contact
        </f7-button>
      </div>
    </div>
  </f7-popup>
</template>

<script src="./popup-member-details.js"/>
<style lang="scss" src="./popup-member-details.scss"/>