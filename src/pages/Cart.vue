<template>
  <v-container>
    <h1 class="text-h5">Корзина</h1>

    <div class="cart-list">
      <CartItem v-for="(item, key) in cart" :key="key" :item="item" @delete="deleteProduct(item.id)" />
    </div>

    <v-btn class="order__btn text-center mt-6" fixed dark color="indigo" @click="order">Забронировать</v-btn>
  </v-container>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import CartItem from "@/components/CartItem";

export default {
  name: "Cart",
  components: { CartItem },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
    }),
  },
  created() {
    this.GET_USER();
    this.GET_CART();
  },
  methods: {
    ...mapActions(['GET_CART', 'GET_USER', 'DELETE_IN_CART', 'ORDER']),
    ...mapMutations(['SET_ALERT']),
    deleteProduct(id) {
      this.DELETE_IN_CART(id).then(() => {
        this.SET_ALERT({ type: 'success', message: 'Товар удален' });
      }).catch(() => {
        this.SET_ALERT({ type: 'error', message: 'Не удалось удалить товар' });
      });
    },
    order() {
      this.ORDER().then(() => {
        this.$router.push({name: 'order'});
      });
    }
  }
}
</script>

<style scoped>
.cart-list {
  margin-bottom: 60px;
}
.order__btn {
  bottom: 70px;
  right: 12px;
  left: 12px;
  width: calc(100% - 24px);
}
</style>