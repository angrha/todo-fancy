new Vue({
  el: '.todoapp',
  data: {
    message: 'Todos',
    newTodo: '',
    todos: [{id: 0, title:'new todo', completed:'false'}]
  },
  methods: {
    addTodo: function(){
      this.todos.push({id: this.newTodo.length, title: this.newTodo, completed: 'false'})
      this.newTodo = ''
    },
    removeTodo: function(todo) {
      let index = this.todos.findIndex(x => {
        return x === todo
      })

      this.todos.splice(index, 1)
    }
  }
})