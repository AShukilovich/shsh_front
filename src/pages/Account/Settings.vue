<template>
  <v-container>
    <v-row>
      <v-col><h1 class="mb-4">Профиль</h1></v-col>
    </v-row>

    <v-text-field label="Фамилия" v-model="form.surname" name="surname" outlined dense/>
    <v-text-field label="Имя" v-model="form.name" name="name" outlined dense/>
    <v-text-field label="Отчество" v-model="form.patronymic" name="patronymic" outlined dense/>
    <v-text-field label="Телефон" v-model="form.phone" :rules="[rules.required]" name="phone" outlined dense/>

  </v-container>
</template>

<script>
import {mapActions, mapState, mapMutations} from "vuex";

export default {
  name: "AccountSettings",
  data() {
    return {
      form: {
        name: '',
        patronymic: '',
        surname: '',
        phone: '',
      },
      rules: {
        required: (value) => !!value || 'Обязательно поле.',
      }
    }
  },
  created() {
    this.GET_USER().then((user) => {
      const {name, patronymic, surname, username} = user;

      this.form = {
        name,
        patronymic,
        surname,
        phone: username,
      }
    });
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    ...mapActions(['GET_USER']),
    ...mapMutations(['SET_ALERT']),
  }
}
</script>

<style>

</style>