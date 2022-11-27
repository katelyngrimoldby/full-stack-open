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
  })
})