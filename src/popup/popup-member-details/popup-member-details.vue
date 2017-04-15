<template>
  <f7-popup class="popup-member-details popup-member modal-in" v-if="selectedNewMember">
    <form name="memberDetailsForm" @submit="addRelative($event)" action="#dashboard">
      <f7-navbar>
        <f7-nav-left v-show="!selectedNewMember.id">
          <f7-link @click.native="openAddMemberPopup()">
            <i class="material-icons icon">keyboard_arrow_left</i>
          </f7-link>
        </f7-nav-left>
        <f7-nav-center sliding>Contact Details</f7-nav-center>
        <f7-nav-right>
          <input class="button" type="submit" value="Save"></input>
          <f7-button class="button close-popup">
            Cancel
          </f7-button>
        </f7-nav-right>
      </f7-navbar>
      <div class="popover-content">
  
        <div class="list-block">
          <ul>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="material-icons icon">face</i></div>
                <div class="item-inner">
                  <div class="item-title label">Name</div>
                  <div class="item-input">
                    <input type="text" placeholder="Your name" :value="selectedNewMember.name" @keyup="updateProperty('name', $event.target.value)" required>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="material-icons icon">email</i></div>
                <div class="item-inner">
                  <div class="item-title label">E-mail</div>
                  <div class="item-input">
                    <input type="email" placeholder="E-mail" @keyup="updateProperty('email', $event.target.value)" :value="selectedNewMember.email"></input>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="material-icons icon">phone</i></div>
                <div class="item-inner">
                  <div class="item-title label">Phone</div>
                  <div class="item-input">
                    <input type="tel" placeholder="Phone" @keyup="updateProperty('phoneNumber', $event.target.value)" :value="selectedNewMember.phoneNumber">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="material-icons icon">info</i></div>
                <div class="item-inner">
                  <div class="item-title label">Gender</div>
                  <div class="item-input">
                    <select @change="updateProperty('gender', $event.target.value)" required>
                                <option></option>
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                              </select>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="material-icons icon">date_range</i></div>
                <div class="item-inner">
                  <div class="item-title label">Birth date</div>
                  <div class="item-input">
                    <input type="date" placeholder="Birth day" @change="updateProperty('dob', $event.target.value)">
                  </div>
                </div>
              </div>
            </li>
            <li v-show="!selectedNewMember.id">
              <div class="item-content">
                <div class="item-media"><i class="material-icons icon">link</i></div>
                <div class="item-inner">
                  <div class="item-title label">Relation</div>
                  <div class="item-input">
                    <select v-model="relation" required>
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
    </form>
  </f7-popup>
</template>

<script src="./popup-member-details.js"/>
<style lang="scss" src="./popup-member-details.scss"/>