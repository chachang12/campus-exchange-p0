import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext.hook';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import { LoginPage, RegisterPage } from './pages';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="flex h-screen font-inter">
      <div className="lg:w-4/12">
        <Navbar />
      </div>
      <div className="w-5/6 p-4">
        <Routes>
          {/* <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;