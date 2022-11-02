import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar, { Section } from './Sidebar';

export function Tile() {
  const sections: Array<Section> = [
    {
      name: '栅格瓦片',
      entries: [
        {
          name: '文件夹瓦片叠加',
          content: <span />,
          route: 'folderdownload',
        },
        /* {
          name: '文件夹瓦片浏览',
          content: <span />,
          route: 'folderexplorer',
        }, */
        {
          name: '文件夹瓦片合并',
          content: <span />,
          route: 'foldercombine',
        },
      ],
    },
  ];

  return (
    <div>
      <Header />
      <div className="relative fixed-mm top left mt24 bottom w240-mm py24 px24 scroll-styled overflow-auto">
        <Sidebar sections={sections} />
      </div>
      <div className="mx-auto pl240-mm wmax1200">
        <Outlet />
      </div>
    </div>
  );
}

export default Tile;
