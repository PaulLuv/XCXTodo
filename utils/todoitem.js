const util = require('/util.js')

const todoItem = {
  hasDone: false,
  level: 4, // 1 重要且紧急  2 重要但不紧急 3 紧急但不重要  4 不紧急也不重要
  date: '',
  title: '',
  content: '',
  showDate: true,
  planDate: '',
}

const createTodoItem = (title,content,level) =>{
  let todo = todoItem;
  todo.title = title;
  todo.hasDone = false;
  todo.level = level;
  todo.content = content;
  let date = util.formatDate(new Date())
  todo.date = date;
  return todo;
}

module.exports = {
  createTodoItem: createTodoItem
}