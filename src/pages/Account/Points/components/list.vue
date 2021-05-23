<template>
  <div class="points-list">
    <v-col v-for="(point, key) in points" :key="key" class="d-flex justify-space-between align-center points__item px-0 py-1">
      <span>{{ point.name }}</span>
      <v-btn
          color="gray"
          class="ml-auto"
          icon
          @click="$router.push({ name: 'account.points.detail', query: { pointId: point.id } })"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    points: Array,
  }
}
</script>

<style scoped>
.points__item {
  width: 100%;
}
</style>