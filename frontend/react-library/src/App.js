import './App.css';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage/HomePage';
import { SearchBooksPage } from './components/SearchBooks/SearchBooksPage';
import { Footer } from './components/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/searchbooks" element={<SearchBooksPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
