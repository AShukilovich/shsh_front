<template>
  <v-container>
    <v-row>
      <v-col sm="12" offset-md="3" md="6" offset-lg="4" lg="4" class="form">
        <v-card>
          <v-card-title>
            Регистрация
          </v-card-title>
            <template v-if="!twoStepSignup">
              <v-card-text>
                <v-form @submit.prevent="signup">
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
                  <v-text-field
                      v-model="form.passwordConfirm"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min6, rules.compare]"
                      :type="showPassword ? 'text' : 'password'"
                      name="passwordConfirm"
                      label="Подтверждение пароля"
                      hint="Минимум 6 символов"
                      @click:append="showPassword = !showPassword"
                  />
                  <v-btn class="mt-2" type="submit" color="primary">Зарегистрироваться</v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <p>
                  У вас уже есть аккаунт?
                  <router-link :to="{ name: 'signin' }">Войти</router-link>
                </p>
              </v-card-actions>
            </template>

            <v-card-text v-else>
              <v-form @submit.prevent="confirm">
                <v-text-field
                    label="Код из смс (*любой код)"
                    v-model="codeConfirm"
                    :rules="[rules.required]"
                    name="code-confirm"
                />
                <v-btn class="mt-2" type="submit" color="primary">Подтвердить</v-btn>
              </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';

export default {
  data() {
    return {
      form: {
        phone: '',
        password: '',
        passwordConfirm: '',
      },
      showPassword: false,
      rules: {
        required: (value) => !!value || 'Обязательно поле.',
        min6: (value) => value.length >= 6 || 'Минимум 6 символов',
        compare: (value) => value == this.form.password || 'Пароли не совпадают',
      },
      twoStepSignup: false,
      codeConfirm: '',
    }
  },
  computed: {
    ...mapState({
      processing: state => state.general.processing,
    })
  },
  methods: {
    ...mapActions(['SIGNUP']),
    ...mapMutations(['SET_ALERT']),
    signup() {
      this.SIGNUP({
        ...this.form,
        username: this.form.phone,
      }).then(({ success }) => {
        this.SET_ALERT({type: 'success', message: success });
        this.twoStepSignup = true;
      }).catch((error) => {
        this.SET_ALERT({type: 'error', message: error });
      });
    },
    confirm() {
      this.SIGNUP({
        ...this.form,
        username: this.form.phone.replace(/\D/g, ''),
        codeConfirm: this.codeConfirm
      }).then(({success, data: { token }}) => {
        this.SET_ALERT({type: 'success', message: success });

        if (token) {
          this.$router.push({name: 'account'});
        }
      }).catch((error) => {
        this.twoStepSignup = false;
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