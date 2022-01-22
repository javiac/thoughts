import { ComponentType } from 'react';
import { IThought } from '../../interfaces/IThought';
import { MoodIcon } from '../MoodIcon/MoodIcon';

import styles from './ThoughtItem.module.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ThoughtTitle } from '../ThoughtTitle/ThoughtTitle';

interface IThoughtItemProps {
  thought: IThought;
}

export const ThoughtItem: ComponentType<IThoughtItemProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.thoughtItem}
      onClick={() => {
        navigate(`/thoughts/${props.thought.id}`);
      }}
    >
      <MoodIcon mood={props.thought.mood} className={styles.moodIcon}></MoodIcon>
      <div className={styles.thoughtItemRight}>
        <ThoughtTitle thought={props.thought} />
        <span className={styles.arrow}> {'>'} </span>
      </div>
    </div>
  );
};
