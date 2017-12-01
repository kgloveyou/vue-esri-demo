<template>
  <div class="mapglallery">
    <div class="mapglalleryicon"  title="底图" @click="isShow = !isShow , glalleryLeft = 0">
      <Icon type="gear-b"></Icon>
    </div>
    <transition name="glallery">
    <div class="glalleryScan" v-show="isShow">
      <div class="forwardHdl">
        <Icon type="arrow-left-b" @mouseover.native="startForward" @mouseout.native="endForward"></Icon>
      </div>
      <div class="scrollContainer">
        <div class="relativeContainer">
          <div class="glalleryContainer" :style="{left:glalleryLeft+'px'}">
            <div class="glalleryItem" v-for="(item,idx) in mapGlallery" @click="switchMap(item.map)">
              <img :src="'/static/widgets/MapGlallery/' + item.map + '.png'">
              <div class="mapTitle">{{item.desc}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="backwardHdl">
        <Icon type="arrow-right-b" @mouseover.native="startBack" @mouseout.native="endBack"></Icon>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MapGlallery',
  data () {
    return {
      mapGlallery: [
        {map:'localStreet',desc:'本地街道'},
        {map:'localImage',desc:'本地影像'},
        {map:'osm',desc:'OpenStreet'},
        {map:'tdtStreet',desc:'天地图'},
      ],
      isShow: false,
      glalleryLeft: 0,
      backHdl:null,
      forHdl:null,
    }
  },
  methods: {
    switchMap: function(map) {
      this.$emit('switchMap',map)
    },
    startBack: function() {
      this.backHdl = setInterval(()=>{
        this.glalleryLeft += 10
      },150)
    },
    endBack: function() {
      clearInterval(this.backHdl)
    },
    startForward: function() {
      this.forHdl = setInterval(()=>{
        this.glalleryLeft -= 10
      },150)
    },
    endForward: function() {
      clearInterval(this.forHdl)
    },
  }
}
</script>

<style lang="less">
  .mapglallery {
    position: absolute;
    top: 100px;
    left: 20px;
    z-index: 10;

    .mapglalleryicon {
      width: 32px;
      height: 32px;
      border: 1px solid #57585A;
      border-radius: 5px;
      background: #fff;
      text-align: center;
      line-height: 32px;
      font-size: 20px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }

    .glalleryScan {
      position: relative;
      width: 500px;
      height: 135px;
      background: #fff;
      border: 1px solid #bbb;
      border-radius: 3px;
      margin-top: 5px;
      overflow: hidden;

      .glalleryContainer {
        position: absolute;
        white-space: nowrap;
        &>:last-child {
          margin-right: 5px;
        }
      }

      .forwardHdl {
        float: left;
        width: 10px;
        height: 100%;
        line-height: 135px;
        margin-left: 2px;

        i {
          cursor: pointer;
        }
      }

      .scrollContainer {
        float: left;
        width: 474px;
        height: 100%;
      }

      .relativeContainer {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      .backwardHdl {
        float: right;
        text-align: right;
        width: 10px;
        height: 100%;
        line-height: 135px;
        margin-right: 2px;

        i {
          cursor: pointer;
        }
      }

      .glalleryItem {
        display: inline-block;
        margin: 5px 0px 0px 5px;
        border: 1px solid #ccc;
        cursor: pointer;

        img {
          display: block;
          width: 150px;
          height: 100px;
        }

        &:hover {
          opacity: 0.7;
        }
      }

      .mapTitle {
        text-align: center;
        color: #fff;
        background: #3981bc;
      }
    }
  }

  .glallery-enter-active, .glallery-leave-active {
    transition: opacity .5s
  }
  .glallery-enter, .glallery-leave-to {
    opacity: 0
  }
</style>
