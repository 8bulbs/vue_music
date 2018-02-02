<template>
  <div v-if="playList.length" class="player-container">
    <div class="player-mini-content">
      <div class="poster">
        <img :src="playList[0].album.picUrl" alt="">
      </div>
      <p class="player-title">{{playList[0].name+'('+playList[0].artists[0].name+')'}}</p>
      <div @click="$_togglePlay" class="play-pause">
        <i class="iconfont play">&#xe615;</i>
        <i class="iconfont pause">&#xe7af;</i>
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
      'isPlay'
    ])
  },
  created() {
    console.log(this.playList)
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
    $_getSongUrl() {
      let id = this.playList[0].id
      this.audio.src = 'http://music.163.com/song/media/outer/url?id=' + id + '.mp3'
      this.isPlay = true
    },
    $_playOrPause() {
      if (this.isPlay) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },
    $_togglePlay() {
      this.isPlay = !this.isPlay
      this.setIsPlay(this.isPlay)
    },
    ...mapMutations({
      setIsPlay: 'SET_ISPLAY'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"
 .player-container
    padding 10px
    margin-top 25px
  .player-mini-content
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
      border 1px solid #333
      border-radius 50%
      position absolute
      right 55px
      top 50%
      transform translateY(-50%)
      width $font-size-l
      height $font-size-l
      text-align center
      line-height $font-size-l
      .play
        display block
        color $color-text
        font-size $font-size-s
      .pause
        display none
        color $color-text
        font-size $font-size-s
    .play-list
      display inline-block
      position absolute
      right 10px
      top 50%
      transform translateY(-50%)
      font-size $font-size-l
</style>
