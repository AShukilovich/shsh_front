<template>
  <v-col sm="6" lg="4">
    <v-card>
      <v-img :src="event.image" :alt="event.name" :height="130"/>
      <v-card-title>{{ event.name }}</v-card-title>
      <v-card-text class="event-text">
        <strong>Время проведения: </strong>
        <span>{{ time }}</span>
        <v-btn class="event-action" elevation="0" color="orange" fab small absolute dark><v-icon>mdi-account-plus</v-icon></v-btn>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  name: "Event",
  props: {
    event: {
      type: Object,
    },
  },
  computed: {
    time() {
      return DateTime.fromSQL(this.event.dateStart.date).toFormat('dd.LL.yyyy HH:mm');
    },
  },
}
</script>

<style scoped>
.event-text {
  position: relative;
}
.event-action {
  bottom: 15px;
  right: 15px;
}
</style>