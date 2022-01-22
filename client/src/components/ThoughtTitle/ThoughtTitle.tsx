import moment from 'moment';
import { ComponentType } from 'react';
import { IThought } from '../../interfaces/IThought';

import styles from './ThoughtTitle.module.css';

interface IThoughtTitle {
  thought: IThought;
}
export const ThoughtTitle: ComponentType<IThoughtTitle> = (props) => {
  return (
    <div className={styles.thoughtTitle}>
      <label className={styles.title}> {props.thought.title}</label>
      <label className={styles.date}> {moment(props.thought.createdAt).format('MMMM D, YYYY, h:mm a')} </label>
    </div>
  );
};
