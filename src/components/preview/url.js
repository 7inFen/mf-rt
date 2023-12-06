import queryString from 'query-string'

const XDOC_FORMAT = [
  'pdf',
  'docx',
  'doc',
  'xlsx',
  'xls',
  'pptx',
  'ppt',
  'zip',
  'tiff',
  'mp4',
  'txt',
  'csv',
  'rar',
  'm4a',
  'mp3',
  'wav',
]
const XDOC_URL = 'http://view.xdocin.com/xdoc?_xdoc='
const XDOC_PARAMS = {
  _pdf: true, // word/excel文档尝试以pdf方式显示，默认false
  // _watermark: 'XDOC文档预览', // 水印文本，显示水印
  // "_saveable": false, //是否允许保存PDF，默认true
  // "_printable": false, //是否允许打印PDF，默认true
  // "_copyable": false, //是否允许选择复制内容，默认true
  // "_toolbar": false, //是否显示底部工具条，默认true
  // "_title": "文档预览", //自定义标题
  // "_expire": 30, //预览链接有效期，单位分钟，默认永久有效
  // "_limit": "1,3", //限制页数，如：“5”表示只显示前5页，“2,5”表示从第2页开始的5页，对pdf/doc/docx/ppt/pptx有效
}

const getFileFormat = ({ name }) => {
  return `${name?.split?.('.')?.slice?.(-1)?.[0] || ''}`.toLowerCase()
}

const xDocSupport = ({ name }) => {
  const fileFormat = getFileFormat({ name })
  return XDOC_FORMAT.includes(fileFormat)
}

const previewUrl = ({ url, name }) => {
  if (xDocSupport({ name })) {
    const previewUrl = `${XDOC_URL}${encodeURIComponent(url)}&${queryString.stringify(XDOC_PARAMS)}`
    return previewUrl
  }
  return url
}

const IMAGE_FORMAT = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg']
const isImage = ({ name }) => {
  const fileFormat = getFileFormat({ name })
  return IMAGE_FORMAT.includes(fileFormat)
}

export default previewUrl
export { xDocSupport, isImage }
