import './App.css';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage/HomePage';
import { SearchBooksPage } from './components/SearchBooks/SearchBooksPage';
import { BookCheckoutPage } from './components/BookCheckoutPage/BookCheckoutPage';
import { Footer } from './components/Footer';
import { SpinnerLoading } from './components/Utils/SpinnerLoading';
import { Routes, Route, Navigate, useNavigate, redirect } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback } from '@okta/okta-react';

function App() {

  const navigate = useNavigate();

  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    console.log("Original URL is =========>", originalUri);
    navigate(toRelativeUrl(originalUri || '/', window.location.origin), {
      replace: true,
    });
  };

  const oktaAuth = new OktaAuth({
    issuer: 'https://dev-99620444.okta.com/oauth2/default',
    clientId: '0oa8dvizkymQNaLhW5d7',
    redirectUri: window.location.origin + '/login/callback'
  });

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <div className='d-flex flex-column min-vh-100'>
        <Navbar />
        <div className='flex-grow-1'>
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/searchbooks" element={<SearchBooksPage />} />
            <Route path="/books/checkout/:id" element={<BookCheckoutPage />} />
            <Route path="login/callback" element={<LoginCallback loadingElement={<SpinnerLoading />} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Security>
  );
}

export default App;
