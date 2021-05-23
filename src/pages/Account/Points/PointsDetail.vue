<template>
  <v-container>
    <v-row>
      <v-col><h1 class="text-h5 mb-4">Редактирование точки аренды</h1></v-col>
    </v-row>

    <v-text-field label="Название" v-model="form.name" name="name" outlined dense/>

    <div class="d-flex">
      <v-text-field label="Широта" v-model="form.lat" name="lat" outlined class="mr-1" dense/>
      <v-text-field label="Долгота" v-model="form.lon" name="lon" outlined class="ml-1" dense/>
    </div>

    <v-text-field
      v-for="(field, key) in fields"
      :key="key"
      :label="field.name"
      v-model="form.fields[field.id]"
      :name="field.code"
      outlined
      dense
    />

    <v-row no-gutters class="d-flex justify-space-around align-center mt-3">
      <v-btn color="green" dark @click="savePoint" class="flex-grow-1">
        <v-icon left>mdi-content-save</v-icon>
        <span>Сохранить</span>
      </v-btn>
      <v-btn v-if="currentPoint" color="red" dark @click="deletePoint" class="flex-grow-1 ml-3">
        <v-icon left>mdi-delete</v-icon>
        <span>Удалить</span>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "PointsList",
  data() {
    return {
      t: null,
      form: {
        name: '',
        lat: '',
        lon: '',
        fields: {}
      }
    }
  },
  computed: {
    ...mapState({
      points: (state) => state.points.userPoints,
      fields: (state) => state.points.fields,
    }),
    currentPoint() {
      const { query: { pointId } } = this.$route;

      return pointId ? this.points?.find((p) => p.id == pointId) : null;
    }
  },
  methods: {
    ...mapActions(['ADD_POINT', 'DELETE_POINT', 'UPDATE_POINT']),
    savePoint() {
      this[this.currentPoint ? 'UPDATE_POINT' : 'ADD_POINT']({
        ...this.form,
      }).then(() => {
        this.$router.push({ name: 'account.points.list' });
      })
    },
    deletePoint() {
      this.DELETE_POINT(this.currentPoint.id).then(() => {
        this.$router.push({ name: 'account.points.list' });
      });
    }
  }
}
</script>

<style>

</style>