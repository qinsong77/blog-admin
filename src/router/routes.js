import Layout from '_v/layout/Layout'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: 'dashboard',
          icon: 'icon-radarchart'
        },
        component: () => import('_v/dashboard')
      }
    ]
  }, {
    path: '/icons',
    component: Layout,
    redirect: '/icons/index',
    children: [
      {
        path: 'index',
        name: 'icons',
        meta: {
          title: 'icons',
          icon: 'icon-heatmap'
        },
        component: () => import('_v/Icon')
      }
    ]
  },
  {
    path: '/manger',
    component: Layout,
    redirect: '/manger/articles',
    meta: {
      title: '博客管理',
      icon: 'icon-setting'
    },
    children: [
      {
        path: 'articles',
        name: 'articles',
        meta: {
          title: '文章管理',
          icon: 'icon-edit-square'
        },
        component: () => import('_v/manger/mangerArticles')
      },
      {
        path: 'tags',
        name: 'tags',
        meta: {
          title: '标签管理',
          icon: 'icon-tags'
        },
        component: () => import('_v/manger/tags')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hide: true,
    component: () => import(/* webpackChunkName: "about" */ '_v/login')
  }
]
export default routes
