<template>
  <v-container>
    <v-row>
      <v-col sm="12" offset-md="3" md="6" offset-lg="4" lg="4" class="form">
        <v-card>
          <v-card-title>
            Вход
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signin">
              <v-text-field
                  label="Телефон"
                  v-model="form.phone"
                  :rules="[rules.required]"
                  name="phone"
              />
              <v-text-field
                v-model="form.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min6]"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                label="Пароль"
                hint="Минимум 6 символов"
                @click:append="showPassword = !showPassword"
              />
              <v-checkbox
                  v-model="form.rememberMe"
                  label="Запомнить"
              />
              <v-btn type="submit" color="primary">Войти</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <p>
              У вас нет аккаунта?
              <router-link :to="{ name: 'signup' }">Зарегистрироваться</router-link>
            </p>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
	data() {
		return {
			form: {
				phone: '',
        password: '',
				rememberMe: false
			},
      showPassword: false,
      rules: {
        required: value => !!value || 'Обязательно поле.',
        min6: v => v.length >= 6 || 'Минимум 6 символов',
      }
		}
	},
	computed: {
		...mapState({
			processing: state => state.general.processing,
		})
	},
	methods: {
		...mapActions(['SIGNIN']),
    ...mapMutations(['SET_ALERT']),
		signin() {
			if( this.form.rememberMe )
				this.$store.commit('REMEMBER_ME');
			
			this.SIGNIN({
        ...this.form,
        username: this.form.phone,
      }).then(({success}) => {
        this.$router.push({name: 'account'});
        this.SET_ALERT({type: 'success', message: success });
      }).catch((error) => {
        this.SET_ALERT({type: 'error', message: error });
      });
		},
	}
}
</script>

<style scoped>
.form {
  margin-top: 50px;
}
</style>