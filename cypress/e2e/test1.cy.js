 
import 'cypress-axe';
 
 
describe('Testar Cypress', () => {
  it('Besöker en webbsida', () => {
    cy.visit('https://hugomyrberg.github.io/first-pwa/');
    cy.injectAxe();
    cy.checkA11y();
  });
});