import { Routes, Route, Navigate, useLocation, matchPath } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import { WelcomePage, MessagesPage, ProductPage, SearchPage, NotificationsPage } from './pages';
import { LoginPage, RegisterPage } from './pages';
import ProfilePage from './pages/ProfilePage';
import ChatWindow from './components/ChatComponents/ChatWindow';
import { useUser } from './context/UserContext.jsx';
import { ChatContextProvider } from './context/ChatContext.jsx';
import { ProfileMenu } from './components/ProfilePageComponents';
import { AccountSettingsPage } from './pages/ProfileMenu';
import FavoriteProductsPage from './pages/ProfileMenu/FavoriteProductsPage';
import EditProfilePage from './pages/ProfileMenu/EditProfilePage';
import OtherUserProfilePage from './pages/OtherUserProfilePage';
import ChatActions from './components/ChatComponents/ChatActions';
import ReviewCreationPage from './pages/ReviewCreationPage';

const App = () => {
  const { user, loading } = useUser();
  const location = useLocation();
  const hideNavbarRoutes = ['/welcome', '/login', '/register', '/chat/:chatId'];

  const shouldHideNavbar = hideNavbarRoutes.some(route => matchPath(route, location.pathname));

  // Ensure that you are not immediately redirected to the home page after logging in
  if (loading) { return null; }

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="*"
          element={
            <ChatContextProvider user={user}>
              <div className="h-screen font-inter bg-[#121212]">
                {!shouldHideNavbar && <Navbar />}
                <Routes>
                  <Route path="/" element={user ? <HomePage /> : <Navigate to="/welcome" />} />
                  <Route path="home" element={user ? <HomePage /> : <Navigate to="/login" />} />
                  <Route path="/create" element={user ? <CreatePage /> : <Navigate to="/login" />} />
                  <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/chat/:chatId" element={user ? <ChatWindow /> : <Navigate to="/login" />} />
                  <Route path="/chat/:chatId/actions" element={user ? <ChatActions /> : <Navigate to="/login" />} />
                  <Route path="/profile-menu" element={user ? <ProfileMenu /> : <Navigate to="/login" />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/account-settings" element={user ? <AccountSettingsPage /> : <Navigate to="/login" />} />
                  <Route path="/profile/favorites" element={user ? <FavoriteProductsPage /> : <Navigate to="/login" />} />
                  <Route path="/edit-profile" element={user ? <EditProfilePage /> : <Navigate to="/login" />} />
                  <Route path="/user/:userId" element={<OtherUserProfilePage />} />
                  <Route path="/write-review" element={<ReviewCreationPage />} />
                  <Route path="/notifications" element={user ? <NotificationsPage /> : <Navigate to="/login" />} />
                </Routes>
              </div>
            </ChatContextProvider>
          }
        />
      </Routes>
    </>
  );
};

export default App;