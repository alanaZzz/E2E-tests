
Cypress.Commands.add('createDefaultTodos', function () {

    let TODO_FIRST = 'Написать авто-тесты для TodoMVC'
    let TODO_SECOND = 'Сходить в магазин'
    let TODO_THIRD = 'Совершить пробежку'
  
    let cmd = Cypress.log({
      name: 'create default todos',
      message: [],
      consoleProps () {

        return {
          'Inserted Todos': [TODO_FIRST, TODO_SECOND, TODO_THIRD],
        }
      },
    })
  
  
    cy.get('.new-todo', { log: false })
    .type(`${TODO_FIRST}{enter}`, { log: false })
    .type(`${TODO_SECOND}{enter}`, { log: false })
    .type(`${TODO_THIRD}{enter}`, { log: false })
  
    cy.get('.todo-list li', { log: false })
    .then(function ($listItems) {
 
      cmd.set({ $el: $listItems }).snapshot().end()
    })
  })
  
  Cypress.Commands.add('createTodo', function (todo) {
  
    let cmd = Cypress.log({
      name: 'create todo',
      message: todo,
      consoleProps () {
        return {
          'Inserted Todo': todo,
        }
      },
    })
  
    //Создать todo
    cy.get('.new-todo', { log: false }).type(`${todo}{enter}`, { log: false })
  
    cy.get('.todo-list', { log: false })
    .contains('li', todo.trim(), { log: false })
    .then(function ($li) {
     
      cmd.set({ $el: $li }).snapshot().end()
    })
  })
  
  Cypress.Commands.add('addAxeCode', () => {
    cy.window({ log: false }).then((win) => {
      return new Promise((resolve) => {
        const script = win.document.createElement('script')
  
        script.src = '/node_modules/axe-core/axe.min.js'
        script.addEventListener('load', resolve)
  
        win.document.head.appendChild(script)
      })
    })
  })