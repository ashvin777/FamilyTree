<template>
  <f7-popup class="popup-member-details popup-member modal-in" v-if="selectedNewMember">
    <form name="memberDetailsForm" @submit="addRelative($event)">
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
                    <input type="text" placeholder="Your name" v-model="selectedNewMember.name" required>
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
                    <input type="email" placeholder="E-mail" v-model="selectedNewMember.email"></input>
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
                    <input type="tel" placeholder="Phone" v-model="selectedNewMember.phoneNumber">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="material-icons icon">info</i></div>
                <div class="item-inner">
                  <div class="item-title label">Gender</div>
                  <ul>
                    <li>
                      <label class="label-radio item-content">
                                <input type="radio" name="gender" value="m" v-model="selectedNewMember.gender" required>
                                <div class="item-media">
                                  <i class="icon icon-form-radio"></i>
                                </div>
                                <div class="item-inner">
                                  <div class="item-title">Male</div>
                                </div>
                              </label>
                    </li>
                    <li>
                      <label class="label-radio item-content">
                                <input type="radio" name="gender" value="f" v-model="selectedNewMember.gender"  required>
                                <div class="item-media">
                                  <i class="icon icon-form-radio color-pink"></i>
                                </div>
                                <div class="item-inner">
                                  <div class="item-title">Female</div>
                                </div>
                              </label>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-media"><i class="material-icons icon">date_range</i></div>
                <div class="item-inner">
                  <div class="item-title label">Birth date</div>
                  <div class="item-input">
                    <input type="date" placeholder="Birth day" v-model="selectedNewMember.dob" >
                  </div>
                </div>
              </div>
            </li>
            <li v-if="!selectedNewMember.id">
              <div class="item-content">
                <div class="item-media"><i class="material-icons icon">link</i></div>
                <div class="item-inner">
                  <div class="item-title label">Relation</div>
                  <ul>
                    <li>
                      <label class="label-radio item-content">
                                <input type="radio" name="relation" value="children" v-model="relation" required>
                                <div class="item-media">
                                  <i class="icon icon-form-radio"></i>
                                </div>
                                <div class="item-inner">
                                  <div class="item-title">Children</div>
                                </div>
                              </label>
                    </li>
                    <li>
                      <label class="label-radio item-content">
                                <input type="radio" name="relation" value="sibling" v-model="relation" required>
                                <div class="item-media">
                                  <i class="icon icon-form-radio"></i>
                                </div>
                                <div class="item-inner">
                                  <div class="item-title">Sibling</div>
                                </div>
                              </label>
                    </li>
                    <li>
                      <label class="label-radio item-content">
                                <input type="radio" name="relation" value="spouse" v-model="relation" required>
                                <div class="item-media">
                                  <i class="icon icon-form-radio"></i>
                                </div>
                                <div class="item-inner">
                                  <div class="item-title">Spouse</div>
                                </div>
                              </label>
                    </li>
                    <li>
                      <label class="label-radio item-content">
                                <input type="radio" name="relation" value="parent" v-model="relation" required>
                                <div class="item-media">
                                  <i class="icon icon-form-radio"></i>
                                </div>
                                <div class="item-inner">
                                  <div class="item-title">Parent</div>
                                </div>
                              </label>
                    </li>
                  </ul>
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