class Message {
  constructor() {
    this.site = 'MDFULL_KOL'
    this.targetOrigin = '*'
  }

  post({ path = '', targetPaths = [], action = 'refresh' }) {
    if (window.opener) {
      console.log(path, targetPaths)
      window.opener.postMessage(
        {
          site: this.site,
          path,
          targetPaths,
          payload: {
            action,
          },
        },
        this.targetOrigin,
      )
    }
  }

  listen(callback) {
    window.addEventListener(
      'message',
      (receiveMessage) => {
        const data = receiveMessage.data || {}
        const { site, payload = {} } = data
        if (site === this.site) {
          callback?.({
            payload,
            refresh: payload.action === 'refresh',
            ...data,
          })
        }
      },
      false,
    )
  }
}

export default new Message()
