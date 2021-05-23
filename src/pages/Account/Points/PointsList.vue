<template>
  <v-container class="py-0">
    <v-row no-gutters>
      <v-col class="d-flex justify-space-between align-center">
        <h1>Точки аренды</h1>
        <v-btn color="primary" depressed fab dark small class="ml-2" @click="$router.push({ name: 'account.points.detail'})">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-tabs grow v-model="typeView" class="mb-2">
      <v-tab key="list">Списком</v-tab>
      <v-tab key="map">На карте</v-tab>
    </v-tabs>

    <component :is="listComponent" :points="points" />
  </v-container>
</template>

<script>
import {mapState} from "vuex";
import List from './components/list';

export default {
  name: "PointsList",
  components: { List },
  data() {
    return {
      typeView: 0, // list - 0, map - 1
    }
  },
  computed: {
    ...mapState({
      points: (state) => state.points.userPoints,
    }),
    listComponent() {
      return this.typeView ? () => import('./components/map') : () => import('./components/list');
    }
  },
}
</script>

<style>

</style>