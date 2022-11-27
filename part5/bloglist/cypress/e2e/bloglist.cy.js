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
})