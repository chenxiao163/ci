import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, removeGameMark } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { resetRouter } from '@/router'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  if (process.env.NODE_ENV === 'production') {
    if (to.query && to.query['token'] && to.query['user_name']) {
      removeGameMark()
      const query = { username: to.query['user_name'], token: to.query['token'] }
      await store.dispatch('user/getGames', query)
    }
  }
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next()
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      if (to.path === '/games' || to.path.includes('addGame')) {
        removeGameMark()
        store.dispatch('user/changeSlider', false)
        store.dispatch('permission/resetFlag', false)
      } else {
        store.dispatch('user/changeSlider', true)
        const isflag = store.getters.flag
        if ((from.path === '/games' || from.path === '/') && !isflag) {
          resetRouter()
          try {
            // console.log(999)
            await store.dispatch('user/getInfo')
            const accessRoutes = await store.dispatch('permission/generateRoutes')
            router.addRoutes(accessRoutes)
            next({ ...to, replace: true })
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            Message.error(error || 'Has Error')
            if (process.env.NODE_ENV === 'production') {
              location.href = 'https://tmp.tuyoo.com/'
            } else {
              // next(`/login?redirect=games`)
            }
            NProgress.done()
          }
        }
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      if (process.env.NODE_ENV === 'production') {
        location.href = 'https://tmp.tuyoo.com/'
      } else {
        next(`/login?redirect=games`)
      }
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
