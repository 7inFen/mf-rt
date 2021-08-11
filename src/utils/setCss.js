/*
 * 动态添加 CSS 样式
 * @param selector {string} 选择器
 * @param rules    {string} CSS样式规则
 * @param index    {number} 插入规则的位置, 靠后的规则会覆盖靠前的，默认在后面插入
 */
export default (() => {
  // 创建一个 style， 返回其 stylesheet 对象
  const createStyleSheet = () => {
    const style = document.createElement('style')
    style.type = 'text/css'
    document.head.appendChild(style)
    return style.sheet
  }

  // 创建 stylesheet 对象
  const sheet = createStyleSheet()

  // 返回接口函数
  return (selector, rules, index) => {
    index = index || 0
    sheet.insertRule(selector + '{' + rules + '}', index)
  }
})()
