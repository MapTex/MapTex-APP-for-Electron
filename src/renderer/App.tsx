import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './layout/Home';
import Tile from './layout/Tile';
import TileDownload from './components/download/TileDownload';
import TileCombine from './components/combine/TileCombine';

import './App.css';
import './style/assembly/assembly.min.css';
import './style/assembly/assembly.js';
import 'ol/ol.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tile" element={<Tile />}>
          <Route path="folderdownload" element={<TileDownload />} />
          <Route path="folderexplorer" element={<span>文件夹瓦片浏览</span>} />
          <Route path="foldercombine" element={<TileCombine />} />a
        </Route>
      </Routes>
    </Router>
  );
}
