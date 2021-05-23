<template>
  <div class="pt-3">
    <v-container>
      <v-select
        :items="menu"
        outlined
        hide-details
        item-text="title"
        item-value="route"
        v-model="menuCurrentPage"
      />
    </v-container>

    <router-view />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import accountRoutes from "@/routes/account";

export default {
  name: "AccountIndex",
  created() {
    this.GET_USER();
  },
  computed: {
    menu() {
      return accountRoutes.children
          .filter((route) => this.hasRoles(route.meta.forRoles))
          .map((route) => ({route: route.name, title: route.meta.title}))
    },
    menuCurrentPage: {
      get() {
        const route = this.menu.find((r) => ~this.$route.name.indexOf(r.route));

        return {route: route.route, title: route.title}
      },
      set(routeName) {
        this.$router.push({ name: routeName });
      }
    },
  },
  methods: {
    ...mapActions(['GET_USER']),
    ...mapGetters(['hasRoles'])
  }
}
</script>

<style>

</style>