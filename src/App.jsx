import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action.js';
import Navigation from './components/common/Navigation.jsx';
import LoadingBar from './components/common/LoadingBar.jsx';
import HomePage from './pages/home/HomePage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import DetailPage from './pages/thread/DetailPage.jsx';
import CreateThreadPage from './pages/thread/CreateThreadPage.jsx';
import LeaderboardPage from './pages/leaderboard/LeaderboardPage.jsx';
import styles from './styles/App.module.css';

function App() {
  const isPreload = useSelector((state) => state.isPreload);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div className={styles.preloadContainer}>
        <div className={`animate-fade-up ${styles.preloadContent}`}>
          <div className={styles.spinner} />
          <p className={styles.preloadText}>Memuat Talkora</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.appContainer}>
      <LoadingBar />
      <Navigation />
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route
            path="/new"
            element={authUser ? <CreateThreadPage /> : <LoginPage />}
          />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
