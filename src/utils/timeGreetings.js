// 不同时间展示不同问候语
import moment from 'moment'
const greetingList = {
  beforeDawn: [
    // 凌晨
    '，工作再忙，也不要忘了要保重身体呀！',
    '，好好睡一觉，第二天才会有精神继续前进呀！'
  ],
  morning: [
    //早晨
    '，一日之计在于晨，别忘了吃早餐再工作哟～',
    '，早起的鸟儿有虫吃，早起的人儿变优秀～'
  ],
  forenoon: [
    // 上午
    '，新的一天开始啦，你会找到自己的发光方式哒～',
    '，美好的一天从给自己信心开始，加油加油加油～'
  ],
  noon: [
    // 中午
    '，工作再忙，也别忘了吃饭饭和休息以下哟～',
    '，任务再紧急，也要记得吃饭饭充充电呀～'
  ],
  afternoon: [
    // 下午
    '，休息好了就继续加油加油加油哈～',
    '，劳逸结合很重要，喝杯水适当休息一下哈～'
  ],
  night: [
    // 晚上
    '，辛苦了一天，你的努力不会白费滴～',
    '，辛苦了一天，晚餐也要像对待工作一样认真哟～'
  ],
  lateNight: [
    //深夜
    '，加班辛苦啦！回家路上注意安全哟～',
    '，加班辛苦啦！忙碌了一天记得要好好休息哟～'
  ]
}

const randomTitle = (array) => {
  const num = Math.floor(Math.random() * greetingList[array].length)
  let text =  greetingList[array][num]
  return text

}

const timeGreeting = () => {
  let time = moment().hour()
  if(time >= 0 && time < 6){
    return randomTitle('beforeDawn')
  }else if(time >= 6 && time < 8){
    return randomTitle('morning')
  }else if(time >= 8 && time < 12){
    return randomTitle('forenoon')
  }else if(time >= 12 && time < 14){
    return randomTitle('noon')
  }else if(time >= 14 && time < 18){
    return randomTitle('afternoon')
  }else if(time >= 18 && time < 21){
    return randomTitle('night')
  }else if(time >= 21 && time <= 23){
    return randomTitle('lateNight')
  }
}

export default timeGreeting;