describe('ProfilePage', () => {
  beforeEach(async () => {
    cy.visit('/tabs/profile');
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', 'user');
    localStorage.setItem('name', 'John');
    localStorage.setItem('lastname', 'Doe');
  });

  it('should display profile page', () => {
    cy.get('app-profile').should('exist');
  });

  it('should display profile image', () => {
    cy.get('app-profile img').should('exist');
  });

  it('should display username', () => {
    cy.get('app-profile p').eq(0).should('contain.text', 'Usuario: user');
  });

  it('should display name and lastname', () => {
    cy.get('app-profile p').eq(1).should('contain.text', 'Nombre: John Doe');
  });
});
