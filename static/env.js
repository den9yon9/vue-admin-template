let testing = false

if (testing) {
  // 测试地址
  window.ws_domain = 'http://dev.mindsee.cn:8080'
  window.http_domain = 'http://dev.mindsee.cn:8080/quickfan'
} else {
  // 正式环境
  window.ws_domain = 'http://yichang.mindsee.cn:8080'
  window.http_domain = 'http://yichang.mindsee.cn:8080/quickfan'
}
