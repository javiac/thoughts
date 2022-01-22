import { ComponentType, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MoodIcon } from '../../components/MoodIcon/MoodIcon';
import { ThoughtTitle } from '../../components/ThoughtTitle/ThoughtTitle';
import { Tab } from '../../enums/Tab';
import { IThought } from '../../interfaces/IThought';
import { fetchJson } from '../../utils/fetchJson';

import styles from './ThoughtDetails.module.css';

export const ThoughtDetails: ComponentType = () => {
  const [thought, setThought] = useState<IThought>();
  let params = useParams();

  async function loadThought(id: string) {
    const data = await fetchJson<IThought>('GET', `http://localhost:8080/thoughts/${id}`);
    setThought(data);
  }

  useEffect(() => {
    if (params.id) {
      loadThought(params.id);
    }
  }, [params]);
  if (!thought) {
    return null;
  }

  return (
    <div>
      <div className={styles.topBar}>
        <Link className={styles.arrow} to={`/${Tab.thoughts}`}>
          {'<'}
        </Link>
        <MoodIcon mood={thought.mood} />
        <ThoughtTitle thought={thought} />
      </div>
      <div className={styles.content}>
        <label className={styles.question}> Is there any evidence that your thought is true? </label>
        <label className={styles.description}> {thought.description} </label>
      </div>
    </div>
  );
};
