import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
const domain = window.domain

let ws = {}

function connect() {
    // http请求发起ws，链接失败后必须再次new Socket
    ws.socket = new SockJS(`${domain}hotel-websocket`)
    ws.client = Stomp.over(ws.socket, { debug: false })

    let success = frame => {
        console.log('websocket链接成功')
        ws.client.subscribe('/hotel/topic/greetings', res => {
            let data = JSON.parse(JSON.parse(res.body).content)
            console.log(data)
            // 刷身份证人证合一消息
            if(data.msgType == 2){
                this.$store.commit('getRecord', data.data)
            }
            // 设备故障
            if (data.msgType == 4) {
                this.$store.commit('deviceErr', data.data)
            } 
            // 之前上传psb失败的记录被重新上传成功，需要更新登记台列表，将此条记录从页面中移除
            else if (data.msgType == 5) {
                this.$store.commit('postSuccess', data.data.ids)
            }
            //  之前上传psb失败的记录，重新同步的次数synNum超过10次了， 需要放开表单禁用，让用户手动同步 
            else if( data.msgType == 6){
                this.$store.commit('postFail', data.data)
            }
        })
    }

    let fail = err => {
        console.log('链接失败，重新链接中...')
        console.log(err)
        delete ws.client
        delete ws.socket
        setTimeout(() => {
            // http请求发起ws，链接失败后必须再次new Socket, fail针对此http请求失败执行
            ws.socket = new SockJS(`${domain}hotel-websocket`)
            ws.client = Stomp.over(ws.socket, { debug: false });
            ws.client.connect({ lesseeId: localStorage.getItem('lesseeId'), deviceId: localStorage.getItem('deviceId'), token: localStorage.getItem('token') }, success, fail)
        }, 2000)
    }
    ws.client.connect({ lesseeId: localStorage.getItem('lesseeId'), deviceId: localStorage.getItem('deviceId'), token: localStorage.getItem('token') }, success, fail)
}

ws.connect = connect

export default ws
