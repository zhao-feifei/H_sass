const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device.app,
  token: (state) => state.user.token,
  name: (state) => state.user.userInfo.username, // 建立用户名称的映射
  userId: (state) => state.user.userInfo.userId, // 建立用户id的映射
  staffPhoto: (state) => state.user.userInfo.staffPhoto, // 建立用户头像的映射
  companyId: (state) => state.user.userInfo.companyId, // 建立对于user模块的companyId的快捷访问
  routes: (state) => state.permission.routes // 导出当前的路由
}
export default getters
