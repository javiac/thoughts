import { ComponentType } from 'react';

import styles from './ErrorMessage.module.css';

interface IErrorMessageProps {
  error?: string;
}

export const ErrorMessage: ComponentType<IErrorMessageProps> = (props) => {
  return props.error ? <label className={styles.error}> {props.error}</label> : null;
};
