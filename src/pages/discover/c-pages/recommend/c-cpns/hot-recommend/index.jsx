import React, { memo, useEffect, Fragment } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getHotRecommendAction } from '../../store/actionCreators'

import HemeHeaderRCM from 'components/theme-header-rcm'
import SongsCover from 'components/songs-cover'
import { HotRecommendWrapper } from './style'

export default memo(function HotRecommend() {
  // state

  // hooks
  const { hotRecommends } = useSelector(
    (state) => ({
      hotRecommends: state.getIn(['recommend', 'hotRecommends'])
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  // 其他逻辑
  useEffect(() => {
    dispatch(getHotRecommendAction())
  }, [dispatch])

  return (
    <HotRecommendWrapper>
      <HemeHeaderRCM
        title="热门推荐"
        keywords={['华语', '流行', '民谣', '摇滚', '电子']}
      />
      <div className="recommend-list">
        {hotRecommends.map((item, index) => {
          return (
            <Fragment key={item.id}>
              <SongsCover info={item}></SongsCover>
            </Fragment>
          )
        })}
      </div>
    </HotRecommendWrapper>
  )
})
