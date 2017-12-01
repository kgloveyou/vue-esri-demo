<template>
  <div id="app">
    <nav class="nav">顶部导航</nav>
    <aside class="aside">侧边栏</aside>
    <article>
      <map-container></map-container>
    </article>
  </div>
</template>

<script>
import MapContainer from './components/Map'

export default {
  name: 'layout',
  data () {
    return {

    }
  },
  components: {
    MapContainer
  }
}
</script>

<style lang="less">
  @charset "utf-8";
  @import url(./assets/css/normal.css);

  .nav {
    height: 70px;
    background: #3981bc;
  }

  .aside {
    position: absolute;
    top: 70px;
    left: 0px;
    bottom: 0px;
    width:250px;
    background: #fff;
    border: 1px solid #ccc;
  }
</style>
