import esriLoader from 'esri-loader'

const apiUrl = 'https://js.arcgis.com/3.20/'

let _map = null

class EsriUtils {
  bootStart() {
    return new Promise((resolve, reject) => {
      if (!esriLoader.isLoaded()) {
        esriLoader.bootstrap((err) => {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            resolve()
          }
        }, {
            url: apiUrl
          })
      } else {
        resolve()
      }
    })
  }

  initBaseMap() {
    esriLoader.dojoRequire(['esri/basemaps','esri/layers/TileInfo','esri/layers/WebTiledLayer'], (esriBasemaps,TileInfo,WebTiledLayer) => {
      esriBasemaps.localStreet = {
        baseMapLayers:[
          {url:'http://60.214.208.35:6080/arcgis/rest/services/dlxx/usa/MapServer?token=WfCTd7uLBrOd9fDQrce6ADWwW81vq6Ae_HHn3bmjObnnL1gKfg5uDYZII29A9QIhUOm-ftty5ZKtpObu47NsfQ..'}
        ],
        thumbnailUrl:'',
        title:'localStreet'
      }

      esriBasemaps.localImage = {
        baseMapLayers:[
          {url:'http://60.214.208.35:6080/arcgis/rest/services/yx/BaseGlobe/MapServer'},
          {url: "http://60.214.208.35:6080/arcgis/rest/services/yx/BaseChina/MapServer" }
        ],
        thumbnailUrl:'',
        title:'localImage'
      }

      let tileInfo = TileInfo({
        "rows": 256,
        "cols": 256,
        "compressionQuality": 0,
        "origin": {
          "x": -180,
          "y": 90
        },
        "spatialReference": {
          "wkid": 4326
        },
        "lods": [
          { "level": 0, "resolution": 0.703125, "scale": 295497593.05875003 },
          { "level": 1, "resolution": 0.3515625, "scale": 147748796.52937502 },
          { "level": 2, "resolution": 0.17578125, "scale": 73874398.264687508 },
          { "level": 3, "resolution": 0.087890625, "scale": 36937199.132343754 },
          { "level": 4, "resolution": 0.0439453125, "scale": 18468599.566171877 },
          { "level": 5, "resolution": 0.02197265625, "scale": 9234299.7830859385 },
          { "level": 6, "resolution": 0.010986328125, "scale": 4617149.8915429693 },
          { "level": 7, "resolution": 0.0054931640625, "scale": 2308574.9457714846 },
          { "level": 8, "resolution": 0.00274658203125, "scale": 1154287.4728857423 },
          { "level": 9, "resolution": 0.001373291015625, "scale": 577143.73644287116 },
          { "level": 10, "resolution": 0.0006866455078125, "scale": 288571.86822143558 },
          { "level": 11, "resolution": 0.00034332275390625, "scale": 144285.93411071779 },
          { "level": 12, "resolution": 0.000171661376953125, "scale": 72142.967055358895 },
          { "level": 13, "resolution": 8.58306884765625e-005, "scale": 36071.483527679447 },
          { "level": 14, "resolution": 4.291534423828125e-005, "scale": 18035.741763839724 },
          { "level": 15, "resolution": 2.1457672119140625e-005, "scale": 9017.8708819198619 },
          { "level": 16, "resolution": 1.0728836059570313e-005, "scale": 4508.9354409599309 },
          { "level": 17, "resolution": 5.3644180297851563e-006, "scale": 2254.4677204799655 }
        ]
      });

      // 天地图的尝试使用WebTiledLayer以及esriBaseMaps的方式添加失败
      // let tdtMap = new WebTiledLayer('http://${subDomain}.tianditu.com/DataServer?T=vec_c&x=${col}&y=${row}&l=${level}', {
      //   copyright: 'Tianditu',
      //   id: "Tianditu",
      //   subDomains: ["t0", "t1", "t2"],
      //   tileInfo: tileInfo,
      // })

      esriBasemaps.tdtStreet = {
        baseMapLayers:[
          {
            templateUrl: 'http://${subDomain}.tianditu.com/DataServer?T=vec_c&x=${col}&y=${row}&l=${level}',
            copyright: 'Tianditu',
            id: "Tianditu",
            subDomains: ["t0", "t1", "t2"],
            tileInfo: tileInfo,
            type:'WebTiledLayer'
          }
        ],
        thumbnailUrl:'',
        title:'tdtStreet'
      }
    })
  }

  createMap(mapType = 'osm') {
    return this.bootStart()
      .then(() => {
        this.initBaseMap()
        esriLoader.dojoRequire(['esri/map', 'dojo/domReady!'], (Map) => {
          let map = new Map('map', {
            center: [109.05, 34.26],
            zoom: 5,
            logo: false,
            basemap: mapType
          })
          _map = map
          return map
        })
      })
  }

  changeBaseMap( mapType ) {
    _map.setBasemap(mapType)
  }

  createPointLayer (points) {
    esriLoader.dojoRequire(["esri/map", "esri/layers/GraphicsLayer", "esri/graphic", "esri/geometry/Point", "esri/symbols/PictureMarkerSymbol", "dojo/domReady!"],
    (Map, GraphicsLayer, Graphic, Point, PictureMarkerSymbol) => {
      if(_map.getLayer('layer_point')) {
        _map.removeLayer(_map.getLayer("layer_point"));
      }
      let graphicLayer = new GraphicsLayer();
      graphicLayer.id = 'layer_point';

      for (let i = 0; i < points.length; i++) {
        let pt = new Point({
          longitude: points[i].x,
          latitude: points[i].y
        }),
          sybls = new PictureMarkerSymbol("../../../static/widgets/DataLayer/logo.png", 20, 20),
          graphic = new Graphic(pt, sybls);
          graphicLayer.add(graphic);
      }
      _map.addLayer(graphicLayer);
    });
  }
}

export default new EsriUtils()
