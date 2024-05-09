import React from 'react';
import { headerNavigation } from 'constants/index';
import { ReactComponent as HamburgerIcon } from 'assets/icons/icon_menu.svg';

import HamburgerItem from './HamburgerItem';
import styles from './HamburgerMenu.module.scss';

export default function HamburgerMenu() {
  return (
    <div className={`${styles.Dropdown} dropdown`}>
      <button
        className="dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <HamburgerIcon />
      </button>

      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {headerNavigation.map((item) => {
          if (item.isShowOnMenu) {
            return <HamburgerItem key={item.label} url={item.link} label={item.label} />;
          }

          return null;
        })}
      </div>
    </div>
  );
}
