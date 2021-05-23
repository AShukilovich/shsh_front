<template>
  <router-view></router-view>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "RentCategoryIndex",
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
  },
  created() {
    this.GET_PRODUCTS(this.$route.params.categoryId);
  },
  updated() {
    this.GET_PRODUCTS(this.$route.params.categoryId);
  },
  methods: {
    ...mapActions(['GET_PRODUCTS']),
  },
}
</script>

<style scoped>

</style>