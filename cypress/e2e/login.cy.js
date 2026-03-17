/* eslint-disable */
/**
 * Skenario pengujian untuk halaman login (E2E):
 *
 * 1. Menampilkan peringatan (alert) saat email atau password salah
 * 2. Berhasil login dengan kredensial yang valid dan diarahkan ke homepage
 */

describe('Login flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display alert when given invalid credentials', () => {
    // Fill credentials
    cy.get('input[type="email"]').type('invalid@user.com');
    cy.get('input[type="password"]').type('wrongpassword');

    // Setup window alert stub to verify it's called
    const stub = cy.stub();
    cy.on('window:alert', stub);

    // Mock API for failure (optional, since live API will also fail, but faster to mock)
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'Email or password is wrong',
      },
    }).as('loginRequest');

    // Click submit
    cy.get('button').contains(/^Masuk$/).click();

    // Verify alert is shown
    cy.wait('@loginRequest');
    cy.wrap(stub).should('have.been.calledWith', 'Email or password is wrong');
  });

  it('should login successfully with valid credentials and redirect to homepage', () => {
    // Mock the API requests to guarantee success without hitting real backend
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'Login success',
        data: {
          token: 'fake-token-abcd',
        },
      },
    }).as('loginRequest');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'Get my profile',
        data: {
          user: {
            id: 'user-cypress',
            name: 'Cypress User',
            email: 'valid@user.com',
            avatar: 'http://example.com/avatar.jpg',
          },
        },
      },
    }).as('getProfile');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users', {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { users: [] } },
    }).as('getUsers');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/threads', {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { threads: [] } },
    }).as('getThreads');

    // Fill credentials
    cy.get('input[type="email"]').type('valid@user.com');
    cy.get('input[type="password"]').type('validpassword');
    
    // Click submit
    cy.get('button').contains(/^Masuk$/).click();

    // Verify redirect to homepage
    cy.wait('@loginRequest');
    cy.wait('@getProfile');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
