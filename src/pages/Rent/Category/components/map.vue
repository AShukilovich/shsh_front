<template>
  <yandex-map
    class="map"
    :center="[66.096605,76.6589601]"
    :zoom="12"
    @created="mapCreated"
  />
</template>

<script>
import YandexMap from 'vue-yandex-map';
import Vue from 'vue';

Vue.use(YandexMap, {
  version: '2.1',
  lang: 'ru_RU',
  apiKey: 'd4522b54-9a89-4678-a7ce-b8add3933265',
});

export default {
  name: 'map',
  props: {
    products: Array,
  },
  data() {
    return {
      map: null,
      mapData: [],
      mapObjectManager: null
    }
  },
  methods: {
    mapCreated($map) {
      this.map = $map
      this.mapObjectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true,
      });

      this.products?.forEach((p) => {
        const { lat, lon } = JSON.parse(p.location);

        this.map.geoObjects.add(new ymaps.Placemark([lat, lon], {
            balloonContent: p.name
          }, {
            preset: 'islands#circleIcon',
            iconColor: '#3caa3c'
          })
        );
      });
    },
  }
}
</script>

<style scoped>
.map {
  height: 68vh;
}
</style>