import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import router from './router'
import store from './store'

import YHAppFooter from './components/app-footer'
import YHAppHeader from './components/app-header'
import YHAppPlayBar from './pages/player/app-player-bar'

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <YHAppHeader />
        {renderRoutes(router)}
        <YHAppFooter />
        <YHAppPlayBar />
      </HashRouter>
    </Provider>
  )
})
