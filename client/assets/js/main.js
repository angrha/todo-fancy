new Vue({
  el: '.todoapp',
  data: {
    message: 'Todos',
    newTodo: ''
  },
  methods: {
    addTodo: function(){
      alert(this.newTodo)
    }
  }
})