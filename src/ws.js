import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

const
  SOCK_URL = `${domain}hotel-websocket`,
  SUBSCRIBE_URL = '/hotel/topic/greetings',
  ws = {}

function connect() {
  ws.socket = new SockJS(SOCK_URL)
  ws.client = Stomp.over(ws.socket)

  let success = frame => {
    console.log('websocket链接成功')
    ws.client.subscribe(SUBSCRIBE_URL, res => {
      let data = JSON.parse(JSON.parse(res.body).content)
      console.log(data)
      if (data.msgType == 2) {
        this.$store.commit('getItems', data.data)
      }
    })
  }

  let fail = err => {
    console.log(err, '链接失败，重新链接中...')
    delete ws.client, ws.socket;
    setTimeout(connect, 2000)
  }

  ws.client.connect({
    lesseeId: localStorage.getItem('lesseeId'),
    deviceId: localStorage.getItem('deviceId'),
    token: localStorage.getItem('token')
  }, success, fail)
}

ws.connect = connect

export default ws
