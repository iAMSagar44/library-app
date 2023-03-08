import './App.css';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage/HomePage';
import { SearchBooksPage } from './components/SearchBooks/SearchBooksPage';
import { BookCheckoutPage } from './components/BookCheckoutPage/BookCheckoutPage';
import { Footer } from './components/Footer';
import { SpinnerLoading } from './components/Utils/SpinnerLoading';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ShelfPage } from './components/ShelfPage/ShelfPage';
import { RequiredAuth } from './Auth/SecureRouteAuth';

function App() {

  const navigate = useNavigate();
  const oktaConfig = {
    issuer: 'https://dev-99620444.okta.com/oauth2/default',
    clientId: '0oa8dvizkymQNaLhW5d7',
    redirectUri: window.location.origin + '/login/callback',
    useInteractionCode: false,
    useClassicEngine: true
  };

  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    console.log("Original URL is =========>", originalUri);
    navigate(toRelativeUrl(originalUri || '/', window.location.origin), {
      replace: true,
    });
  };

  const customAuthHandler = () => {
    navigate("/login");
  }

  const oktaAuth = new OktaAuth(oktaConfig);

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
      <div className='d-flex flex-column min-vh-100'>
        <Navbar />
        <div className='flex-grow-1'>
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/searchbooks" element={<SearchBooksPage />} />
            <Route path="/books/checkout/:id" element={<BookCheckoutPage />} />
            <Route path="/login" element={<LoginWidget config={oktaConfig} />} />
            <Route path="login/callback" element={<LoginCallback loadingElement={<SpinnerLoading />} />} />
            <Route path="/bookshelf" element={<RequiredAuth />}>
              <Route path="" element={<ShelfPage />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Security>
  );
}

export default App;
