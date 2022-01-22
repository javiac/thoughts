import classnames from 'classnames';
import { ComponentType } from 'react';
import { Mood } from '../../enums/Mood';

import styles from './MoodIcon.module.css';

interface IMoodIconProps {
  mood: Mood;
  color?: 'orange' | 'gray';
  selected?: boolean;
  className?: string;
}

export const MoodIcon: ComponentType<IMoodIconProps> = (props) => {
  return (
    <span className={classnames(styles[props.color ?? 'gray'], { [styles.selected]: props.selected }, props.className)}>
      {props.mood}
    </span>
  );
};
