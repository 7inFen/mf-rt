export function transformUploadFile(file) {
  if (file.uid && !file.response) {
    return file
  }
  let response = file.response
  if (response && response.status === 'success') {
    let data = response.data
    return {
      uid: data.id,
      status: 'done',
      url: data.url,
      name: file.name
    }
  }
}

export function getFileIds(fileList,isSingle) {
  let result = []
  fileList.forEach(file => {
    if(file.uid && !file.response){
      result.push(file.uid)
    }else if(file.response.status === 'success'){
      let data = file.response.data
      result.push(data.id)
    }
  })
  if(isSingle){
    if(result.length === 1){
      return result[0]
    }else{
      return null
    }
  }
  return result
}

export function transformServerFile(file) {
  if(!file.status){
    return {
      ...file,
      status: 'done'
    }
  }
  return file
}
