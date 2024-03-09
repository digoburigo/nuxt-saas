<script setup lang="ts">
import { useMap } from 'vue-maplibre-gl';

const mapState = useMapState();

const mapRef = useMap();

function handleClick() {
  mapState.center = [0, 0];
  mapState.zoom = 0;

  console.log('map center: ', mapRef.map?.getCenter());
}
</script>

<template>
  <Button @click="handleClick">Reset map view</Button>
</template>
