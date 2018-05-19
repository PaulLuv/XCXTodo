// pages/history/history.js
import * as ts from '../../pages/models/todoservice.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todoList: [],
    showEmptyView: true,
    showDetail: false,
    showDetailIndex: 0,
  },

  itemDetailClicked: function (e) {
    let showDetail = false;
    let index = e.currentTarget.dataset.index;
    if (this.data.showDetail) {
      if (this.data.showDetailIndex == index) {
        showDetail = false;
      } else {
        showDetail = true;
      }
    } else {
      showDetail = true;
    }
    this.setData({
      showDetail: showDetail,
      showDetailIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
      title: '历史纪录',
    })
    let finishTodos = ts.getFinishedTodos()
    this.setData({
      showEmptyView: finishTodos.size == 0,
      todoList: finishTodos,
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