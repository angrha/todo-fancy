const storage = 'todo-storage'

new Vue({
  el: '.todoapp',
  data: {
    message: 'Todos',
    newTodo: '',
    todos: [],
    editedTodo: null,
    visibility: 'all'
  },
  created: function(){
    this.todos = JSON.parse(localStorage.getItem(storage || '[]'))
  },
  computed: {
    filteredTodos: function() {
      if(this.visibility == 'all') {
        return this.todos
      }
      else if(this.visibility == 'active') {
        return this.todos.filter( todo => {
          return !todo.completed
        })
      }
      else {
        return this.todos.filter( todo => {
          return todo.completed
        })
      }
    }
  },
  methods: {
    addTodo: function(){
      this.todos.push({id: this.newTodo.length, title: this.newTodo, completed: 'false'})
      this.newTodo = ''

      localStorage.setItem(storage, JSON.stringify(this.todos))
    },
    removeTodo: function(todo) {
      let index = this.todos.findIndex(x => {
        return x === todo
      })

      this.todos.splice(index, 1)
      localStorage.setItem(storage, JSON.stringify(this.todos))
    },
    editTodo: function(todo) {
      this.editedTodo = todo
    },
    doneEdit: function(todo) {
      if(!this.editedTodo){
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()

      if(!todo.title) {
        this.removeTodo(todo)
      }
      localStorage.setItem(storage, JSON.stringify(this.todos))
    }
  }
})