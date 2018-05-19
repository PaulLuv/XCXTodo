// pages/edit/edit.js
import * as ts from '../../pages/models/todoservice.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    title: '',
    content: '',
    level: 4,
    levelClass: 'level4',
    levelText: ''
  },

  bindInputTitle: function (e) {
    this.data.title = e.detail.value;
  },
  bindTextarea: function (e) {
    this.data.content = e.detail.value
  },

  editTodo: function (e) {
    let title = this.data.title.trim();
    let value = this.data.content.trim();
    if (title.length < 1) {
      wx.showToast({
        title: '请输入待办事项',
      })
      return
    }
    let index = this.data.index
    let todos = ts.getShowTodos()
    let todo = todos[index]
    todo.title = title
    todo.content = value
    let level = this.data.level
    todo.level = level
    todo.levelClass = "level" + level
    ts.saveTodos(todos)
    wx.navigateBack({
    })
  },

  levelSetting: function (e) {
    let that = this
    let levelArray = ts.getLevelArray()
    let itemList = levelArray.map(item => item.levelTitle)
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        let level = res.tapIndex + 1;
        that.setData({
          level: level,
          levelClass: "level" + level,
          levelText: itemList[level]
        })
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
    let index = options.index
    let title = options.title
    let content = ''
    let level = 4
    let todos = ts.getShowTodos()
    let todo = todos[index]
    if(todo.title === title){
      content = todo.content
      level = todo.level
    }else{
      return
    }
    this.setData({
      index: index,
      title: title,
      content: content,
      level: level,
      levelClass: 'level' + level,
      levelText: ts.getLevelTitle(level),
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
      title: '编辑',
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