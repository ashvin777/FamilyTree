<template>
  <f7-popup class="popup-add-member popup-member modal-in" @popup:open="onPopupOpen()">
    <f7-navbar>
      <!--<f7-nav-left>
        <i class="f7-icons">social_googleplus</i>
      </f7-nav-left>-->
      <f7-nav-center sliding>Select A Google Contact</f7-nav-center>
      <f7-nav-right>
         <f7-button class="button button-round utton-fill open-popup" data-popup=".popup-member-details" @click="addMemberManually()">
          Not on Google ?<i class="icon material-icons">keyboard_arrow_right</i>
        </f7-button>
        <f7-button class="button close-popup">
          Cancel
        </f7-button>
      </f7-nav-right>
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
          <li class="friends-scroller" ref="contactsScroller">
            <a href="#" class="fb-friend" v-for="contact in filteredContacts" @click="selectContact(contact)">
              <div>
                <div class="fb-friend-name">{{contact.name}}</div>
                <div class="fb-friend-email" v-show="contact.email">
                  Email: {{contact.email}}
                </div>
                <div class="fb-friend-contact" v-show="contact.phoneNumber">
                  Mobile: {{contact.phoneNumber}}
                </div>
              </div>
              <i class="material-icons icons">keyboard_arrow_right</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </f7-popup>
</template>

<script src="./popup-add-member.js"/>
<style lang="scss" src="./popup-add-member.scss"/>