// Downloader.ts
import { AxiosResponse, AxiosRequestConfig } from 'axios'
import fileDownload from 'js-file-download'
// @ts-ignore
import requestInstance from '../lib/requestInstance'
// @ts-ignore
import getApiFullPath from '../utils/getApiFullPath'

/**
 * 提取文件名.
 * @param response axios的response
 * @description 从reponse header的content-disposition中提取文件名.
 */
const extractFilenameFromResponseHeader = (response: AxiosResponse): string => {
  // content-disposition: "attachment; filename=xxxx.docx;"
  const contentDisposition = response.headers['content-disposition']
  const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
  const result = patt.exec(contentDisposition) as RegExpExecArray
  let filename = ''

  if (result) {
    filename = result.length > 0 ? result[1] : ''
  }
  // 解码之前尝试去除空格和双引号
  // content-disposition: "attachment; filename=\"xxxx.docx\";"
  return decodeURIComponent(filename.trim().replace(new RegExp('"', 'g'), ''))
}

// const axiosInstance = axios.create({/*
// 	可以传递公共默认的axios配置，但是注意reponse interceptor中默认把reponse.data作为JSON解析的情况
// */});

// https://www.zhihu.com/question/263323250
// https://github.com/axios/axios/issues/815#issuecomment-340972365
export default async function (
  config: AxiosRequestConfig,
  filename = ''
): Promise<any | AxiosResponse<any>> {
  // let response = await axiosInstance({
  //   ...config,
  //   responseType: 'blob', // 指定类型
  // });
  const response = await requestInstance.request({
    // method: 'get',
    ...config,
    url: getApiFullPath(config.url),
    // params: qs.stringify(config.params),
    responseType: 'blob', // 指定类型
  })

  const resBlob = response.data // <--- store the blob if it is
  let respData = null

  // 如果确定接口response.data是二进制，所以请求失败时是JSON.
  // 这里只对response.data做JSON的尝试解析
  try {
    const respText = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('abort', reject)
      reader.addEventListener('error', reject)
      reader.addEventListener('loadend', () => {
        resolve(reader.result as string)
      })
      reader.readAsText(resBlob)
    })
    respData = JSON.parse(respText as string) // <--- try to parse as json evantually
  } catch (err) {
    // ignore
  }
  // 如果response.data能够确定是二进制，则respData = null说明请求成功
  // 否则 respData !== null说明请求失败
  if (respData) {
    // 方便调用者有进一步的 then().catch()处理
    return Promise.reject({
      ...respData,
    })
  } else {
    // 触发浏览器下载
    // 如果没有传递filename尝试从Content-Disposition提取
    fileDownload(resBlob, filename || extractFilenameFromResponseHeader(
      response
    ))
    // 方便调用者有进一步的 then().catch()处理
    return Promise.resolve({
      ...response,
    })
  }
}
