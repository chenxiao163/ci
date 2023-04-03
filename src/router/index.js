import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const asyncRoutes = [
  {
    path: "/userManage",
    component: Layout,
    redirect: "/userManage/userInfos",
    name: "UserManage",
    meta: {
      title: "玩家管理",
      icon: "peoples"
    },
    children: [
      {
        path: "userInfos",
        component: () => import("@/views/userManage/userInfos/index.vue"),
        name: "UserInfos",
        meta: { title: "玩家资源", keepAlive: true }
      },
      {
        path: "forbidden",
        component: () => import("@/views/userManage/forbidden/index"),
        name: "Forbidden",
        meta: { title: "玩家禁言", keepAlive: true }
      },
      {
        path: "fenghao",
        component: () => import("@/views/userManage/fenghao/index"),
        name: "Fenghao",
        meta: { title: "封号", keepAlive: true }
      },
      {
        path: "fengRecord",
        component: () => import("@/views/userManage/fengRecord/index"),
        name: "FengRecord",
        meta: { title: "封禁记录", keepAlive: true }
      },
      {
        path: "downServer",
        component: () => import("@/views/userManage/downServer/index"),
        name: "DownServer",
        meta: { title: "停服", keepAlive: true }
      },
      {
        path: "kicking",
        component: () => import("@/views/userManage/kicking/index"),
        name: "DownServer",
        meta: { title: "踢人", keepAlive: true }
      },
      {
        path: "forbidInto",
        component: () => import("@/views/userManage/forbidInto/index"),
        name: "ForbidInto",
        meta: { title: "禁止进入", keepAlive: true }
      }
    ]
  },
  {
    path: "/email",
    component: Layout, // Parent router-view
    name: "Email",
    meta: { title: "邮件功能", icon: "email" },
    redirect: "/email/full",
    children: [
      {
        path: "full",
        name: "Full",
        component: () => import("@/views/email/full/index"),
        meta: { title: "全服邮件", keepAlive: true }
      },

      {
        path: "ori",
        name: "Ori",
        component: () => import("@/views/email/ori/index"),
        meta: { title: "定向邮件", keepAlive: true }
      },
      {
        path: "templateManagement",
        name: "TemplateManagement",
        component: () => import("@/views/email/templateManagement/index"),
        meta: { title: "模板管理", keepAlive: true }
      },
      {
        path: "approval",
        name: "Approval",
        component: () => import("@/views/email/approval/index"),
        meta: { title: "邮件审批", keepAlive: true }
      },
      {
        path: 'detail/:id(\.*\)',
        name: "Detail",
        component: () => import("@/views/email/approval/detail"),
        meta: { title: "邮件详情" },
        hidden: true
        // activeMenu: "/email/approval"
      },
      {
        path: "stateAdd",
        name: "StateAdd",
        component: () => import("@/views/email/stateAdd/index"),
        meta: { title: "功能状态调整", keepAlive: true }
      },
      {
        path: "stateList",
        name: "StateList",
        component: () => import("@/views/email/stateList/index"),
        meta: { title: "功能状态调整审批", keepAlive: true }
      },
      {
        path: "statedetail",
        name: "Statedetail",
        component: () => import("@/views/email/stateList/detail"),
        meta: { title: "功能状态调整详情", keepAlive: true },
        hidden: true
      }
    ]
  },
  {
    path: "/serve",
    component: Layout,
    name: "Serve",
    meta: { title: "其它功能", icon: "example" },
    redirect: "/serve/servelist",
    children: [
      {
        path: "servelist",
        name: "Servelist",
        component: () => import("@/views/serverInfo/list/index"),
        meta: { title: "开服进度", keepAlive: true }
      },
      {
        path: "report",
        name: "Report",
        component: () => import("@/views/serverInfo/report/index"),
        meta: { title: "举报", keepAlive: true }
      },
      {
        path: "legionAds",
        name: "LegionAds",
        noCache: true,
        component: () => import("@/views/serverInfo/legionAds/index"),
        meta: { title: "军团公告监控", keepAlive: true }
      },
      {
        path: "legion",
        name: "Legion",
        component: () => import("@/views/serverInfo/legion/index"),
        meta: { title: "军团数据", keepAlive: true }
      },
      {
        path: "reportdetail",
        name: "Reportdetail",
        component: () => import("@/views/serverInfo/report/detail"),
        meta: { title: "举报详情", keepAlive: true },
        hidden: true
      },
      {
        path: "client",
        name: "Client",
        component: () => import("@/views/serverInfo/client/index"),
        meta: { title: "客户端管理", keepAlive: true }
      }
    ]
  },
  {
    path: "/permission",
    component: Layout,
    name: "Permission",
    meta: { title: "权限配置", icon: "lock" },
    redirect: "/serve/user",
    children: [
      {
        path: "user",
        name: "User",
        component: () => import("@/views/permission/user/index"),
        meta: { title: "用户管理", keepAlive: true }
      },
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/permission/role/index"),
        meta: { title: "角色管理", keepAlive: true }
      },
      {
        path: "per",
        name: "Per",
        component: () => import("@/views/permission/per/index"),
        meta: { title: "权限管理", keepAlive: true }
      }
    ]
  }
];

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/games",
    hidden: true,
    children: [
      {
        path: "games",
        name: "Games",
        component: () => import("@/views/game/index"),
        meta: { title: "Games", icon: "peoples", keepAlive: true }
      }
    ]
  }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
