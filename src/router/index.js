import Vue from 'vue'
import Router from 'vue-router'
import MusicRecommend from 'components/music-recommend/music-recommend'
import MusicRank from 'components/music-rank/music-rank'
import MusicSearch from 'components/music-search/music-search'
import MusicSinger from 'components/music-singer/music-singer'
import MusicSingerDetail from 'components/music-singer-detail/music-singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: MusicRecommend
    },
    {
      path: '/rank',
      component: MusicRank
    },
    {
      path: '/singer',
      component: MusicSinger
    },
    {
      path: '/search',
      component: MusicSearch
    },
    {
      path: '/singerDetail',
      component: MusicSingerDetail
    }
  ]
})
