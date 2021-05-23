<template>
  <div id="app">
    <v-app>
      <v-app-bar app dense class="app-bar">
        <img src="./assets/logo.png" alt="Аренкат" width="150">
        <v-spacer></v-spacer>
        <router-link v-if="isAuthenticated" :to="{ name: 'cart' }" class="text-decoration-none">
          <v-btn icon>
            <v-icon>mdi-cart-outline</v-icon>
          </v-btn>
        </router-link>
        <v-btn icon>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main class="pb-16">
        <router-view></router-view>
      </v-main>

      <v-bottom-navigation :value="bottomNavigation" fixed :background-color="color" dark shift>
        <v-btn value="rent" @click="$router.push({ name: 'rent.categories' });">
          <span>Аренда</span><v-icon>mdi-dumbbell</v-icon>
        </v-btn>
        <v-btn value="account" @click="$router.push({ name: isAuthenticated ? 'account' : 'signin' });">
          <span>Профиль</span><v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn value="events" @click="$router.push({ name: 'events' });">
          <span>События</span><v-icon>mdi-calendar</v-icon>
        </v-btn>
        <v-btn v-if="isAuthenticated && hasRoles(['ROLE_DISTRIBUTOR'])" value="qrcode-scan" @click="$router.push({ name: 'qrcode-scan' });">
          <span>Qrcode</span><v-icon>mdi-qrcode-scan</v-icon>
        </v-btn>
      </v-bottom-navigation>

      <v-snackbar :timeout="4000" :value="alert.message" absolute top right :color="alert.type" class="snackbar">
        {{ alert.message }}
        <template v-slot:action="{ attrs }">
          <v-btn :color="alert.type" v-bind="attrs" icon @click="closeAlert">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
const NAVIGATIONS = ['rent', 'account', 'events'];

import {mapState, mapMutations, mapGetters} from "vuex";

export default {
  name: 'App',
  computed: {
    ...mapState({
      alert: (state) => state.general.alert,
    }),
    ...mapGetters(['isAuthenticated', 'hasRoles']),
    bottomNavigation: {
      get() {
        return NAVIGATIONS.find((r) => this.$route.name?.indexOf(r) === 0);
      }
    },
    color() {
      if (this.$route?.name?.indexOf(NAVIGATIONS[0]) === 0) {
        return 'indigo';
      } else if (this.$route?.name?.indexOf(NAVIGATIONS[1]) === 0) {
        return 'teal'
      } else if (this.$route?.name?.indexOf(NAVIGATIONS[2]) === 0) {
        return 'orange'
      } else {
        return 'blue-grey'
      }
    },
  },
  methods: {
    ...mapMutations(['SET_ALERT']),
    closeAlert() {
      this.SET_ALERT({})
    },
  },
}
</script>

<style>
.app-bar {
  background: #fff !important;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.12) !important;
}
.snackbar{
  z-index: 1000 !important;
}
</style>
