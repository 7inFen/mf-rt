export default function (list){
  if(!list){
    return null
  }
  return list.map(first => {
    return {
      value:first.id,
      label:first.name,
      children:first.children.map(second => {
        return {
          value:second.id,
          label:second.name
        }
      })
    }
  })
}
