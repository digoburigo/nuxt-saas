import type { Coordinate } from "ol/coordinate";
import { toLonLat } from "ol/proj";

interface MapState {
  zoom: number | undefined;
  center: Coordinate | undefined;
}

export const useMapState = defineStore("mapState", {
  state: (): MapState => ({
    zoom: 0,
    center: [0, 0],
  }),
  getters: {
    centerIn4326: (state) => {
      if (state.center) {
        return toLonLat(state.center);
      }
      return [0, 0];
    },
  },
});
