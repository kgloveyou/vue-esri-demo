<template>
  <div id="mapcontainer" class="tundra">
    <div id="map">
      <MapGlallery @switchMap="changeBaseMap"></MapGlallery>
    </div>
  </div>
</template>

<script>
import esriUtils from '../utils/esriUtils'
import MapGlallery from './widgets/MapGlallery'

export default {
  name: 'map',
  data () {
    return {
      map: {'loaded': false},
      mapType: 'osm'
    }
  },
  mounted: function() {
    this.createMap(this.mapType)
  },
  watch: {
    'map.loaded': function() {
      esriUtils.createPointLayer([
        { x: 102,y:37 }
      ])
    }
  },
  methods: {
    createMap: function(mapType) {
      esriUtils.createMap(mapType).then(map=>this.map = map)
    },
    changeBaseMap: function(mapType) {
      this.mapType = mapType
      esriUtils.changeBaseMap(mapType)
    }
  },
  components: {
    MapGlallery
  }
}
</script>

<style lang="less">
  @import url('https://js.arcgis.com/3.20/esri/css/esri.css');

  #mapcontainer {
    position: absolute;
    top: 70px;
    left: 250px;
    bottom: 0;
    right: 0;
  }

  #map {
    height: 100%;
  }

</style>
