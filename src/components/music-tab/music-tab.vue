<template>
  <nav>
    <ul class="nav">
      <router-link to="/recommend" tag="li" class="tab">
        <span class="tab-text">推荐</span>
      </router-link>
      <router-link to="/rank" tag="li" class="tab">
        <span class="tab-text">排行</span>
      </router-link>
      <router-link to="/singer" tag="li" class="tab">
        <span class="tab-text">歌手</span>
      </router-link>
      <router-link to="/search" tag="li" class="tab">
        <span class="tab-text">搜索</span>
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  .nav
    display flex
    justify-content space-between
    height 40px
    line-height 40px
    border-bottom 1px solid #ccc
    .tab
      text-align center
      width 25%
      font-size $font-size-m
      .tab-text
        display inline-block
        height 38px
        line-height 38px
        padding 0 5px
      &.router-link-active
        .tab-text
          color $color-theme
          border-bottom 2px solid $color-theme-dark
</style>
