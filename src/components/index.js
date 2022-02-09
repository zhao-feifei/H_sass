//全局自定义组件的注册
import PageTools from './PageTools/index.vue'
export default {
  install(Vue) {
    Vue.use(PageTools)
  }
}
