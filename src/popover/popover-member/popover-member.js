import Events from "../../services/events";
import { mapGetters } from "vuex";

export default{
  computed: mapGetters({
    member: "getSelectedMember"
  }),
  methods: {
    onClosed() {
      Events.publish("Popover:closed");
    }
  }
}