<template>
  <header>
    <h1 class="header"><i class="iconfont">&#xe62f;</i> doudou music</h1>
  </header>
</template>

<script>
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"
  .header
    position relative
    text-align center
    font-size $font-size-l
    height 64px
    line-height 64px
    color #fff
    background $color-theme
    font-weight $font-bold
    .iconfont
      background  $color-theme
      font-size $font-size-l
      font-weight $font-bold
</style>
