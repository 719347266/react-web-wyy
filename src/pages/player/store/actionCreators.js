import * as actionTypes from './constants'

import { getRandomNumber } from '@/utils/math-utils'
import { parseLyric } from '@/utils/parse-lyric'

import { getSongDetail, getLyric } from '@/services/player'

const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong
})

const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList
})

// 对外暴露的action
export const changeSequenceAction = (sequence) => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence
})

const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index
})

const changLyricListAction = (lyricList) => ({
  type: actionTypes.CHANGE_LYRIC_LIST,
  lyricList
})

export const changeCurrentLyricIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
  index
})

export const changeCurrentIndexAndSongAction = (tag) => {
  return (dispatch, getState) => {
    console.log(getState().getIn(['player', 'currentSongIndex']))
    // 1.获取当前的index
    let currentSongIndex = getState().getIn(['player', 'currentSongIndex'])
    const playSequence = getState().getIn(['player', 'sequence'])
    const playList = getState().getIn(['player', 'playList'])

    switch (playSequence) {
      case 1:
        let randomIndex = getRandomNumber(playList.length)
        while (currentSongIndex === randomIndex) {
          randomIndex = getRandomNumber(playList.length)
        }
        currentSongIndex = randomIndex
        break
      default:
        currentSongIndex += tag
        if (currentSongIndex === playList.length) currentSongIndex = 0
        if (currentSongIndex === -1) currentSongIndex = playList.length - 1
    }
    const currentsong = playList[currentSongIndex]
    dispatch(changeCurrentSongIndexAction(currentSongIndex))
    dispatch(changeCurrentSongAction(currentsong))

    // 请求歌词
    dispatch(getLyricAction(currentsong.id))
  }
}

export const getSongDetailAction = (idx) => {
  return (dispatch, getState) => {
    // 1.根据id查找列表中已经有的该歌曲
    const playList = getState().getIn(['player', 'playList'])

    const songIndex = playList.findIndex((song) => song.id === idx)

    let song = null
    if (songIndex !== -1) {
      // 找到歌曲
      song = playList[songIndex]
      dispatch(changeCurrentSongIndexAction(songIndex))
      dispatch(changeCurrentSongAction(song))

      dispatch(getLyricAction(song.id))
    } else {
      getSongDetail(idx).then((res) => {
        song = res.songs && res.songs[0]
        if (!song) return
        const newPlayList = [...playList]
        newPlayList.push(song)
        dispatch(changePlayListAction(newPlayList))
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
        dispatch(changeCurrentSongAction(song))

        // 请求歌词
        dispatch(getLyricAction(song.id))
      })
    }
  }
}

export const getLyricAction = (id) => {
  return (dispatch) => {
    getLyric(id).then((res) => {
      console.log(res)
      const lyric = res.lrc.lyric
      const lyricList = parseLyric(lyric)
      dispatch(changLyricListAction(lyricList))
    })
  }
}
