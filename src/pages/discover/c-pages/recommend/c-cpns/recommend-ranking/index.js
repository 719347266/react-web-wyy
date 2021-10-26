import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getTopListAction } from '../../store/actionCreators'

import { RankingWrapper } from './style'
import ThemeHeaderRCM from 'components/theme-header-rcm'
import TopRaning from 'components/top-ranking'

export default memo(function RecomendRanking() {
  const { upRanking, newRanking, originRanking } = useSelector(
    (state) => ({
      upRanking: state.getIn(['recommend', 'upRanking']),
      newRanking: state.getIn(['recommend', 'newRanking']),
      originRanking: state.getIn(['recommend', 'originRanking'])
    }),
    shallowEqual
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTopListAction(0))
    dispatch(getTopListAction(2))
    dispatch(getTopListAction(3))
  }, [dispatch])

  return (
    <RankingWrapper>
      <ThemeHeaderRCM title="榜单" />
      <div className="tops">
        <TopRaning info={upRanking} />
        <TopRaning info={newRanking} />
        <TopRaning info={originRanking} />
      </div>
    </RankingWrapper>
  )
})
