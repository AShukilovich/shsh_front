<template>
  <v-container>
    <div v-if="!products.length" class="d-flex justify-center mt-3">
      <v-chip outlined>Товары в категории отсутствуют</v-chip>
    </div>

    <template v-else>
      <div class="d-flex justify-center mb-5">
        <v-btn-toggle rounded color="indigo" v-model="toggle">
          <v-btn>Список</v-btn>
          <v-btn>Карта</v-btn>
        </v-btn-toggle>
      </div>

      <component :is="componentView" :products="products" @book="openBookModal"/>

      <BookModal :dialog="dialog" @close="closeBookModal" :id="selectForBook" />
    </template>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import BookModal from '@/components/BookModal';

export default {
  name: "RentCategory",
  components: {BookModal},
  data() {
    return {
      toggle: 0,
      dialog: false,
      selectForBook: null,
    }
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
    componentView() {
      return this.toggle
        ? () => import('./components/map')
        : () => import('./components/list');
    }
  },
  created() {
    if(this.$route.params.categoryId) {
      this.GET_PRODUCTS(this.$route.params.categoryId).catch(() => {
        this.$router.push({ name: 'rent.categories' });
      });
    } else {
      this.$router.push({ name: 'rent.categories' });
    }
  },
  methods: {
    ...mapActions(['GET_PRODUCTS']),
    openBookModal(id) {
      this.dialog = true;
      this.selectForBook = id;
    },
    closeBookModal() {
      this.dialog = false;
      this.selectForBook = null;
    }
  },
}
</script>

<style scoped>

</style>