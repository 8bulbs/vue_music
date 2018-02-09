<template>
  <div v-if="playList.length" class="player-container">
    <transition name="slide">
    <div v-show="fullScreen" class="player-normal-content">
      <div class="title">
        <p class="title-songName">{{songName | strLimit()}}</p>
        <p class="title-singerName">{{singerName | strLimit()}}</p>
        <p class="title-albumName">{{albumName | strLimit()}}</p>
      </div>
      <div class="background">
        <img :src="picUrl" alt="">
      </div>
      <div class="disc">
        <div class="disc-wrapper">
          <img ref="disc-image" :class="{'rotate':isPlay}" :src="picUrl" alt="">
          <span class="mask"></span>
        </div>
      </div>
      <div @click="$_toggleFullScreen" class="back">
        <i class="iconfont">&#xe635;</i>
      </div>
      <i v-show="mode==0" class="iconfont sequence">&#xe649;</i>
      <i v-show="mode==1" class="iconfont loop">&#xe66d;</i>
      <i v-show="mode==2" class="iconfont random">&#xe622;</i>
      <i @click="$_changeSong(false)" class="iconfont prev">&#xe6e1;</i>
      <div @click="$_togglePlay" class="play-pause">
        <i v-show="!isPlay" class="iconfont play">&#xe615;</i>
        <i v-show="isPlay" class="iconfont pause">&#xe7af;</i>
      </div>
      <i @click="$_changeSong(true)" class="iconfont next">&#xe718;</i>
      <i class="iconfont list">&#xe640;</i>
    </div>
    </transition>
    <div v-show="!fullScreen" class="player-mini-content">
      <div @click="$_toggleFullScreen()" class="player-mini-content-container">
        <div class="poster">
          <img :src="picUrl" alt="">
        </div>
        <p class="player-title">{{songName}}</p>
      </div>
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
import { getSong } from 'api/song'

export default {
  data() {
    return {
      songUrl: '',
      audio: new Audio(),
      picUrl: '',
      songName: '',
      albumName: '',
      singerName: ''
    }
  },
  computed: {
    ...mapGetters([
      'playList',
      'isPlay',
      'fullScreen',
      'currentSong',
      'mode',
      'currentIndex'
    ])
  },
  watch: {
    isPlay() {
      this.$_playOrPause()
    },
    currentSong() {
      this.$_getSongUrl()
      this.$_getDetails()
    }
  },
  methods: {
    $_changeSong(flag) {
      let index = this.currentIndex
      let len = this.playList.length
      if (flag) {
        if (index === len - 1) {
          index = 0
        } else {
          index++
        }
      } else {
        if (index === 0) {
          index = len - 1
        } else {
          index--
        }
      }
      this.setCurrentIndex(index)
    },
    $_toggleFullScreen() {
      this.setFullScreen(!this.fullScreen)
    },
    $_getSongUrl() {
      this.audio.pause()
      let id = this.currentSong.id
      this.audio.src = 'http://music.163.com/song/media/outer/url?id=' + id + '.mp3'
      let timer = setTimeout(() => {
        this.audio.play()
        clearTimeout(timer)
        timer = null
      }, 700)
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
      setFullScreen: 'SET_FULL_SCREEN',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    }),
    $_getDetails() {
      getSong(this.currentSong.id)
        .then(res => {
          let song = res.data.songs[0]
          this.picUrl = song.al.picUrl
          this.songName = song.name
          this.albumName = song.al.name
          this.singerName = song.ar[0].name
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(0, 100%, 0)
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
    .title
      position absolute
      left 50%
      top 25px
      transform translateX(-50%)
      color $color-text-white
      .title-songName
        text-align center
        font-size $font-size-l
        margin-bottom 10px
      .title-singerName
        text-align center
        font-size $font-size-s
        margin-bottom 7px
      .title-albumName
        text-align center
        font-size $font-size-s
    .random,.sequence,.loop
      display inline-block
      position absolute
      left 10%
      bottom 25px
      transform translate(-50%,-50%)
      width 28px
      height 28px
      text-align center
      line-height 28px
      color $color-text-white
    .sequence
      font-size 25px
      bottom 31px
    .prev
      display inline-block
      position absolute
      left 30%
      bottom 25px
      transform translate(-50%,-50%)
      width 28px
      height 28px
      text-align center
      line-height 28px
      color $color-text-white
    .next
      display inline-block
      position absolute
      left 70%
      bottom 25px
      transform translate(-50%,-50%)
      width 28px
      height 28px
      text-align center
      line-height 28px
      color $color-text-white
    .list
      display inline-block
      position absolute
      left 90%
      bottom 25px
      transform translate(-50%,-50%)
      width 28px
      height 28px
      text-align center
      line-height 28px
      color $color-text-white
    .play-pause
      display inline-block
      border 2px solid #fff
      border-radius 50%
      position absolute
      left 50%
      bottom 13px
      transform translate(-50%,-50%)
      width 35px
      height 35px
      text-align center
      line-height 28px
      .play
        display block
        color $color-text-white
        font-size $font-size-s
        font-weight bold
        transform translateY(5px)
      .pause
        display block
        color $color-text-white
        font-size $font-size-s
        font-weight bold
        transform translateY(5px)
    .back
      color $color-text-white
      position absolute
      top 25px
      left 25px
      font-size $font-size-s
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
    position fixed
    height 55px
    background #fff
    width 100%
    bottom 30px
    transform translateY(50%)
    .player-mini-content-container
      height 55px
      .poster
        display inline-block
        border 1px solid #ccc
        height 34px
        width 34px
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        img
          width 34px
      .player-title
        display inline-block
        position absolute
        left 57px
        top 50%
        transform translateY(-50%)
        overflow hidden
        width 170px
        height $font-size-m
        font-size $font-size-s
        line-height $font-size-m
    .play-pause
      display inline-block
      border 2px solid #333
      border-radius 50%
      position absolute
      right 95px
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
      right 30px
      top 50%
      transform translateY(-50%)
      font-size $font-size-l
    @keyframes rotate
      0%
        transform: rotate(0)
      100%
        transform: rotate(360deg)
</style>
