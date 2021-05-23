<template>
  <router-view />
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "PointsIndex",
  created() {
    this.GET_POINT_FIELD()
    this.GET_POINTS(this.user.id);
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    ...mapActions(['GET_POINTS', 'GET_POINT_FIELD']),
  }
}
</script>

<style>

</style>