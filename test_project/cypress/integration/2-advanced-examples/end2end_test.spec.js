
///<reference types="cypress" />
///<reference types="../support/commands.js" />


describe('Авто-тесты для TodoMVC', function () {
    
    let TODO_FIRST = 'Написать авто-тесты для TodoMVC'
    let TODO_SECOND = 'Сходить в магазин'
    let TODO_THIRD = 'Совершить пробежку'
  
    beforeEach(function () {
      cy.visit('https://todomvc.com/examples/react/#/')
    })
  
  
/*
    it('Добавить 2 todo-пункта', function () {
      cy.get('.new-todo')
      .type('Купить молоко{enter}')
      .type('Покататься на роликах{enter}')
  
      cy.get('.todo-list li').should('have.length', 2)
    })
  */
    context('При первом открытии страницы', function () {
      it('Фокус стоит на поле ввода', function () {
        cy.focused().should('have.class', 'new-todo')
      })
    })
  
    context('Нет todo-пунктов', function () {
      it('Нет блоков #main и #footer', function () {
        cy.get('.todo-list li').should('not.exist')
        cy.get('.main').should('not.exist')
        cy.get('.footer').should('not.exist')
      })
    })
  
    context('Новые todo-пункты', function () {
  
  
      it('Можно добавлять новые todo-пункты', function () {
        cy.get('.new-todo')
        .type(TODO_FIRST)
        .type('{enter}')
  
        // Проверка на то, чтобы первый todo-пункт имел соответствующий текст 
        cy.get('.todo-list li')
        .eq(0)
        .find('label')                                                                                                                                  //https://docs.cypress.io/api/commands/find#Requirements
        .should('contain', TODO_FIRST)
  
       
        cy.get('.new-todo')
        .type(TODO_SECOND)
        .type('{enter}')
  
         // Проверка на то, чтобы второй todo-пункт имел соответствующий текст
        cy.get('.todo-list li')
        .eq(1)
        .find('label')
        .should('contain', TODO_SECOND)
      })
  
      it('Добавить todo-пункты', function () {
        //Создание нескольких todo-пунктов
        cy.get('.new-todo')
        .type('todo A{enter}')
        .type('todo B{enter}') 
        .type('todo C{enter}') 
        .type('todo D{enter}')
     //Проверка количества пунктов в todo-листе
        cy.get('.todo-list li').should('have.length', 4)
      })
  
      it('После ввода нового пункта в поле ввода текст удалился', function () {
        cy.get('.new-todo')
        .type(TODO_FIRST)
        .type('{enter}')
  
        cy.get('.new-todo').should('have.text', '')
      })
  
      it('Новые пункты добавляются в конец списка', function () {

        cy.createDefaultTodos().as('todos')
  
        cy.get('.todo-count').contains('3 items left')
  
        cy.get('@todos')
        .eq(0)
        .find('label')
        .should('contain', TODO_FIRST)
  
        cy.get('@todos')
        .eq(1)
        .find('label')
        .should('contain', TODO_SECOND)
  
        cy.get('@todos')
        .eq(2)
        .find('label')
        .should('contain', TODO_THIRD)
      })
  
      it('Упорядочен ввод', function () {
    
        cy.createTodo(`    ${TODO_FIRST}    `)
  
    
        cy.get('.todo-list li')
        .eq(0)
        .should('have.text', TODO_FIRST)
      })
  
      it('При добавлении пунктов показываются блоки #main и #footer', function () {
        cy.createTodo(TODO_FIRST)
        cy.get('.main').should('be.visible')
        cy.get('.footer').should('be.visible')
      })
    })
  
    context('Отметить все завершенным', function () {
  
      beforeEach(function () {
    
        cy.createDefaultTodos().as('todos')
      })
  
      it('Отметить все пункты завершенными', function () {
       
        cy.get("input[class='toggle']").check()
  
        cy.get('@todos')
        .eq(0)
        .should('have.class', 'completed')
  
        cy.get('@todos')
        .eq(1)
        .should('have.class', 'completed')
  
        cy.get('@todos')
        .eq(2)
        .should('have.class', 'completed')
      })
  
      it('Снять состояние completed со всех пунктов', function () {
        // чекнуть и анчекнуть
        cy.get("input[class='toggle']")
        .check()
        .uncheck()
  
        cy.get('@todos')
        .eq(0)
        .should('not.have.class', 'completed')
  
        cy.get('@todos')
        .eq(1)
        .should('not.have.class', 'completed')
  
        cy.get('@todos')
        .eq(2)
        .should('not.have.class', 'completed')
      })
  
    })
    context('Todo-пункты', function () {
      
  
      it('Можно отметить пункты завершенными', function () {
       
        cy.createTodo(TODO_FIRST).as('firstItem')
        cy.createTodo(TODO_SECOND).as('secondItem')
  
        cy.get('@firstItem')
        .find('.toggle')
        .check()
  
        cy.get('@firstItem').should('have.class', 'completed')
  
        cy.get('@secondItem').should('not.have.class', 'completed')
        cy.get('@secondItem')
        .find('.toggle')
        .check()
  
        cy.get('@firstItem').should('have.class', 'completed')
        cy.get('@secondItem').should('have.class', 'completed')
      })
  
      it('Можно отметить незавершенными (отменить Completed)', function () {
        cy.createTodo(TODO_FIRST).as('firstItem')
        cy.createTodo(TODO_SECOND).as('secondItem')
  
        cy.get('@firstItem')
        .find('.toggle')
        .check()
  
        cy.get('@firstItem').should('have.class', 'completed')
        cy.get('@secondItem').should('not.have.class', 'completed')
  
        cy.get('@firstItem')
        .find('.toggle')
        .uncheck()
  
        cy.get('@firstItem').should('not.have.class', 'completed')
        cy.get('@secondItem').should('not.have.class', 'completed')
      })
  
      it('Можно редактировать todo-пункты', function () {
        cy.createDefaultTodos().as('todos')
  
        cy.get('@todos')
        .eq(1)
        .as('secondItem')
        .find('label')
        .dblclick()
  
        // Очищение и обновление текста todo-пункта
        cy.get('@secondItem')
        .find('.edit')
        .clear()
        .type('Сходить в библиотеку')
        .type('{enter}')
  
        cy.get('@todos')
        .eq(0)
        .should('contain', TODO_FIRST)

  //Проверка, что текст обновился
        cy.get('@secondItem').should('contain', 'Сходить в библиотеку')
        cy.get('@todos')
        .eq(2)
        .should('contain', TODO_THIRD)
      })
    })
    context('Редактирование', function () {
    
      beforeEach(function () {
        cy.createDefaultTodos().as('todos')
      })
  
      it('Должны скрываться другие элементы управления при редактировании', function () {
        cy.get('@todos')
        .eq(1)
        .as('secondTodo')
        .find('label')
        .dblclick()
  
        cy.get('@secondTodo')
        .find('.toggle')
        .should('not.be.visible')
  
        cy.get('@secondTodo')
        .find('label')
        .should('not.be.visible')
      })
  
      it('При размытии правки сохраняются', function () {
        cy.get('@todos')
        .eq(1)
        .as('secondTodo')
        .find('label')
        .dblclick()
  
        cy.get('@secondTodo')
        .find('.edit')
        .clear()
        .type('Посетить музей')
        .blur()
  
        cy.get('@todos')
        .eq(0)
        .should('contain', TODO_FIRST)
  
        cy.get('@secondTodo').should('contain', 'Посетить музей')
        cy.get('@todos')
        .eq(2)
        .should('contain', TODO_THIRD)
      })
  
      it('Пробелы в введенном тексте отбрасываются', function () {
        cy.get('@todos')
        .eq(1)
        .as('secondTodo')
        .find('label')
        .dblclick()
  
        cy.get('@secondTodo')
        .find('.edit')
        .clear()
        .type('    Посетить музей    ')
        .type('{enter}')
  
        cy.get('@todos')
        .eq(0)
        .should('contain', TODO_FIRST)
  
        cy.get('@secondTodo').should('contain', 'Посетить музей')
        cy.get('@todos')
        .eq(2)
        .should('contain', TODO_THIRD)
      })
  
      it('При введении строки из пробелов объект удаляется', function () {
        cy.get('@todos')
        .eq(1)
        .as('secondTodo')
        .find('label')
        .dblclick()
  
        cy.get('@secondTodo')
        .find('.edit')
        .clear()
        .type('{enter}')
  
        cy.get('@todos').should('have.length', 2)
      })
  
      it('При выходе правки отменяются', function () {
        cy.get('@todos')
        .eq(1)
        .as('secondTodo')
        .find('label')
        .dblclick()
  
        cy.get('@secondTodo')
        .find('.edit')
        .clear()
        .type('foo{esc}')
  
        cy.get('@todos')
        .eq(0)
        .should('contain', TODO_FIRST)
  
        cy.get('@todos')
        .eq(1)
        .should('contain', TODO_SECOND)
  
        cy.get('@todos')
        .eq(2)
        .should('contain', TODO_THIRD)
      })
    })
  
    context('Счетчик', function () {
      it('Показывается количество текущих todo-пунктов', function () {
        cy.createTodo(TODO_FIRST)
        cy.get('.todo-count').contains('1 item left')
        cy.createTodo(TODO_SECOND)
        cy.get('.todo-count').contains('2 items left')
      })
    })
  
    context('Кнопка Clear completed', function () {
      beforeEach(function () {
        cy.createDefaultTodos().as('todos')
      })
  
      it('Должен показываться корректный текст (Clear completed)', function () {
        cy.get('@todos')
        .eq(0)
        .find('.toggle')
        .check()
  
        cy.get('.clear-completed').contains('Clear completed')
      })
  
      it('По клику удаляются завершенные пункты', function () {
        cy.get('@todos')
        .eq(1)
        .find('.toggle')
        .check()
  
        cy.get('.clear-completed').click()
        cy.get('@todos').should('have.length', 2)
        cy.get('@todos')
        .eq(0)
        .should('contain', TODO_FIRST)
  
        cy.get('@todos')
        .eq(1)
        .should('contain', TODO_THIRD)
      })
  
      it('Кнопки нет, если нет завершенных пунктов', function () {
        cy.get('@todos')
        .eq(1)
        .find('.toggle')
        .check()
  
        cy.get('.clear-completed')
        .should('be.visible')
        .click()
  
        cy.get('.clear-completed').should('not.exist')
      })
    })
  
    context('Сохранение', function () {
      it('Данные должны сохраняться', function () {
        function testState () {
          cy.get('@firstTodo')
          .should('contain', TODO_FIRST)
          .and('have.class', 'completed')
  
          cy.get('@secondTodo')
          .should('contain', TODO_SECOND)
          .and('not.have.class', 'completed')
        }
  
        cy.createTodo(TODO_FIRST).as('firstTodo')
        cy.createTodo(TODO_SECOND).as('secondTodo')
        cy.get('@firstTodo')
        .find('.toggle')
        .check()
        .then(testState)
  
        .reload()
        .then(testState)
      })
    })
  
    context('Маршрутизация', function () {
    
  
      beforeEach(function () {
        cy.createDefaultTodos().as('todos')
      })
  
      it('Показаны активные todo-пункты', function () {
        cy.get('@todos')
        .eq(1)
        .find('.toggle')
        .check()
  
        cy.get('.filters')
        .contains('Active')
        .click()
  
        cy.get('@todos')
        .eq(0)
        .should('contain', TODO_FIRST)
  
        cy.get('@todos')
        .eq(1)
        .should('contain', TODO_THIRD)
      })
  
      it('Кнопка Назад', function () {
        cy.get('@todos')
        .eq(1)
        .find('.toggle')
        .check()
  
        cy.get('.filters')
        .contains('Active')
        .click()
  
        cy.get('.filters')
        .contains('Completed')
        .click()
  
        cy.get('@todos').should('have.length', 1)
        cy.go('back')
        cy.get('@todos').should('have.length', 2)
        cy.go('back')
        cy.get('@todos').should('have.length', 3)
      })
  
      it('Показаны завершенные todo-пункты', function () {
        cy.get('@todos')
        .eq(1)
        .find('.toggle')
        .check()
  
        cy.get('.filters')
        .contains('Completed')
        .click()
  
        cy.get('@todos').should('have.length', 1)
      })
  
      it('Показаны все todo-пункты', function () {
        cy.get('@todos')
        .eq(1)
        .find('.toggle')
        .check()
  
        cy.get('.filters')
        .contains('Active')
        .click()
  
        cy.get('.filters')
        .contains('Completed')
        .click()
  
        cy.get('.filters')
        .contains('All')
        .click()
  
        cy.get('@todos').should('have.length', 3)
      })
  
      it('Текущий примененный фильтр должен быть выделен', function () {
        cy.get('.filters').within(function () {
          cy.contains('All').should('have.class', 'selected')
          cy.contains('Active')
          .click()
          .should('have.class', 'selected')
  
          cy.contains('Completed')
          .click()
          .should('have.class', 'selected')
        })
      })
    })
    context('Меню React', function () {
      it('Source (Example)', function () {
        cy.get('a[href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/react"]').should('be.visible').contains('Source').click()
        cy.go('back')
      })
      it('Demo (React + Backbone.js)', function () {
        cy.get('a[href="https://todomvc.com/examples/react-backbone"]').should('be.visible').contains('Demo').click()
        cy.go('back')
      })
      it('Source (React + Backbone.js)', function () { 
        cy.get('a[href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/react-backbone"]').should('be.visible').contains('Source').click()
        cy.go('back')
      })
      it('Demo (Scala.js + React)', function () {
        cy.get('a[href="https://todomvc.com/examples/scalajs-react"]').should('be.visible').contains('Demo').click()
        cy.go('back')
      })
      it('Source (Scala.js + React)', function () {
        cy.get('a[href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/scalajs-react"]').should('be.visible').contains('Source').click()
        cy.go('back')
      })
      it('Demo (TypeScript + React)', function () {
        cy.get('a[href="https://todomvc.com/examples/typescript-react"]').should('be.visible').contains('Demo').click()
        cy.go('back')
      })
      it('Source (TypeScript + React)', function () {
        cy.get('a[href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/typescript-react"]').should('be.visible').contains('Source').click()
        cy.go('back')
      })
      it('Demo (React + Alt)', function () {
        cy.get('a[href="https://todomvc.com/examples/react-alt"]').should('be.visible').contains('Demo').click()
        cy.go('back')
      })
      it('Source (React + Alt)', function () {
        cy.get('a[href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/react-alt"]').should('be.visible').contains('Source').click()
        cy.go('back')
      })
    })

    context('Меню Цитата', function () {
      it(' Кнопка React (футер)', function () {
        cy.get('a[href="http://facebook.github.io/react"]').should('be.visible').contains('React').click()
        cy.go('back')
      })
    })

    context('Меню Official Resources', function () {
      it('Кнопка Tutorial', function () {
        cy.get('a[href="http://facebook.github.io/react/docs/tutorial.html"]').should('be.visible').contains('Tutorial').click()
        cy.go('back')
      })
      it('Кнопка Philosophy', function () {
        cy.get('a[href="http://www.quora.com/Pete-Hunt/Posts/React-Under-the-Hood"]').should('be.visible').contains('Philosophy').click()
        cy.go('back')
      })
      it('Кнопка Support', function () {
        cy.get('a[href="http://facebook.github.io/react/support.html"]').should('be.visible').contains('Support').click()
        cy.go('back')
      })
      it('Кнопка Flux architecture example', function () {
        cy.get('a[href="https://github.com/facebook/flux/tree/master/examples/flux-todomvc"]').should('be.visible').contains('Flux architecture example').click()
        cy.go('back')
      })
    })
    context('Меню Community', function () {
      it('Кнопка Google Groups Mailing List', function () {
        cy.get('a[href="https://groups.google.com/group/reactjs"]').should('be.visible').contains('Google Groups Mailing List').click()
        cy.go('back')
      })
     
    })
  

  })
