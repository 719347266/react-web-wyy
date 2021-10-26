import {
  getTopBanners,
  getHotRecommends,
  getNewAlbums,
  getTopList
} from '@/services/recommend'
import * as actionTypes from './constants'

const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners
})

const changeHotRecommendAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMEND,
  hotRecommends: res.result
})

const changeNewAlbumsAction = (res) => ({
  type: actionTypes.CHANGE_NEW_ALBUM,
  newAlbums: res.albums
})

const changeUpRankingAction = (res) => ({
  type: actionTypes.CHANGE_UP_RANKING,
  upRanking: res.playlist
})

const changeNewRankingAction = (res) => ({
  type: actionTypes.CHANGE_NEW_RANKING,
  newRanking: res.playlist
})

const changeOriginRankingAction = (res) => ({
  type: actionTypes.CHANGE_ORIGIN_RANKING,
  originRanking: res.playlist
})

export const getTopBannersAction = () => {
  return (dispatch) => {
    getTopBanners().then((res) => {
      dispatch(changeTopBannerAction(res))
    })
  }
}

export const getHotRecommendAction = () => {
  return (dispatch) => {
    getHotRecommends(8).then((res) => {
      dispatch(changeHotRecommendAction(res))
    })
  }
}

export const getNewAlbumsAction = () => {
  return (dispatch) => {
    getNewAlbums(10).then((res) => {
      dispatch(changeNewAlbumsAction(res))
    })
  }
}

export const getTopListAction = (idx) => {
  return (dispatch) => {
    getTopList(idx).then((res) => {
      switch (idx) {
        case 0:
          dispatch(changeUpRankingAction(res))
          break
        case 2:
          dispatch(changeNewRankingAction(res))
          break
        case 3:
          dispatch(changeOriginRankingAction(res))
          break
        default:
      }
    })
  }
}