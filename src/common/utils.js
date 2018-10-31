import routers from '../router/routes'
export function getBreadCrumbList (route) {
    let breadCrumbList = []
    routers.find((item) => {
        if (item.path === route) {
            breadCrumbList.push({
                path: item.path,
                title: item.meta.title,
                icon: item.meta.icon
            })
            return true
        } else {
            if (item.children && item.children.length === 1) {
                if (item.path + item.children[0].path === route) {
                    breadCrumbList.push({
                        path: item.path + item.children[0].path,
                        title: item.children[0].meta.title,
                        icon: item.children[0].meta.icon
                    })
                    return true
                }
            } else if (item.children && item.children.length > 1) {
                return item.children.find((childItem) => {
                    if (item.path + '/' + childItem.path === route) {
                        breadCrumbList.push({
                            path: item.path,
                            title: item.meta.title,
                            icon: item.meta.icon
                        })
                        breadCrumbList.push({
                            path: item.path + '/' + childItem.path,
                            title: childItem.meta.title,
                            icon: childItem.meta.icon
                        })
                        return true
                    }
                })
            }
        }
    })
    console.log(breadCrumbList)
    return breadCrumbList
}
