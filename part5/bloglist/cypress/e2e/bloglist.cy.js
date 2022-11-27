describe('Bloglist', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:8080/api/testing/reset')
    cy.request('POST', 'http://localhost:8080/api/users', {
      username: 'root',
      name: 'Test User',
      password: 'root'
    })
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', () => {
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', () => {
    it('Successful login', () => {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login').click()

      cy.contains('Test User')
    })

    it('Failed login', () => {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login').click()

      cy.contains('Invalid username or password')
    })

    describe('When logged in', () => {
      beforeEach(() => {
        cy.request('POST', 'http://localhost:8080/api/login', {
          username: 'root', password: 'root'
        }).then(response => localStorage.setItem('User', JSON.stringify(response.body)))
        cy.visit('http://localhost:5173')
      })

      it('A new blog can be created', () => {
        cy.contains('Show').click()
        cy.get('#title').type('Sample Title')
        cy.get('#author').type('Sample Author')
        cy.get('#url').type('samplesite.com')
        cy.contains('Add').click()

        cy.contains('Sample Title')
        cy.contains('Sample Author')  
      })

      it('Users can like a blog', () => {
        cy.contains('Show').click()
        cy.get('#title').type('Sample Title')
        cy.get('#author').type('Sample Author')
        cy.get('#url').type('samplesite.com')
        cy.contains('Add').click()

        cy.get('.toggleButton').click()
        cy.get('.likeButton').click()

        cy.contains('Likes: 1')
      })

      it('Authorized user can delete a blog', () => {
        cy.contains('Show').click()
        cy.get('#title').type('Sample Title')
        cy.get('#author').type('Sample Author')
        cy.get('#url').type('samplesite.com')
        cy.contains('Add').click()

        cy.get('.toggleButton').click()

        cy.get('.deleteButton').click()
        cy.contains('Removed Sample Title by Sample Author')
        cy.get('.blog').should('not.exist')
      })

      it('Unauthorized user cannot delete blog', () => {
        cy.contains('Show').click()
        cy.get('#title').type('Sample Title')
        cy.get('#author').type('Sample Author')
        cy.get('#url').type('samplesite.com')
        cy.contains('Add').click().then(() => localStorage.removeItem('User'))

        cy.visit('http://localhost:5173')
        cy.request('POST', 'http://localhost:8080/api/users', {
          username: 'different',
          name: 'Different User',
          password: 'different'
        })
        
        cy.request('POST', 'http://localhost:8080/api/login', {
          username: 'different', password: 'different'
        }).then(response => localStorage.setItem('User', JSON.stringify(response.body)))
        cy.visit('http://localhost:5173')

        cy.get('.toggleButton').click()
        cy.get('.deleteButton').should('not.exist')
      })
    })
  })
})