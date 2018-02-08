<template>
  <div>
    <scroll ref="scroll" :data="recommendList">
      <div v-if="banners.length" class="slider-wrapper">
        <div class="slider-content">
          <slider ref="slider">
              <div :key="index" v-for="(temp,index) in banners">
                <a href="javascript:">
                  <img :src="temp.pic" alt="">
                </a>
              </div>
          </slider>
        </div>
      </div>
      <h1 class="tab-title" v-if="recommendList.length">推荐歌单</h1>
      <ul class="recommend" v-if="recommendList.length">
        <li class="recommend-item" :key="index" v-for="(val,index) in recommendList">
          <p class="recommend-playCount"><i class="iconfont">&#xe6c2;</i>{{val.playCount | playCount()}}</p>
          <img class="recommend-img" v-lazy="val.picUrl" alt="">
          <p class="recommend-name">{{val.name}}</p>
        </li>
      </ul>
      <h1 class="tab-title" v-if="newSongList.length">最新音乐</h1>
      <ul class="new-song-list" v-if="newSongList.length">
        <li @click="$_playTheSong(val.song)" class="new-song-list-item" :key="index" v-for="(val,index) of newSongList">
          <div class="new-song-list-item-container">
            <h3 class="new-song-list-item-title">{{val.name}}</h3>
            <p class="new-song-list-item-artists">{{val.song.artists[0].name}}</p>
            <i class="iconfont">&#xe61d;</i>
          </div>
        </li>
      </ul>
      <div class="loading-container" v-show="!newSongList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import { getBanner, getRecommend, getNewSong, test } from 'api/recommend'
import { STATUS_OK } from 'api/config'
import Loading from 'base/loading/loading'
import { mapMutations } from 'vuex'
import { getSong } from 'api/song'

export default {
  data() {
    return {
      banners: [],
      recommendList: [],
      newSongList: []
    }
  },
  created() {
    this.$_getBanner()
    this.$_getRecommend()
    this.$_getNewSong()
    this.$_test()
  },
  methods: {
    $_test() {
      test().then(res => {
        // console.log(res)
      })
    },
    $_getBanner() {
      getBanner().then(res => {
        if (res.status === STATUS_OK) {
          let arr = res.data.banners
          arr.splice(4, 1)
          this.banners = arr
        }
      })
    },
    $_getRecommend() {
      getRecommend().then(res => {
        if (res.status === STATUS_OK) {
          let arr = res.data.result.slice(0, 6)
          this.recommendList = arr
        }
      })
    },
    $_getNewSong() {
      getNewSong().then(res => {
        if (res.status === STATUS_OK) {
          let arr = res.data.result.slice(0, 8)
          this.newSongList = arr
        }
      })
    },
    $_playTheSong(item) {
      getSong(item.id)
        .then(res => {
          if (res.status === STATUS_OK) {
            let song = res.data.songs[0]
            this.setPlayList([song])
            this.setFullScreen(true)
            this.setCurrentIndex(0)
            this.setIsPlay(true)
          }
        })
    },
    ...mapMutations({
      setPlayList: 'SET_PLAYLIST',
      setFullScreen: 'SET_FULL_SCREEN',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setIsPlay: 'SET_ISPLAY'
    })
  },
  components: {
    Slider,
    Loading,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"
  .tab-title
    font-size $font-size-m
    padding-left 9px
    height 20px
    line-height 20px
    margin 14px 0
    color $color-text
    border-left 2px solid $color-theme-dark
  .slider-wrapper
    positon relative
    width 100%
    height 0
    padding-top 40%
    overflow hidden
    .slider-content
      position absolute
      top 106px
      left 0
      width 100%
      height 100%
  .recommend
    width 100%
    display flex
    flex-wrap wrap
    justify-content space-between
    .recommend-item
      width 33%
      position relative
      margin-bottom 25px
      .recommend-playCount
        position absolute
        top 2px
        right 5px
        color $color-text-white
        font-size $font-size-s
        height $font-size-s
        line-height $font-size-s
        .iconfont
          display inline-block
          color $color-text-white
          font-size $font-size-s
          transform translate(-3px,1px)
      .recommend-img
        width 100%
      .recommend-name
        font-size $font-size-s+1
        color $color-text
        padding 6px 2px 0 6px
  .new-song-list
    .new-song-list-item
      padding-left 10px
      .new-song-list-item-container
        position relative
        padding 10px
        border-bottom 1px solid #EFEFF0
        .new-song-list-item-title
          height 25px
          line-height 25px
          color $color-text
          font-size $font-size-m
        .new-song-list-item-artists
          height 18px
          line-height 18px
          color $color-text-gray
          font-size $font-size-s
        .iconfont
          color $color-player-gray
          font-size $font-size-player
          display inline-block
          position absolute
          top 50%
          right 25px
          transform translateY(-50%)
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
