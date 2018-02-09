<template>
  <div class="container">
    <scroll class="scroll" ref="scroll" :data="singerList">
      <div class="scroll-content">
        <ul v-if="singerList.length" class="singer-list">
          <li @click="$_getSingerSongs(item.id)" :key="index" v-for="(item,index) in singerList" class="singer-list-item">
            <div class="singer-list-item-content">
              <img class="singer-list-item-content-image" v-lazy="item.img1v1Url" alt="">
              <span class="singer-list-item-content-title">{{item.name}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="loading-container" v-show="!singerList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getSingerList, getSingerSongs } from 'api/singer'
import { STATUS_OK } from 'api/config'
import Loading from 'base/loading/loading'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      singerList: []
    }
  },
  created() {
    this.$_getSingerList()
  },
  methods: {
    $_getSingerSongs(id) {
      getSingerSongs(id)
        .then(res => {
          if (res.status === STATUS_OK) {
            this.setSinger(res.data)
            this.$router.push('singerDetail')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    $_getSingerList() {
      getSingerList()
        .then(res => {
          if (res.status === STATUS_OK) {
            this.singerList = res.data.list.artists
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    ...mapMutations({
      setPlayList: 'SET_PLAYLIST',
      setFullScreen: 'SET_FULL_SCREEN',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setIsPlay: 'SET_ISPLAY',
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    Loading,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"
  .container
    position fixed
    top 105px
    width 100%
    bottom 0
    .scroll
      overflow hidden
      height 100%
      .singer-list
        color $color-text-gray
        margin-top 5px
        .singer-list-item
          width 85%
          margin-bottom 15px
          .singer-list-item-content
            display flex
            .singer-list-item-content-image
              widht 75px
              height 75px
            .singer-list-item-content-title
              display inline-block
              height 75px
              line-height 75px
              padding-left 35px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
