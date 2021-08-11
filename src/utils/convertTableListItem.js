export default (value,maxLength = 3) => {
  if(!value){
    return ''
  }
  if(!(value instanceof Array)){
    return value
  }
  // if(value.length > maxLength){
  //   return value.slice(0,3).join(',') + '...'
  // }else{
  //   return value.join(',')
  // }
  return value.join(',')
}
