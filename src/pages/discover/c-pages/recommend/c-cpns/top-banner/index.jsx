import React, { memo, useEffect, useCallback, useState, useRef } from 'react'

import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { getTopBannersAction } from '../../store/actionCreators'

import { Carousel } from 'antd'
import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from './style'

export default memo(function TopBanner() {
  // state
  const [cuurentIndex, setCurrentIndex] = useState(0)
  const bannerRef = useRef()

  // 组件和redux关联: 获取数据和进行操作
  const { topBanners } = useSelector(
    (state) => ({
      topBanners: state.getIn(['recommend', 'topBanners'])
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  // 其他hooks
  useEffect(() => {
    dispatch(getTopBannersAction())
  }, [dispatch])

  const bannerChange = useCallback((current) => {
    setCurrentIndex(current)
  }, [])

  const bgImage = `${topBanners[cuurentIndex]?.imageUrl}?imageView&blur=40x20`

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            ref={bannerRef}
            effect="fade"
            afterChange={bannerChange}
            autoplay
          >
            {topBanners.map((item, index) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button
            className="btn left"
            onClick={(e) => bannerRef.current.prev()}
          ></button>
          <button
            className="btn right"
            onClick={(e) => bannerRef.current.next()}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})
