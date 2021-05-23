<template>
  <v-container>
    <v-row>
      <Event v-for="(event, key) in events" :key="key" :event="event" />
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Event from "@/components/Event";

export default {
  name: "Events",
  components: { Event },
  computed: {
    ...mapState({
      events: (state) => state.event.events,
    }),
  },
  created() {
    this.GET_EVENTS();
  },
  methods: {
    ...mapActions(['GET_EVENTS']),
  }
}
</script>

<style scoped>

</style>