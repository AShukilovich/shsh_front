<template>
  <v-container>
    <h1 class="text-h5 text-center">Оборудование успешно забронированно</h1>
    <p class="text-subtitle-2 text-center mt-3">Покажите этот код владельцу проката оборудования</p>
    <div class="order__qr d-flex justify-center">
      <img class="mt-5" :src="order.qr" height="250" width="250" />
    </div>
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Order",
  computed: {
    ...mapState({
      order: (state) => state.order.order,
    }),
  },
  created() {
    if (!this.order?.id) {
      this.$router.push({name: 'rent'});
    }
  }
}
</script>

<style scoped>

</style>