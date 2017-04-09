<template>
  <f7-popup class="popup-add-member popup-member modal-in">
    <f7-navbar>
      <f7-nav-left>
        <i class="f7-icons">social_googleplus</i>
      </f7-nav-left>
      <f7-nav-center sliding>Add From Google Contacts</f7-nav-center>
    </f7-navbar>
    <div class="popover-content">
      <div class="list-block">
        <ul>
          <li>
            <div class="fb-friend fb-friend-input">
              <div>
                <div class="item-input">
                  <input type="text" name="name" placeholder="Search Contact" v-model="query" />
                </div>
              </div>
            </div>
          </li>
          <li>
            <a href="#" class="fb-friend open-popup" v-for="contact in filteredContacts" @click="selectContact(contact)" data-popup=".popup-member-details">
              <div>
                <div class="fb-friend-name">{{contact.title.$t}}</div>
                <div class="fb-friend-email" v-for="email in contact.gd$email">
                  Email: {{email.address}}
                </div>
                <div class="fb-friend-contact" v-for="phone in contact.gd$phoneNumber">
                  <span v-if="phone.label">{{phone.label}}:</span> {{phone.$t}}
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="toolbar">
      <div class="toolbar-inner">
        <a href="#" class="link">Add Contact Manually <i class="f7-icons">right</i></a>
      </div>
    </div>
  </f7-popup>
</template>

<script src="./popup-add-member.js"/>
<style lang="scss" src="./popup-add-member.scss"/>