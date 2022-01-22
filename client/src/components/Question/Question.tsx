import { ComponentType, useState } from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

import styles from './Question.module.css';

interface IQuestionProps {
  onChange: (value: string) => void;
  maxCharacters?: number;
  error?: string;
}

export const Question: ComponentType<IQuestionProps> = (props) => {
  const [input, setInput] = useState<string>('');

  return (
    <div className={styles.question}>
      <label> {props.children} </label>
      <label>
        {input.length} / {props.maxCharacters ?? ''}
      </label>
      <textarea
        className={styles.input}
        onChange={(e) => {
          setInput(e.target.value);
          props.onChange(e.target.value);
        }}
        value={input}
      />
      <ErrorMessage error={props.error} />
    </div>
  );
};
