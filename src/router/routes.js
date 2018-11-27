import Layout from '_v/layout/Layout'

const routes = [
    {
        path: '*',
        hide: true,
        redirect: '/'
    },
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
        meta: {
            title: '图标'
        },
        children: [
            {
                path: 'index',
                name: 'icons',
                meta: {
                    title: 'AntDesign-icons',
                    icon: 'icon-antdesign'
                },
                component: () => import('_v/Icon')
            },
            {
                path: 'appIcons',
                name: 'appIcons',
                meta: {
                    title: 'appIcons',
                    icon: 'icon-appstore'
                },
                component: () => import('_v/Icon/AppIcon')
            }
        ]
    },
    {
        path: '/articles',
        component: Layout,
        redirect: '/articles/all',
        meta: {
            title: '文章管理',
            icon: 'icon-project-fill'
        },
        children: [
            {
                path: 'all',
                name: 'allArticles',
                meta: {
                    title: '所有文章',
                    icon: 'icon-folder'
                },
                component: () => import('_v/articles/all')
            },
            {
                path: 'directroy',
                name: 'directroy',
                meta: {
                    title: '分类目录',
                    icon: 'icon-orderedlist'
                },
                component: () => import('_v/articles/directroy')
            },
            {
                path: 'tags',
                name: 'tags',
                meta: {
                    title: '文章标签',
                    icon: 'icon-tags'
                },
                component: () => import('_v/articles/tags')
            },
            {
                path: 'images',
                name: 'images',
                meta: {
                    title: '图片管理',
                    icon: 'icon-image'
                },
                component: () => import('_v/articles/imgUpload')
            },
            {
                path: 'post',
                name: 'postArticle',
                meta: {
                    title: '发布文章',
                    icon: 'icon-edit-square'
                },
                component: () => import('_v/articles/post')
            },
            {
                path: 'editArticle/:id',
                name: 'editArticle',
                meta: {
                    title: '修改文章',
                    hide: true,
                    icon: 'icon-edit-square'
                },
                component: () => import('_v/articles/post')
            },
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
