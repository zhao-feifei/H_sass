const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device.app,
  token: (state) => state.user.token
}
export default getters
