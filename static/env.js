let testing = true

if (testing) {
  // 测试地址
  window.ws_domain = 'ws://localhost:9090/crawler'
  window.http_domain = 'http://localhost:9090/crawler'
} else {
  // 正式环境
  window.ws_domain = 'ws://localhost:9090'
  window.http_domain = 'http://localhost:9090'
}
