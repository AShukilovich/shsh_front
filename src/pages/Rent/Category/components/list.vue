<template>
  <div>
    <div v-for="(product, key) in products" :key="key">
      <router-link :to="{ name: 'rent.category.product', params: { productId: product.id } }" class="text-decoration-none">
        <v-card class="product mb-5 elevation-5">
          <div class="mx-8 product__image">
            <v-img :src="product.image" :alt="product.name" height="220" :class="{'product__image-reserved': product.reserved.length}"/>
            <v-chip v-if="product.reserved.length" class="reserved">Забронировано</v-chip>
          </div>

          <v-card-title class="card-title">{{product.name}}</v-card-title>
          <v-card-text>
            <v-chip v-if="product.reserved.length" class="chip-text" color="red lighten-4">Будет доступно не ранее {{ product.reserved[0].timeTo }}</v-chip>

            <div class="tariffs-wrap">
              <v-row no-gutters class="tariffs rounded-pill blue-grey lighten-5 d-flex" style="width: 100%">
                <v-col v-if="product.priceDay" class="d-flex flex-column py-3 px-6 tariffs__item">
                  <span class="text--black">День</span>
                  <span class="blue--text"><strong>{{ product.priceDay }} р/сут.</strong></span>
                </v-col>
                <v-col v-if="product.priceMonth" class="d-flex flex-column py-3 px-6 tariffs__item">
                  <span class="text--black">Месяц</span>
                  <span class="blue--text"><strong>{{ product.priceMonth }} р/мес.</strong></span>
                </v-col>
              </v-row>
            </div>

            <v-btn
                color="indigo"
                fab
                dark
                small
                absolute
                :class="['add-btn', {disibled: product.reserved.length}]"
                @click.prevent="$emit('book', product.id)">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    products: Array,
  }
}
</script>

<style scoped>
.product {
  position: relative;
}
.card-title {
  font-size: 16px;
  padding-right: 60px;
}
.tariffs-wrap {
  margin-top: 10px;
  padding: 0 40px 0 0;
}
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
.chip-text {
  color: #B71C1C;
}
.add-btn {
  bottom: 15px;
  right: 10px;
}
.add-btn.disibled {
  pointer-events: none;
  background: #aaa !important;
  box-shadow: none !important;
}
.product__image {
  position: relative;
}
.product__image-reserved {
  filter: grayscale(1);
  opacity: 0.85;
}
.reserved {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>