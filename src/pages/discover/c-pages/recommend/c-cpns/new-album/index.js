import React, { memo, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getNewAlbumsAction } from '../../store/actionCreators'

import ThemeHeaderRCM from 'components/theme-header-rcm'
import AlbumCover from 'components/album-cover'

import { AlbumWrapper } from './style'
import { Carousel } from 'antd'

export default memo(function NewAlbum() {
  // redux hooks
  const dispatch = useDispatch()
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(['recommend', 'newAlbums'])
    }),
    shallowEqual
  )
  // 其他 hooks
  const pageRef = useRef()
  useEffect(() => {
    dispatch(getNewAlbumsAction())
  }, [dispatch])
  return (
    <AlbumWrapper>
      <ThemeHeaderRCM title="新碟上架" />
      <div className="content">
        <div
          className="arrow arrow-left sprite_02"
          onClick={(e) => pageRef.current.prev()}
        ></div>
        <div className="album">
          <Carousel ref={pageRef}>
            {
              //
              [0, 1].map((item) => {
                return (
                  <div className="page" key={item}>
                    {
                      //
                      newAlbums.slice(item * 5, (item + 1) * 5).map((iten) => {
                        return (
                          <AlbumCover
                            key={iten.id}
                            info={iten}
                            size={100}
                            width={118}
                            bgp="-570px"
                          />
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <div
          className="arrow arrow-right sprite_02"
          onClick={(e) => pageRef.current.next()}
        ></div>
      </div>
    </AlbumWrapper>
  )
})
