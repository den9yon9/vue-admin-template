import VModal from 'vue-js-modal'

const modal = {
  install(Vue) {
    Vue.use(VModal, { dialog: true })
    Vue.prototype.$confirm = async function(options) {
      return await new Promise((resolve, reject) => {

        const defaultButtons = [{
          title: '确定',
          handler: () => {
            Vue.prototype.$modal.hide('dialog');
            resolve(true)
          },
          default: !options.default
        }, ]

        if (!options.hidecancel) {
          defaultButtons.push({
            title: '取消',
            handler: () => {
              Vue.prototype.$modal.hide('dialog');
              resolve(false)
            }
          })
        }

        Vue.prototype.$modal.show('dialog', {
          title: options.title || '提示',
          text: typeof options === 'string' ? options : options.content,
          buttons: typeof options === 'string' ? defaultButtons : options.buttons || defaultButtons
        })
      })
    }
  }
}

export default modal
