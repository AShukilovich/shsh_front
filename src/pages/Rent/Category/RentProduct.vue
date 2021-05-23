<template>
  <v-container v-if="currentProduct">
    <v-btn class="go-to-back" icon absolute @click.prevent="$router.push({ name: 'rent.category', params: $route.params.categoryId })">
      <v-icon dark>mdi-arrow-left</v-icon>
    </v-btn>

    <div class="mx-5">
      <v-img
        v-if="currentProduct.image"
        :src="currentProduct.image"
        :alt="currentProduct.name"
        height="220"
      />
    </div>
    <h3 class="text-h5 mb-5">{{ currentProduct.name }}</h3>

    <h5 class="text-h6 mb-4"><strong>Тарифы подписки</strong></h5>
    <v-row no-gutters class="tariffs rounded-pill blue-grey lighten-5 d-flex" style="width: 100%">
      <v-col v-if="currentProduct.priceDay" class="d-flex flex-column py-3 px-6 tariffs__item">
        <span class="text--black">День</span>
        <span class="blue--text"><strong>{{ currentProduct.priceDay }} р/сут.</strong></span>
      </v-col>
      <v-col v-if="currentProduct.priceMonth" class="d-flex flex-column py-3 px-6 tariffs__item">
        <span class="text--black">Месяц</span>
        <span class="blue--text"><strong>{{ currentProduct.priceMonth }} р/мес.</strong></span>
      </v-col>
    </v-row>

    <div v-for="(field, key) in currentProduct.fields" :key="key" class="mt-6">
      <h5 class="text-h6 mb-2"><strong>{{ field.name }}</strong></h5>
      <div class="text-caption">{{ field.value }}</div>
    </div>

    <v-btn dark color="indigo" class="d-flex mt-5" @click="openBookModal">
      <v-icon dark left>mdi-plus</v-icon>
      <span>Добавить в корзину</span>
    </v-btn>

    <BookModal :dialog="dialog" :id="selectForBook" @close="closeBookModal"/>
  </v-container>
</template>

<script>
import {mapState} from "vuex";
import BookModal from '@/components/BookModal';

export default {
  name: "RentProduct",
  components: { BookModal },
  data() {
    return {
      dialog: false,
      selectForBook: null,
    }
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
    currentProduct() {
      return this.products.find((p) => p.id == this.$route.params.productId);
    }
  },
  methods: {
    openBookModal() {
      this.dialog = true;
      this.selectForBook = this.currentProduct.id;
    },
    closeBookModal() {
      this.dialog = false;
      this.selectForBook = null;
    }
  }
}
</script>

<style scoped>
.tariffs__item:not(:last-child) {
  position: relative;
}
.tariffs__item:not(:last-child)::before {
  position: absolute;
  top: 10px;
  bottom: 10px;
  right: 0;
  content: "";
  border-right: 2px solid #999;
}
.go-to-back {
  top: 10px;
  left: 10px;
  z-index: 1;
}
</style>