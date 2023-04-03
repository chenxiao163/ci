import { asyncRoutes, constantRoutes } from '@/router'
import { getPermission, getSlider, setPermission } from '@/utils/auth' // get token from cookie
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(approutes) {
  const res = []
  const user_permission = JSON.parse(getSlider())
  var permissionBtns = []
  approutes.forEach(route => {
    const tmp = { ...route }
    const tmps = JSON.parse(JSON.stringify(route))
    var arrayOfSquares = []
    var arraychildren = []
    user_permission.forEach(ele => {
      if (arrayOfSquares.indexOf(ele.resource_name) === -1) {
        arrayOfSquares.push(ele.resource_name)
      }
      if (ele.children && ele.children[0]) {
        arraychildren.push(ele.children[0].resource_name)
      }
    })
    if (arrayOfSquares.indexOf(tmp.meta.title) !== -1) {
      if (tmp.children) {
        var i = 0
        tmps.children.forEach((child, index) => {
          if (arraychildren.indexOf(child.meta.title) === -1) {
            tmp.children.splice(index - i, 1)
            ++i
          } else {
            user_permission.forEach(element => {
              // console.log(88, element, child)
              if (element.children && element.children[0] && (element.children[0].resource_name === child.meta.title)) {
                if (element.children[0].children && element.children[0].children.length === 2) {
                  permissionBtns.push(element.children[0].resource_name)
                } else if (element.children[0].children && element.children[0].children.length === 1) {
                  if (element.children[0].children[0].resource_name !== '查看') {
                    permissionBtns.push(element.children[0].resource_name)
                  }
                } else {
                  tmp.children.splice(index - i, 1)
                  ++i
                }
              }
            })
          }
        })
      }
      res.push(tmp)
    }
  })
  setPermission(JSON.stringify(permissionBtns))
  return res
}

const state = {
  routes: [],
  flag: false,
  addRoutes: [],
  mypermissions: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_FLAG: (state, flag) => {
    state.flag = flag
  },
  SET_PERMISSIONS: (state, mypermissions) => {
    state.mypermissions = mypermissions
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      var accessedRoutes = filterAsyncRoutes(asyncRoutes)
      accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_PERMISSIONS', JSON.parse(getPermission()))
      commit('SET_FLAG', true)
      resolve(accessedRoutes)
    })
  },
  resetFlag({ commit }, flag) {
    commit('SET_FLAG', flag)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
