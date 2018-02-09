<template>
  <transition name="slide">
    <div class="container">
      <div class="title">
        <h5 class="singer-name">
          {{singer.artist.name}}
          <span class="singer-name-alias">{{singer.artist.alias[0]}}</span>
        </h5>
        <div class="avatar">
          <img :src="singer.artist.picUrl" alt="">
        </div>
        <div class="loading-container" v-show="!singer.artist.picUrl">
          <loading></loading>
        </div>
        <i @click="$_back" class="iconfont">&#xe60b;</i>
      </div>
      <div class="scroll-container">
        <scroll class="scroll" :data="singer.hotSongs">
          <div class="scroll-content">
            <ul v-if="singer.hotSongs.length">
              <li @click="$_playTheSong(index,singer.hotSongs)" :key="index" v-for="(item,index) in singer.hotSongs">
                <div class="song-item">
                  <p class="song-item-title">{{item.name}}</p>
                  <i class="iconfont">&#xe61d;</i>
                </div>
              </li>
            </ul>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

export default {
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    $_playTheSong(index, songList) {
      this.setPlayList(songList)
      this.setFullScreen(true)
      this.setCurrentIndex(index)
      this.setIsPlay(true)
    },
    $_back() {
      this.$router.go(-1)
    },
    ...mapMutations({
      setPlayList: 'SET_PLAYLIST',
      setFullScreen: 'SET_FULL_SCREEN',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setIsPlay: 'SET_ISPLAY'
    })
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .container
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background $color-background
    .title
      position fixed
      text-align center
      font-size $font-size-m
      width 100%
      height 250px
      overflow hidden
      .singer-name
        position absolute
        width 100%
        top 5px
        left 50%
        transform translateX(-50%)
        color $color-text-white
        .singer-name-alias
          font-size $font-size-s
      .avatar
        width 100%
        overflow hidden
        height 250px
        img
          height 100%
          width 100%
      .iconfont
        position absolute
        display block
        left 15px
        top 10px
        color $color-text-white
        font-size $font-size-s
  .song-item
    height 55px
    margin-left 15px
    line-height 55px
    position relative
    border-bottom 1px solid #EFEFF0
    .song-item-title
      color $color-text
    .iconfont
      position absolute
      color $color-text-gray
      top 0px
      right 15px
      font-size $font-size-m
  .scroll-container
    position fixed
    width 100%
    top 250px
    bottom 0
    .scroll
      overflow hidden
      height 100%
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
