import classnames from 'classnames';
import { ComponentType, useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ErrorToast } from '../../components/ErrorToast/ErrorToast';
import { ErrorContext, ErrorProvider } from '../../contexts/ErrorProvider';
import { Tab } from '../../enums/Tab';
import { usePathOnPopState } from '../../hooks/usePathOnPopState';

import styles from './Layout.module.css';

export const Layout: ComponentType = () => {
  const [selectedTab, setSelectedTab] = useState<Tab | undefined>();
  const path = usePathOnPopState();
  const navigate = useNavigate();
  const { error } = useContext(ErrorContext);

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate(`/${Tab.thoughts}`);
    }
  }, []);

  useEffect(() => {
    handleSelectedTab(path);
  }, [path]);

  useEffect(() => {
    handleSelectedTab(window.location.pathname);
  });

  function handleSelectedTab(pathname: string) {
    const tab = pathname.split('/')[1] as Tab;
    switch (tab) {
      case Tab.program:
        setSelectedTab(Tab.program);
        break;
      case Tab.messages:
        setSelectedTab(Tab.messages);
        break;
      case Tab.thoughts:
        setSelectedTab(Tab.thoughts);
        break;
      case Tab.me:
        setSelectedTab(Tab.me);
        break;
      default:
        setSelectedTab(undefined);
    }
  }

  return (
    <>
      {error && <ErrorToast error={error} />}
      <Outlet />
      <div className={styles.tabs}>
        <Link
          onClick={() => setSelectedTab(Tab.program)}
          className={classnames(styles.tab, { [styles.selected]: selectedTab === Tab.program })}
          to={`/${Tab.program}`}
        >
          Program
        </Link>
        <Link
          onClick={() => setSelectedTab(Tab.messages)}
          className={classnames(styles.tab, { [styles.selected]: selectedTab === Tab.messages })}
          to={`/${Tab.messages}`}
        >
          Messages
        </Link>
        <Link
          onClick={() => setSelectedTab(Tab.thoughts)}
          className={classnames(styles.tab, { [styles.selected]: selectedTab === Tab.thoughts })}
          to={`/${Tab.thoughts}`}
        >
          Thoughts
        </Link>
        <Link
          onClick={() => setSelectedTab(Tab.me)}
          className={classnames(styles.tab, { [styles.selected]: selectedTab === Tab.me })}
          to={`/${Tab.me}`}
        >
          Me
        </Link>
      </div>
    </>
  );
};
