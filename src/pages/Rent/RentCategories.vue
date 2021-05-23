<template>
  <v-container>
    <v-row>
      <v-col cols="6" sm="4" md="3" lg="2"  v-for="(category, key) in categories" :key="key">
        <router-link :to="{ name: 'rent.category', params: { categoryId: category.id } }" class="text-decoration-none">
          <v-card elevation="0" class="category-item">
            <v-card-title class="category-item__title text-caption">
              <strong>{{ category.name }}</strong>
            </v-card-title>
            <v-img :src="category.image" :alt="category.name" :height="130" position="right bottom"/>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "RentCategories",
  computed: {
    ...mapState({
      categories: (state) => state.category.categories,
    }),
  },
}
</script>

<style scoped>
.category-item {
  border-radius: 6px;
  background: #f5f5f5;
}
.category-item:active {
  background: #3F51B5;
  color: #fff;
}
.category-item__title  {
  font-size: 14px !important;
}
</style>