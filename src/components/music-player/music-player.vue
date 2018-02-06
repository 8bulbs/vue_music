<template>
  <div v-if="playList.length" class="player-container">
    <div v-show="fullScreen" class="player-normal-content">
      <div class="background">
        <img :src="currentSong.al.picUrl" alt="">
      </div>
      <div class="disc">
        <div class="disc-wrapper">
          <img ref="disc-image" :class="{'rotate':isPlay}" :src="currentSong.al.picUrl" alt="">
          <span class="mask"></span>
        </div>
      </div>
      <div @click="$_toggleFullScreen" class="back">
        <i class="iconfont">&#xe60b;</i>
      </div>
      <div @click="$_togglePlay" class="play-pause">
        <i v-show="!isPlay" class="iconfont play">&#xe615;</i>
        <i v-show="isPlay" class="iconfont pause">&#xe7af;</i>
      </div>
    </div>
    <div v-show="!fullScreen" class="player-mini-content">
      <div @click="$_toggleFullScreen" class="poster">
        <img :src="currentSong.al.picUrl" alt="">
      </div>
      <p class="player-title">{{currentSong.name}}</p>
      <div @click="$_togglePlay" class="play-pause">
        <i v-show="!isPlay" class="iconfont play">&#xe615;</i>
        <i v-if="isPlay" class="iconfont pause">&#xe7af;</i>
      </div>
      <div class="iconfont play-list">
        <i class="iconfont">&#xe640;</i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      songUrl: '',
      audio: new Audio()
    }
  },
  computed: {
    ...mapGetters([
      'playList',
      'isPlay',
      'fullScreen',
      'currentSong'
    ])
  },
  created() {
  },
  watch: {
    playList() {
      this.$_getSongUrl()
    },
    isPlay() {
      this.$_playOrPause()
    }
  },
  methods: {
    $_toggleFullScreen() {
      this.setFullScreen(!this.fullScreen)
    },
    $_getSongUrl() {
      this.audio.pause()
      let id = this.currentSong.id
      this.audio.src = 'http://music.163.com/song/media/outer/url?id=' + id + '.mp3'
      this.audio.play()
    },
    $_playOrPause() {
      if (this.isPlay) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },
    $_togglePlay() {
      this.setIsPlay(!this.isPlay)
    },
    ...mapMutations({
      setIsPlay: 'SET_ISPLAY',
      setFullScreen: 'SET_FULL_SCREEN'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"
 .player-container
  .player-normal-content
    position fixed
    left 0
    right 0
    bottom 0
    top 0
    z-index 1000
    width 100%
    height 100%
    background $color-player-gray /*debug*/
    .play-pause
      display inline-block
      border 2px solid #fff
      border-radius 50%
      position absolute
      left 50%
      bottom 25px
      transform translate(-50%,-50%)
      width 28px
      height 28px
      text-align center
      line-height 28px
      .play
        display block
        color $color-text-white
        font-size $font-size-s
        font-weight bold
      .pause
        display block
        color $color-text-white
        font-size $font-size-s
        font-weight bold
    .back
      color $color-text-white
      position absolute
      top 25px
      left 25px
    .background
      position absolute
      let 0
      top 0
      width 100%
      height 100%
      filter blur(15px)
      z-index -1
      img
        width 100%
        height 100%
    .disc
      width 206px
      height 206px
      position absolute
      left 50%
      top 25%
      transform translate(-50%,0%)
      z-index 150
      opacity 0.6
      .disc-wrapper
        width 198px
        height 198px
        img
          width 130px
          height 130px
          border-radius 50%
          z-index -1
          margin 34px
          display block
        img.rotate
          animation: rotate 25s linear infinite
        .mask
          display block
          position: absolute;
          width: 206px;
          height: 205px;
          top: -4px;
          left: -4px;
          bg-image('coverall')
          background-position -140px -580px
  .player-mini-content
    padding 10px
    margin-top 25px
    position relative
    .poster
      display inline-block
      border 1px solid #ccc
      height $font-size-l
      width $font-size-l
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      img
        width $font-size-l
    .player-title
      display inline-block
      position absolute
      left 50px
      top 50%
      transform translateY(-50%)
    .play-pause
      display inline-block
      border 2px solid #333
      border-radius 50%
      position absolute
      right 55px
      top 50%
      transform translateY(-50%)
      width 28px
      height 28px
      text-align center
      line-height 28px
      .play
        display block
        color $color-text
        font-size $font-size-s
        font-weight bold
      .pause
        display block
        color $color-text
        font-size $font-size-s
        font-weight bold
    .play-list
      display inline-block
      position absolute
      right 10px
      top 50%
      transform translateY(-50%)
      font-size $font-size-l
    @keyframes rotate
      0%
        transform: rotate(0)
      100%
        transform: rotate(360deg)
</style>
