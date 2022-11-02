// import Icon from '@mapbox/mr-ui/icon';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mapbox/mr-ui/icon';
import logo from '../../../assets/icon.svg';

import './Home.scss';

interface ModeProps {
  title: string;
  subtitle: string;
  route: string;
  description: string | ReactElement;
}

const childrenModes: ModeProps[] = [
  {
    title: '瓦片工具',
    subtitle: '该瓦片工具核心能力',
    route: 'tile',
    description: (
      <div>
        <li>将离线的栅格瓦片包按照范围和级别生成一张图</li>
        <li>浏览或者导出合并的一张图</li>
      </div>
    ),
  },
  {
    title: '敬请期待......',
    subtitle: '敬请期待......',
    route: '/',
    description: (
      <div>
        <li>将离线的栅格瓦片包显示出来</li>
      </div>
    ),
  },
];

const Modes = (mode: ModeProps) => {
  return (
    <Link to={mode.route}>
      <div className="px24 py30 mt60 flex-mm shadow-lighten25-on-hover">
        <div className="flex-child-no-shrink mr24 mb0-mm mb18 w60 h60">
          <Icon
            name="database"
            size={32}
            passthroughProps={{ color: '#E8F1FC' }}
          />
        </div>
        <div>
          <h3 className="txt-bold">{mode.title}</h3>
          <p className="mt12">{mode.subtitle}</p>
          <span className="txt-em">{mode.description}</span>
        </div>
      </div>
    </Link>
  );
};

const Home = () => {
  const children = childrenModes.map((m) => Modes(m));
  return (
    <div className="home-layout bg-gray-dark">
      <div className="prose--dark">
        <div className="logo">
          <img width="200" alt="icon" src={logo} />
        </div>
        <div className="flex flex--center-main">
          <h1 className="txt-h1 ">小工具集合</h1>
        </div>

        <div className="modes mx60 flex flex--center-main">{children}</div>
      </div>
    </div>
  );
};

export default Home;
