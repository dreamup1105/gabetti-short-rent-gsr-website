<template>
  <client-only>
    <div class="w-full h-full relative z-0">
      <div class="absolute w-full top-0" style="z-index: 1000" v-if="hasHeader">
        <div class="flex justify-center mt-3 flex-row">
          <div v-if="isSearchInThisZoneVisible" @click="onSearchInThisZone"
               class="bg-white cursor-pointer py-2 px-4 shadow-lg rounded-lg flex flex-row items-center"
          >
            <svg-icon name="refresh-bold" class="h-4 w-4 mr-2"/>
            <span class="text-base font-medium">{{ $t('map.search_in_this_zone') }}</span>
          </div>
          <div class="bg-white py-2 px-4 shadow-lg rounded-lg flex flex-row items-center" v-else>
            <input type="checkbox" class="h-6 w-6 mr-2 text-gray-700" v-model="searchWhileMoving">

            <span class="text-base font-medium">{{ $t('map.search_while_moving') }}</span>
          </div>
        </div>
      </div>
      <l-map
        @update:zoom="onZoomUpdate"
        @update:center="onCenterUpdate"
        @update:bounds="onBoundsUpdate"
        @ready="onMapReady"
        zoomAnimation
        :center="centerComputed"
        class="gsr-l-map"
        ref="leaflet"
        :zoom="zoom"
        :options="mapOptions"
      >
        <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <v-marker-cluster>
          <l-marker v-for="(entity, index) in entities" :key="index"
                    @popupopen="onPopupOpen"
                    @popupclose="onPopupClose"
                    :lat-lng="parseLongitude(entity.address)">
            <l-popup class="map-popup" :key="index"
              :options="{closeButton: false, autoClose: false}">
              <slot name="tooltip" :data="entity" :index="index"/>
            </l-popup>
            <l-icon :icon-anchor="[16, 37]">
              <slot name="marker" :data="entity"/>
            </l-icon>
          </l-marker>
        </v-marker-cluster>
      </l-map>
    </div>
  </client-only>
</template>

<script>
let LMap, LTileLayer, LMarker, LPopup, LIcon, Vue2LeafletMarkerCluster;
if (process.client) {
	// require("leaflet");
  (Vue2LeafletMarkerCluster = require('vue2-leaflet-markercluster'));
	({
		LMap,
		LTileLayer,
		LMarker,
		LPopup,
		LIcon
	} = require("vue2-leaflet/dist/vue2-leaflet.min"));
}
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import 'leaflet/dist/leaflet.css';

export default {
  name: 'GsrLeaflet',
  components: {
    GsrLoader: () => import('@/components/common/GsrLoader'),
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
    'v-marker-cluster': Vue2LeafletMarkerCluster
  },
  props: {
    entities: {
      type: Array,
      required: false,
    },
    selectedMarkerIndex: {
      type: Number,
      default: null,
    },
    zoom: {
      type: Number,
      default: 8,
    },
    hasHeader: {
      type: Boolean,
      default: false,
    },
    mapCenter: {
      type: Object,
      default: () => {
      },
    },
    zoomControl: {
      type: false,
      default: true
    },
  },
  data() {
    return {
      mapOptions: {
        preferCanvas: true,
        zoomSnap: 0.5,
        zoomControl: this.zoomControl,
        scrollWheelZoom: false
      },
      clusterOptions: {disableClusteringAtZoom: 11},
      innerZoom: 8,
      center: null,
      leafletMapCenter: null,
      showMap: false,
      searchWhileMoving: false,
      isSearchInThisZoneVisible: false,
    };
  },
  computed: {
    centerComputed() {
      if (this.center) {
        return this.center
      } else {
        return [
          41.9109,
          12.4818
        ]
      }
    }
  },
  watch: {
    mapCenter: {
      deep: true,
      handler(value) {
        if (value && 'latitude' in value && 'longitude' in value) {
          this.center = [value.latitude, value.longitude]
        }
      }
    },
    zoom(value) {
      this.innerZoom = value
    }
  },
  mounted() {
    // Fix the path for the icons
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    this.showMap = true
    this.$nextTick(() => {
      this.innerZoom = this.zoom

      if (this.mapCenter && 'latitude' in this.mapCenter && 'longitude' in this.mapCenter) {
        this.center = [this.mapCenter.latitude, this.mapCenter.longitude]
      }
    });

  },
  methods: {
    /**
     * @desc Parse longitude
     * @param address
     * @returns {(number|number|*)[]|number[]}
     */
    parseLongitude(address) {
      if (process.client && address && address.latitude && address.longitude) {
        return [address.latitude, address.longitude]
      } else {
        return [47.41322, -1.219482]
      }
    },
    /**
     * @desc On zoom update
     * @param zoom
     */
    onZoomUpdate(zoom) {
      this.innerZoom = zoom
      if (this.searchWhileMoving) {
        this.$emit('zoomUpdate', zoom)
      }
    },
    /**
     * @desc on center update
     * @param center
     */
    onCenterUpdate(center) {
      this.leafletMapCenter = center;
      if (center) {
        this.center = [center.lat, center.lng]
      }
      if (this.searchWhileMoving) {
        this.$emit('centerUpdate', center)
      } else {
        this.isSearchInThisZoneVisible = true
      }
    },
    /**
     * @desc On search in this zone
     */
    onSearchInThisZone() {
      this.isSearchInThisZoneVisible = false
      let result = {
        lat: this.center[0],
        lng: this.center[1]
      }
      this.$emit('centerUpdate', result)
      this.$emit('zoomUpdate', this.innerZoom)
      let bounds = this.$refs.leaflet.mapObject.getBounds()
      let mapBoundNorthEast = bounds.getNorthEast();
      let mapDistance = mapBoundNorthEast.distanceTo(this.leafletMapCenter);
      let kilometers = mapDistance / 1000
      this.$emit('radiusUpdate', kilometers)
    },
    /**
     * @desc on bounds update
     */
    onBoundsUpdate(bounds) {
      if (this.searchWhileMoving) {
        let mapBoundNorthEast = bounds.getNorthEast();
        let mapDistance = mapBoundNorthEast.distanceTo(this.leafletMapCenter);
        let kilometers = mapDistance / 1000
        this.$emit('radiusUpdate', kilometers)
      }
    },
    onMapReady() {
      //console.log("map ready")
    },
    /**
     * @desc When the popup is open, emit "displayChanged" and pass "this.isPopupOpen" true; after that,
     * we force the component to update itself by using $nextTick.
     */
    onPopupOpen() {
      this.isPopupOpen = false
      this.$nextTick(() => {
        this.isPopupOpen = true
        $nuxt.$emit('displayChanged', this.isPopupOpen);
      })
    },
    /**
     * @desc When a popup closes, it emits "displayChanged" and passes "this.isPopupOpen" a false value.
     */
    onPopupClose() {
      this.isPopupOpen = false;
      $nuxt.$emit('displayChanged', this.isPopupOpen);
    }
  },
};
</script>

<style lang="scss" scoped>
:deep(.gsr-l-map) {
  .leaflet-popup-content {
    min-width: 250px;
  }
  .leaflet-popup-content-wrapper {
    padding: 0;
  }

  .leaflet-popup-content {
    line-height: initial;
    margin: 0 !important;
  }

  .leaflet-marker-icon {
    margin-left: -25px !important;
    margin-top: 0 !important;
    width: initial !important;
    height: initial !important;
  }
}
</style>
