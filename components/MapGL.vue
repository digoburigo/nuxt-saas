<script setup lang="ts">
import type { StyleSpecification } from 'maplibre-gl';
const style: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '',
    },
  },
  layers: [
    {
      id: 'osm-layer',
      type: 'raster',
      source: 'osm',
      minzoom: 0,
      maxzoom: 22,
    },
  ],
};

const mapState = useMapState();
</script>

<template>
  <div class="size-[300px]">
    <mgl-map
      class="size-full"
      :map-style="style"
      :zoom="mapState.zoom"
      :center="mapState.centerIn4326"
    >
      <mgl-fullscreen-control />
      <mgl-navigation-control />
      <mgl-geolocation-control />
    </mgl-map>
  </div>
</template>

<style>
@import 'maplibre-gl/dist/maplibre-gl.css';
@import 'vue-maplibre-gl/dist/vue-maplibre-gl.css';
</style>
