import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext.hook';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import { WelcomePage } from './pages';
import { LoginPage, RegisterPage } from './pages';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./components/GoogleLogin";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="h-screen font-inter bg-[#0D0D0D]">
      {/* <div className="lg:w-4/12">
        <Navbar />
      </div> */}
      {/* <div className="w-5/6 p-4"> */}
      
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/welcome" />} />
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/create" element={<CreatePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      
    </div>
  );
}

export default App;