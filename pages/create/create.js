// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputTitle: '',
    inputValue: '',
    todoList: []
  },

  createTodo: function (e) {
    let title = this.data.inputTitle.trin();
    let value = this.data.inputValue.trim();
    if (value.length < 1) {
      wx.showToast({
        title: '输入的内容不为空',
      })
      return
    }
    let todoItem = todoItem.createTodoItem(value)
    this.data.todoList.unshift(todoItem)
    this.setData({
      todoList: util.showDateHelper(this.data.todoList),
      inputTitle: '',
      inputValue: ''
    })
    wx.setStorageSync('todos', this.data.todoList)
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