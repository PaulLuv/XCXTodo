// pages/create/create.js
import * as ts from '../models/todoservice'

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
    bindInputTitle: function(e) {
        this.data.inputTitle = e.detail.value;
    },
    bindTextarea: function(e) {
        this.data.inputValue = e.detail.value
    },

    createTodo: function(e) {
        let title = this.data.inputTitle.trim();
        let value = this.data.inputValue.trim();
        if (title.length < 1) {
            wx.showToast({
                title: '请输入待办事项',
            })
            return
        }
        let todo = new ts.Todo(title, value, this.data.level, '')
        ts.addTodo(todo)
        let todos = ts.getShowTodos()
        this.setData({
            todoList: todos,
            inputTitle: '',
            inputValue: '',
        })
        wx.switchTab({
            url: '/pages/todo/todo',
        })
    },

    levelSetting: function(e) {
        let that = this
        wx.showActionSheet({
            itemList: ['重要且紧急', '重要不紧急', '紧急不重要', '不紧急不重要'],
            success: function(res) {
                let level = res.tapIndex + 1;
                that.setData({
                    level: level
                })
                switch (level) {
                    case (1):
                        that.setData({
                            levelText: "重要且紧急",
                            levelClass: 'level1'
                        })
                        break;
                    case (2):
                        that.setData({
                            levelText: "重要不紧急",
                            levelClass: 'level2'
                        })
                        break;
                    case (3):
                        that.setData({
                            levelText: "紧急不重要",
                            levelClass: 'level3'
                        })
                        break;
                    case (4):
                        that.setData({
                            levelText: "不紧急不重要",
                            levelClass: 'level4'
                        })
                        break;
                }
            },
            fail: function(res) {
                console.log(res.errMsg)
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        wx.setNavigationBarTitle({
            title: '创建待办事项',
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})