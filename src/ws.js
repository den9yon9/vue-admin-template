import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

const SOCK_URL = `${window.ws_domain}`
const SUBSCRIBE_URL = '/quickfan/topic/getResponse'
const userid = localStorage.getItem('userid')

export default function connect() {
  const socket = new SockJS(SOCK_URL)
  const client = Stomp.over(socket, {
    debug: false
  })

  const success = frame => {
    console.log('websocket链接成功')
    client.subscribe(SUBSCRIBE_URL, res => {
      let data = JSON.parse(JSON.parse(res.body).responseMessage)
      console.log(data)
      this.$store.commit('addAlarms', data)
    })
  }

  const fail = err => {
    console.log(err, '链接失败，重新链接中...')
    setTimeout(connect, 2000)
  }

  client.connect({
    userid
  }, success, fail)

  return client
}
