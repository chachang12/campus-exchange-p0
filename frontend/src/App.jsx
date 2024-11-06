import { Routes, Route, Navigate, useLocation, matchPath } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import { WelcomePage, MessagesPage, ProductPage, SearchPage } from './pages';
import { LoginPage, RegisterPage } from './pages';
import ProfilePage from './pages/ProfilePage';
import ChatWindow from './components/ChatComponents/ChatWindow'; // Import the ChatWindow component
import { useUser } from './context/UserContext.jsx';
import { ChatContextProvider } from './context/ChatContext.jsx';
import { ProfileMenu } from './components/ProfilePageComponents';
import { AccountSettingsPage } from './pages/ProfileMenu';

const App = () => {
  const { user, loading } = useUser();
  const location = useLocation();
  const hideNavbarRoutes = ['/welcome', '/login', '/register', '/chat/:chatId'];

  const shouldHideNavbar = hideNavbarRoutes.some(route => matchPath(route, location.pathname));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ChatContextProvider user={user}>
      {/* <div className="h-screen font-inter bg-[#1A1E26]"> */}
      <div className="h-screen font-inter bg-[#121212] mb-40 mt-4">
        {!shouldHideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/welcome" />} />
          <Route path="home" element={user ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/create" element={user ? <CreatePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/messages" element={user ? <MessagesPage /> : <Navigate to="/login" />} />
          <Route path="/product/:id" element={<ProductPage />} /> 
          <Route path="/chat/:chatId" element={user ? <ChatWindow /> : <Navigate to="/login" />} />
          <Route path="/profile-menu" element={user ? <ProfileMenu /> : <Navigate to="/login" />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/account-settings" element={user ? <AccountSettingsPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </ChatContextProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};

export default App;