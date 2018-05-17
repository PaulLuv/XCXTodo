// pages/create/create.js
const todoItem = require('../../utils/todoitem.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputTitle: '',
    inputValue: '',
    todoList: [],
    level: 4,
    levelText: "不重要不紧急",
    levelClass: 'level4',
  },
  bindInputTitle: function(e){
    this.data.inputTitle = e.detail.value;
  },
  bindTextarea: function(e){
    this.data.inputValue = e.detail.value
  },

  createTodo: function (e) {
    let title = this.data.inputTitle.trim();
    let value = this.data.inputValue.trim();
    if (title.length < 1) {
      wx.showToast({
        title: '请输入待办事项',
      })
      return
    }
    let item = todoItem.createTodoItem(title, value, this.data.level)
    this.data.todoList.unshift(item)
    this.setData({
      todoList: util.showDateHelper(this.data.todoList),
      inputTitle: '',
      inputValue: ''
    })
    wx.setStorageSync('todos', this.data.todoList)
  },

  levelSetting: function(e){
    wx.showActionSheet({
      itemList: ['重要且紧急', '重要不紧急', '紧急不重要','不紧急不重要'],
      success: function (res) {
        let level = res.tapIndex + 1;
        this.data.level = level;
        switch(level){
          case (1):
            this.data.levelText = "重要且紧急"
            this.data.levelClass = 'level1'
            break;
          case (2):
            this.data.levelText = "重要不紧急"
            this.data.levelClass = 'level2'
            break;
          case (3):
            this.data.levelText = "紧急不重要"
            this.data.levelClass = 'level3'
            break;
          case (4):
            this.data.levelText = "不紧急不重要"
            this.data.levelClass = 'level4'
            break;
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      todoList: (wx.getStorageSync('todos') || [])
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '创建待办事项',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})