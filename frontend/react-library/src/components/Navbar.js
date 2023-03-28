import React from "react";
import { Link } from "react-router-dom";
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from "./Utils/SpinnerLoading";

export const Navbar = () => {

  const { authState, oktaAuth } = useOktaAuth();

  console.log("The oktaAuth state is ----> ", authState);

  //const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut('/');


  if (!authState) {
    return (
      <div>
        <SpinnerLoading />
      </div>
    )
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
      <div className='container-fluid'>
        <span className='navbar-brand'>myBooks</span>
        <button className='navbar-toggler' type='button'
          data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown' aria-expanded='false'
          aria-label='Toggle Navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' to="/home">Home</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/searchbooks">Search Books</Link>
            </li>
            {
              ((authState.isAuthenticated) && (authState?.accessToken?.claims.userType === undefined)) && (
                <li className='nav-item'>
                  <Link className='nav-link' to="/bookshelf">My Bookshelf</Link>
                </li>
              )
            }

            {
              ((authState.isAuthenticated) && (authState?.accessToken?.claims.userType === "admin")) && (
                <li className='nav-item'>
                  <Link className='nav-link' to="/admin">Admin</Link>
                </li>
              )
            }
          </ul>
          {
            (!authState.isAuthenticated) && (
              <ul className='navbar-nav ms-auto'>
                <li className='nav-item m-1'>
                  <Link type='button' className='btn btn-outline-light' to="/login">
                    Sign in
                  </Link>
                </li>
              </ul>
            )
          }
          {
            (authState.isAuthenticated) && (
              <ul className='navbar-nav ms-auto'>
                <li className='nav-item m-1'>
                  <button type='button' className='btn btn-outline-light' onClick={logout}>
                    Sign out
                  </button>
                </li>
              </ul>
            )
          }
        </div>
      </div>
    </nav>
  );
}