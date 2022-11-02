import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mapbox/mr-ui/icon';
import IconTxt from '@mapbox/mr-ui/icon-text';
import './Header.scss';

export function Header() {
  const back = (
    <Icon name="chevron-left" passthroughProps={{ color: '#FFFFFF' }} />
  );
  return (
    <div>
      <div className="header-layout bg-gray-dark px6 flex flex--center-cross h36">
        <Link to="/">
          <IconTxt iconBefore={back}>
            <span className="txt color-white color-gray-light-on-hover">
              返回主页
            </span>
          </IconTxt>
        </Link>
      </div>
    </div>
  );
}

export default Header;
