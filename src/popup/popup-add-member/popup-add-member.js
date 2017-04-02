import { mapGetters } from "vuex";

export default{
  computed: mapGetters({
    member: "getSelectedMember",
    friends: "getFriends"
  }),
  methods: {
    addMember(member){
      //add child
      console.log("addMember");
      this.$store.dispatch("addChild", member);
    }
  }
}