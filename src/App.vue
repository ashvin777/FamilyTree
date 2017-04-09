<template>
  <div id="app">
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <f7-pages>
          <home></home>
          <popover-member></popover-member>
          <popup-add-member></popup-add-member>
          <popup-member-details></popup-member-details>
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
  import home from "./pages/home/home.vue";
  import popoverMember from "./popover/popover-member/popover-member.vue"
  import popupAddMember from "./popup/popup-add-member/popup-add-member.vue"
  import popupMemberDetails from "./popup/popup-member-details/popup-member-details.vue"
  
  export default {
    components: {
      home,
      popoverMember,
      popupAddMember,
      popupMemberDetails
    }
  }
</script>