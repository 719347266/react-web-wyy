import React, { memo } from 'react'
import propTypes from 'prop-types'

import { HeaderWrapper } from './style'

const HemeHeaderRCM = memo(function (props) {
  const { title, keywords } = props
  return (
    <HeaderWrapper className="sprite_02">
      <div className="left">
        <h4 className="title">{title}</h4>
        <div className="keyword">
          {keywords.map((item, index) => {
            return (
              <div className="item" key={item}>
                <a href="todu">{item}</a>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <div>更多</div>
        <i className="icon sprite_02"></i>
      </div>
    </HeaderWrapper>
  )
})

HemeHeaderRCM.propTypes = {
  title: propTypes.string.isRequired,
  keywords: propTypes.array
}

HemeHeaderRCM.defaultProps = {
  keywords: []
}

export default HemeHeaderRCM
