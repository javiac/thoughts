import { ComponentType } from 'react';

import styles from './ErrorToast.module.css';

interface IErrorToastProps {
  error: string;
}
export const ErrorToast: ComponentType<IErrorToastProps> = (props) => {
  return <div className={styles.errorToast}> {props.error} </div>;
};
