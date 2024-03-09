<script setup lang="ts">
import type { MapEvent } from 'ol/';

const mapState = useMapState();

function onCenterChange(event: MapEvent) {
  mapState.center = event.target.getCenter();
}

function onResolutionChange(event: MapEvent) {
  mapState.zoom = event.target.getZoom();
}
</script>

<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    class="size-[300px]"
  >
    <ol-view
      :center="[0, 0]"
      :zoom="0"
      @change:center="onCenterChange"
      @change:resolution="onResolutionChange"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
  </ol-map>
</template>

<style scoped>
@import 'vue3-openlayers/dist/vue3-openlayers.css';
</style>
