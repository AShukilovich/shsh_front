<template>
  <router-view></router-view>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "RentIndex",
  computed: {
    ...mapState({
      categories: (state) => state.category.categories,
    }),
  },
  created() {
    if(!this.categories.length) {
      this.GET_CATEGORIES();
    }
  },
  methods: {
    ...mapActions(['GET_CATEGORIES']),
  },
}
</script>

<style scoped>

</style>