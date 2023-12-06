export default (params) => {
  const { centered = false } = params || {}
  return {
    centered,
    okText: '取消',
    okButtonProps: {
      type: 'default',
    },
    cancelText: '确定',
    cancelButtonProps: {
      type: 'primary',
    },
    autoFocusButton: null,
    onOk: (cancel) => {
      cancel()
    },
  }
}
