import Layout from '@/layout'

export default {
  path: '/setting', // 路径
  name: 'setting', // 给路由规则加一个name
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [
    {
      path: '', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import('@/views/setting'),

      meta: {
        title: '设置',
        icon: 'setting'
      }
    }
  ]
}
