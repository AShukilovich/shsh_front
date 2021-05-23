<template>
  <v-dialog
      v-model="dialog"
      max-width="360"
      @click:outside="$emit('close')"
  >
    <v-card>
      <v-card-title class="text-h6 text-center justify-center mb-5">
        Выберите даты <br> для бронирования.
      </v-card-title>

      <v-card-text>
        <v-row justify="center">
          <v-date-picker
              full-width
              no-title
              range
              v-model="dates"
              :min="minDate"
              @change="getPrice"
          />

          <v-select
              class="mt-3"
              :items="timeList"
              label="Время"
              outlined
              dense
              hide-details
              v-model="time"
              @change="getPrice"
          />
        </v-row>
        <span class="d-inline-block mt-6 text-h5">Цена: <strong>{{ price }}</strong></span>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="gray darken-1" text @click="close">Закрыть</v-btn>
        <v-btn color="green darken-1" text @click="book">Забронировать</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapMutations} from "vuex";
import { DateTime } from 'luxon';

export default {
  name: "BookModal",
  props: {
    id: Number,
    dialog: Boolean,
  },
  data() {
    return {
      dates: [],
      time: '06:00',
      price: 0,
    };
  },
  computed: {
    timeList() {
      return [
          '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
          '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
          '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
          '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
          '22:00', '22:30', '23:00', '23:30',
      ]
    },
    minDate() {
      return DateTime.local().toFormat('yyyy-LL-dd');
    },
    timeFrom() {
      return this.dates[0] ? `${this.dates[0]} ${this.time}:00` : null;
    },
    timeTo() {
      let [from, to] = this.dates;

      if(!to && from) {
        to = DateTime.fromFormat(from, 'yyyy-LL-dd').plus({ day: 1 }).toFormat('yyyy-LL-dd');
      }

      return to ? `${to} ${this.time}:00` : null;
    },
  },
  methods: {
    ...mapActions(['ADD_TO_CART', 'GET_PRICE']),
    ...mapMutations(['SET_ALERT']),
    close() {
      this.price = 0;
      this.$emit('close');
    },
    getPrice() {
      this.GET_PRICE({
        itemId: this.id,
        time: {
          timeFrom: this.timeFrom,
          timeTo: this.timeTo,
        }
      }).then((price) => {
        this.price = price;
      })
    },
    book() {
      let [from, to] = this.dates;

      if(!to) {
        to = DateTime.fromFormat(from, 'yyyy-LL-dd').plus({ day: 1 }).toFormat('yyyy-LL-dd');
      }

      this.ADD_TO_CART({
        itemId: this.id,
        timeFrom: this.timeFrom,
        timeTo: this.timeTo,
        price: this.price,
      }).then(() => {
        this.SET_ALERT({ type: 'success', message: 'Инвентарь добавлен корзину' });
        this.$emit('close')
      }).catch(() => {
        this.SET_ALERT({ type: 'error', message: 'Не удалось добавить' });
      })
    }
  }
}
</script>

<style scoped>

</style>