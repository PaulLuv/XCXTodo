const orderTodoList = todoList => {
  if (todoList.length < 2){
    return todoList;
  }
}

// showDateHelper 列表的两项日期相同时，只显示第一个
const showDateHelper = todoList =>{
  if (todoList.length < 1){
    return todoList
  }
  if (todoList.length == 1) {
    todoList[0].showDate = true
    return todoList;
  }
  let date = todoList[0].date
  todoList[0].showDate = true
  for (let i = 1; i < todoList.length; i++){
    let temp = todoList[i]
    if(temp.date === date){
      todoList[i].showDate = false
    }else{
      date = temp.date
    }
  }
  return todoList
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatDate = date =>{
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('.')
}

module.exports = {
  formatDate: formatDate,
  orderTodoList: orderTodoList,
  showDateHelper: showDateHelper
}
