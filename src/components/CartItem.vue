<template>
  <div class="cart-item py-3">
    <v-row no-gutters>
      <v-col cols="4">
        <v-img :src="item.item.image" alt="" />
      </v-col>
      <v-col cols="8" class="pl-3 pr-8">
        <span class="text-caption">{{ item.item.name }}</span>
        <div class="d-flex">
          <div class="text-caption mr-2"><strong>{{ item.price }} руб.</strong></div>
          <span class="text-caption text--lighten-4">{{ time }}</span>
        </div>
      </v-col>
      <v-btn v-if="!notDelete" class="btn-delete" absolute icon @click="$emit('delete', item.id)"><v-icon>mdi-close</v-icon></v-btn>
    </v-row>
  </div>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  name: "CartItem",
  props: {
    item: Object,
    notDelete: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    time() {
      const { timeFrom, timeTo } = this.item;

      return DateTime.fromFormat(timeFrom, 'yyyy-MM-dd HH:mm').toFormat('dd.MM')
          + ' ~ ' +
          DateTime.fromFormat(timeTo, 'yyyy-MM-dd HH:mm').toFormat('dd.MM') ;
    },
  },
}
</script>

<style scoped>
.cart-item {
  position: relative;
  border-bottom: 1px solid #eee;
}
.btn-delete {
  top: 0;
  right: 0;
}
</style>