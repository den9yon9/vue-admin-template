// 权限管理 路由，相应的页面只给有权限的用户看
import router from './index.js'
import Home from '@/pages/Home'
import Users from '@/pages/users/Users'
import UserList from '@/pages/users/UserList'

import NotFound404 from '@/pages/NotFound404'

const home = {
  path: '/',
  redirect: '/users',
  component: Home
}

const users= {
  path: '/users',
  component: Users,
  redirect: '/users/list'
}

const userList = {
  path: '/users/list',
  component: UserList
}

const notfound404 = {
  path: '*',
  component: NotFound404
}

export default function(condition) {
  /*
    TODO: 根据condition生成路由
  */
  home.children = [users]
  users.children = [userList]

  // 添加到路由需要放到最后一步
  router.addRoutes([home, notfound404])
}
