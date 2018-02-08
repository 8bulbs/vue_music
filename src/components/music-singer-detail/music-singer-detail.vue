<template>
  <transition name="slide">
    <div class="container">
      <div class="title">
        <h5 class="singer-name">
          {{singer.artist.name}}
          <span class="singer-name-alias">{{singer.artist.alias[0]}}</span>
        </h5>
        <img :src="singer.artist.picUrl" alt="" class="avatar">
        <i @click="$_back" class="iconfont">&#xe60b;</i>
      </div>
      <ul v-if="singer.hotSongs.length">
        <li @click="$_playTheSong(item)" :key="index" v-for="(item,index) in singer.hotSongs">
          <div class="song-item">
            <p class="song-item-title">{{item.name}}</p>
            <i class="iconfont">&#xe61d;</i>
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { getSong } from 'api/song'
import { STATUS_OK } from 'api/config'

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
    $_back() {
      this.$router.go(-1)
    },
    ...mapMutations({
      setPlayList: 'SET_PLAYLIST',
      setFullScreen: 'SET_FULL_SCREEN',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setIsPlay: 'SET_ISPLAY'
    })
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
      text-align center
      font-size $font-size-m
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
</style>
