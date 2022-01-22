import { ComponentType, useContext, useEffect, useState } from 'react';
import { IThought } from '../../interfaces/IThought';
import { ThoughtItem } from '../../components/ThoughtItem/ThoughtItem';

import styles from './ThoughtsList.module.css';
import Dialog from '@reach/dialog';
import { ThoughtAdd } from '../ThoughtAdd/ThoughtAdd';

import '@reach/dialog/styles.css';
import { fetchJson } from '../../utils/fetchJson';
import VisuallyHidden from '@reach/visually-hidden';
import { ErrorContext } from '../../contexts/ErrorProvider';

export const ThoughtsList: ComponentType = () => {
  const [thoughts, setThoughts] = useState<IThought[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { notifyError } = useContext(ErrorContext);

  useEffect(() => {
    loadThoughts();
  }, []);

  async function loadThoughts() {
    const data = await fetchJson<IThought[]>('GET', `http://localhost:8080/thoughts/`);
    if (data) {
      setThoughts(data);
    }
  }

  async function addThought(thought: IThought) {
    setShowDialog(false);
    const newThought = await fetchJson<IThought>('POST', `http://localhost:8080/thoughts/`, thought);
    if (newThought) {
      setThoughts([...thoughts, newThought]);
    } else {
      notifyError('Error adding a new thought');
    }
  }

  return (
    <div className={styles.list}>
      <div className={styles.title}> Thoughts </div>

      {thoughts.length === 0 && (
        <div className={styles.welcome}>
          <label> This is your Thoughts diary</label>
          <label>
            Here you can log your thoughts and reflect on them. You can log both positive and negative thoughts. You
            should do so once a day.
          </label>
        </div>
      )}
      {thoughts.map((thought) => {
        return <ThoughtItem thought={thought} key={thought.id} />;
      })}

      <button
        className={styles.addThoughtButton}
        onClick={() => {
          setShowDialog(true);
        }}
      >
        Add a thought
      </button>
      <Dialog isOpen={showDialog} onDismiss={() => setShowDialog(false)} aria-label="Dialog">
        <button className="close-button" onClick={() => setShowDialog(false)}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
        <ThoughtAdd onThoughtAdded={addThought} />
      </Dialog>
    </div>
  );
};
