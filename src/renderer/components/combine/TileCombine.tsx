import React, { useState, useRef, useEffect } from 'react';

import './TileCombine.scss';

export function TileDownload() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInputReader = async () => {
    const path = await window.electron.ipcRenderer.getTileInputFolderPath();
    if (path) {
      setInput(path);
    }
  };

  const handleOutputReader = async () => {
    const path = await window.electron.ipcRenderer.getTileSaveFolderPath();
    if (path) {
      setOutput(path);
    }
  };

  const handleTileCombine = async () => {
    const result = await window.electron.ipcRenderer.excuteTileCombine();
    if (result) {
      // setOutput(path);
    }
  };

  return (
    <div>
      <div className="mx12 my6">
        <input
          className="input input--s w-full"
          placeholder="本地瓦片路径"
          value={input}
          onClick={() => handleInputReader()}
        />
      </div>

      <div className="mx12 my6">
        <input
          className="input input--s w-full"
          placeholder="输出路径"
          value={output}
          onClick={() => handleOutputReader()}
        />
      </div>

      <div className="flex mx12 my12">
        <div className="select-container">
          <select className="select select--s">
            <option>one</option>
            <option>two</option>
          </select>
          <div className="select-arrow" />
        </div>
        <button
          type="button"
          className="btn btn--s round w120"
          onClick={handleTileCombine}
        >
          下载到本地
        </button>
      </div>
    </div>
  );
}

export default TileDownload;
