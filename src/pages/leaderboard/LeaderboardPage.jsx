import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../../states/leaderboards/action.js';
import LeaderboardList from '../../components/leaderboard/LeaderboardList.jsx';
import styles from './LeaderboardPage.module.css';

function LeaderboardPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div>
      <header className={`animate-fade-up ${styles.header}`}>
        <p className={styles.eyebrow}>
          Peringkat
        </p>
        <h1 className={styles.title}>
          Leaderboard
        </h1>
        <p className={styles.subtitle}>
          Pengguna dengan kontribusi tertinggi di komunitas.
        </p>
      </header>
      <LeaderboardList leaderboards={leaderboards} />
    </div>
  );
}

export default LeaderboardPage;
