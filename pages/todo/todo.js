import * as ts from '../models/todoservice'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        inputValue: '',
        todoList: [],
        showEmptyView: true,
        showDetail: false,
        showDetailIndex: 0,
    },
    itemDetailClicked: function(e) {
        let showDetail = false;
        let index = e.currentTarget.dataset.index;
        if (this.data.showDetail) {
            if (this.data.showDetailIndex == index) {
                showDetail = false;
            }else{
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

    deleteItem: function(event) {
        let index = event.target.dataset.index;
        let deleteTodoTitle = event.target.dataset.title
        wx.showModal({
          title: '删除确认',
          content: '确定要删除\' ' + deleteTodoTitle + ' \'任务吗？',
          success(res){
            if(res.confirm){
              ts.deleteTodo(deleteTodoTitle, index)

              let todos = ts.getShowTodos()
              let size = todos.length
              this.setData({
                showEmptyView: size == 0,
                todoList: todos
              })
              wx.setTabBarBadge({
                index: 0,
                text: size.toString(),
              })
            }
          },
          fail(res){
            console.log("delete dialog failed" + res)
          }
        })
    },

    handleItem: function(e){
      let index = e.target.dataset.index;
      let todoTitle = e.target.dataset.title
      let todos = ts.getShowTodos()
      let todo = todos[index]
      if (todo.title === todoTitle){
        ts.markDoing(todo)
      }else{
        return
      }
      ts.saveTodos(todos)
      this.setData({
        todoList: todos
      })
    },

    finishItem: function(e){
      let index = e.target.dataset.index;
      let todoTitle = e.target.dataset.title
      let todos = ts.getShowTodos()
      let todo = todos[index]
      if (todo.title === todoTitle) {
        ts.markDone(todo)
      } else {
        return
      }
      ts.saveTodos(todos)
      todos = ts.getShowTodos()
      let size = todos.length
      this.setData({
        showEmptyView: size == 0,
        todoList: todos
      })
      wx.setTabBarBadge({
        index: 0,
        text: size.toString(),
      })
    },

    editItem: function(event) {
        let index = event.target.dataset.index;
        let content = event.target.dataset.content;
        // this.data.todoList.push(index, 1)
        wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success: function(res) {
                if (res.confirm) {

                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
        this.setData({
            todoList: util.showDateHelper(this.data.todoList)
        })
    },

    // findTodo: function(event) {
    //     let value = this.data.inputValue.trim();
    //     if (value.length < 1) {
    //         wx.showToast({
    //             title: '输入的内容不为空',
    //         })
    //         return
    //     }
    //     let list = [];
    //     this.data.todoList.filter(todo => {
    //         if (todo.indexOf(value) != -1) {
    //             list.push(todo);
    //         }
    //     });
    //     this.setData({
    //         todoList: util.showDateHelper(list)
    //     })
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {

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
        let todos = ts.getShowTodos()
        let size = todos.length

        this.setData({
            showEmptyView: size == 0,
            todoList: todos
        })

        wx.setTabBarBadge({
            index: 0,
            text: size.toString(),
        })
        wx.setTabBarItem({
            index: 0,
            text: '待办'
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