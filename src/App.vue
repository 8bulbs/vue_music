<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <music-header></music-header>
    <music-tab></music-tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <music-player></music-player>
  </div>
</template>

<script>
import MusicHeader from 'components/music-header/music-header'
import MusicTab from 'components/music-tab/music-tab'
import MusicPlayer from 'components/music-player/music-player'
export default {
  components: {
    MusicHeader,
    MusicTab,
    MusicPlayer
  }
}
</script>

<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
</style>
