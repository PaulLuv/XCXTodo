//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var todos = wx.getStorageSync('todos') || []
    // logs.unshift(Date.now())
    wx.setStorageSync('todos', todos)
  },
  globalData: {
    userInfo: null
  }
})