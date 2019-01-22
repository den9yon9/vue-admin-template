import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

const
  SOCKET_URL = `${window.domain}hotel-websocket`,
  SUBSCRIBE_URL = '/hotel/topic/greetings'

let ws = {
  connect() {
    delete ws.client;
    ws.client = Stomp.over(new SockJS(SOCKET_URL), {
      debug: false
    })

    let success = frame => {
      console.log('websocket链接成功')
      ws.client.subscribe(SUBSCRIBE_URL, res => {
        let data = JSON.parse(JSON.parse(res.body).content)
        console.log(data)
        // 人证合一消息
        if (data.msgType == 2) {
          this.$store.commit('getItems', data.data)
        }
      })
    }

    let fail = err => {
      console.log(err, '链接失败，重新链接中...')
      setTimeout(connect.bind(this), 60000)
    }

    ws.client.connect({
      lesseeId: sessionStorage.getItem('lessee_id'),
      deviceId: sessionStorage.getItem('devicd_id'),
      token: sessionStorage.getItem('token')
    }, success, fail)
  }
}

export default ws
