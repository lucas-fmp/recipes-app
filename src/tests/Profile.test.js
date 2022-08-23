import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import MyProvider from '../context/MyProvider';


const mockEmail = {email : 'teste@trybe.com' }; 
localStorage.setItem('user', JSON.stringify(mockEmail));

describe('Test the Profile screen', () => {
 

     it(`Correctly displays the registered user's email`, () => {

        const { history } = renderWithRouter(
            <MyProvider>
              <App />
            </MyProvider>
          );

         
        history.push('/profile');
        
        const getEmail = screen.getByTestId('profile-email');
        expect(getEmail).toBeInTheDocument();


    });


    it('Displays Done Recipes button and redirects user to Done Recipes route', () => {
        const { history } = renderWithRouter(
            <MyProvider>
              <App />
            </MyProvider>
          );

        history.push('/profile');

        const btnDone = screen.getByTestId('profile-done-btn');
        expect(btnDone).toBeInTheDocument();

        userEvent.click(btnDone);
        expect(history.location.pathname).toBe('/done-recipes');

    });

    it('Displays the Favorite Recipes button and redirects the user to the Favorite Recipes route', () => {
        const { history } = renderWithRouter(
            <MyProvider>
              <App />
            </MyProvider>
          );

        history.push('/profile');

        const btnFavorite = screen.getByTestId('profile-favorite-btn');
        expect(btnFavorite).toBeInTheDocument();

        userEvent.click(btnFavorite);
        expect(history.location.pathname).toBe('/favorite-recipes');

    });

    it('Display Logout button and redirect user to Login route', () => {
        const { history } = renderWithRouter(
            <MyProvider>
              <App />
            </MyProvider>
          );

        history.push('/profile');

        const btnLogout = screen.getByTestId('profile-logout-btn');
        expect(btnLogout).toBeInTheDocument();

        userEvent.click(btnLogout);
        expect(history.location.pathname).toBe('/');

    }); 


});
