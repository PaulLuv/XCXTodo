import { formatDate, showDateHelper } from '../../utils/util'

/**
 * 定义一个Todo对象，
 * 通过 new Todo() 来创建
 */
export class Todo {
    constructor(title, content, level, planDate) {
        this.title = title;
        this.level = level;
        this.content = content;
        this.hasDone = false;
        this.date = formatDate(new Date());
        this.planDate = planDate;
    }
}

// global dataSource
let todos = []

/**
 * 获取 todos 数据
 */
export function getTodos() {
    return wx.getStorageSync("todos") || []
}

export function saveTodos() {
    wx.setStorageSync("todos", todos)
}

/**
 * 获取 用于显示的 todos 数据
 */
export function getShowTodos() {
    let todos = getTodos()
    return showDateHelper(todos)
}

/**
 * 添加一个Todo对象，并返回
 * @param {*} todo 
 */
export function addTodo(todo) {
    todos.unshift(todo)
    saveTodos()
}

export function deleteTodo(title, index) {
    let deleteTodo = todos[index]
    if (deleteTodo.title === title) {
        todos.splice(index, 1)
    }
    saveTodos()
}