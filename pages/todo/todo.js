const todoItem = require('../../utils/todoitem.js')
const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    todoList: []
  },
  
  deleteItem: function (event) {
    let index = event.target.dataset.index;
    let content = event.target.dataset.content;
    this.data.todoList.splice(index, 1)

    this.setData({
      todoList: util.showDateHelper(this.data.todoList)
    })
    wx.setStorageSync("todos", this.data.todoList)
    this.onLoad()
  },

  editItem: function (event) {
    let index = event.target.dataset.index;
    let content = event.target.dataset.content;
    // this.data.todoList.push(index, 1)
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          wx.showActionSheet({
            itemList: ['A', 'B', 'C'],
            success: function (res) {
              console.log(res.tapIndex)
            },
            fail: function (res) {
              console.log(res.errMsg)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    this.setData({
      todoList: util.showDateHelper(this.data.todoList)
    })
    wx.setStorageSync('todos', this.data.todoList)
  },

  findTodo: function (event) {
    let value = this.data.inputValue.trim();
    if (value.length < 1) {
      wx.showToast({
        title: '输入的内容不为空',
      })
      return
    }
    let list = [];
    this.data.todoList.filter(todo => {
      if (todo.indexOf(value) != -1) {
        list.push(todo);
      }
    });
    this.setData({
      todoList: util.showDateHelper(list)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
    let size  = this.data.todoList.length
    if (size > 0){
      wx.setTabBarBadge({
        index: 0,
        text: size.toString(),
      })
    }
    wx.setTabBarItem({
      index: 0,
      text: '待办'
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