/**
 * @author QIN Fen
 * @email hellowd93@gmail.com
 * @create date 2020-01-06 17:07:04
 * @modify date 2020-01-06 17:07:04
 * @desc 返回上传成功的图片List，剔除不必要的字段
 */

export default (fileList = [], params) => {
  params = {
    keys: ['id', 'url', 'name'],
    ...params,
  }
  const valueList = []
  fileList.forEach((file) => {
    const { status: fileStatus, response, _uploadType } = file
    if (_uploadType === 'new') {
      // 新增文件
      if (fileStatus === 'done') {
        const { status, data = {} } = response || {}
        if (status === 'success') {
          const fileData = {}
          params.keys.forEach((key) => {
            fileData[key] = data[key]
          })
          fileData.uid = fileData.id
          valueList.push(fileData)
        }
      }
    } else {
      // 原文件
      valueList.push(file)
    }
  })
  return valueList
}

export const getUploadFilesKey = (fileList = [], params) => {
  // console.log(fileList)
  params = {
    key: 'id',
    ...params,
  }
  const valueList = []
  fileList.forEach((file) => {
    const { status: fileStatus, response, _uploadType } = file
    if (_uploadType === 'new') {
      // 新增文件
      if (fileStatus === 'done') {
        const { status, data = {} } = response || {}
        if (status === 'success') {
          valueList.push(data[params.key])
        }
      }
    } else {
      // 原文件
      valueList.push(file[params.key] || file.uid)
    }
  })
  return valueList
}
