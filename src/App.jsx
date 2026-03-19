import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action.js';
import Navigation from './components/common/Navigation.jsx';
import LoadingBar from './components/common/LoadingBar.jsx';
import styles from './styles/App.module.css';

const HomePage = React.lazy(() => import('./pages/home/HomePage.jsx'));
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage.jsx'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage.jsx'));
const DetailPage = React.lazy(() => import('./pages/thread/DetailPage.jsx'));
const CreateThreadPage = React.lazy(
  () => import('./pages/thread/CreateThreadPage.jsx'),
);
const LeaderboardPage = React.lazy(
  () => import('./pages/leaderboard/LeaderboardPage.jsx'),
);

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
        <Suspense
          fallback={
            <div className={styles.preloadContainer}>
              <div className={styles.spinner} />
            </div>
          }
        >
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
        </Suspense>
      </main>
    </div>
  );
}

export default App;
