import React, { useState, useRef, useEffect } from 'react';

import Map from 'ol/Map';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import { Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { get as getProjection, transform } from 'ol/proj';
import { ScaleLine, defaults as defaultControls } from 'ol/control';
import XYZ from 'ol/source/XYZ';
import Draw from 'ol/interaction/Draw';

import datacity from '../../data/city.json';
import dataworld from '../../data/world.json';

import './TileDownload.scss';

const projection = getProjection('EPSG:4326');
const scaleControl = new ScaleLine({
  units: 'metric',
  bar: true,
  steps: 4,
  text: true,
  minWidth: 140,
});

const image = new CircleStyle({
  radius: 5,
  fill: null,
  stroke: new Stroke({ color: 'red', width: 1 }),
});

const osmurl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

export function TileDownload() {
  const mapEl = useRef(undefined);
  const [map, setMap] = useState<any>(undefined);
  const [city, setCity] = useState(undefined);
  const [world, setWorld] = useState(undefined);
  const [tile, setTile] = useState(undefined);
  const [draw, setDraw] = useState(undefined);
  const [drawsource, setDrawsource] = useState(undefined);
  const [url, setUrl] = useState(osmurl);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(3);

  const [minx, setMinx] = useState(-180);
  const [miny, setMiny] = useState(-85);
  const [maxx, setMaxx] = useState(180);
  const [maxy, setMaxy] = useState(85);

  const [folder, setFolder] = useState('');

  const addCity = (olmap: Map) => {
    if (olmap) {
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(datacity),
      });
      const c = new VectorLayer({
        source: vectorSource,
        style: new Style({
          image: image,
        }),
      });
      c.setZIndex(3);
      olmap.addLayer(c);
      setCity(c);
    }
  };

  const addWorld = (olmap: Map) => {
    if (olmap) {
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(dataworld),
      });
      const w = new VectorLayer({
        source: vectorSource,
        style: new Style({
          stroke: new Stroke({
            color: '#000000',
            width: 2,
          }),
          fill: new Fill({
            color: '#66666666',
          }),
        }),
      });
      w.setZIndex(2);
      olmap.addLayer(w);
      setWorld(w);
    }
  };

  const clear = (e) => {
    const [x0, y0, x1, y1] = e.feature.values_.geometry.extent_;
    setMinx(x0);
    setMiny(y0);
    setMaxx(x1);
    setMaxy(y1);
    if (drawsource) {
      drawsource.clear();
    }
  };

  const handleClear = clear.bind(this);

  const addDraw = (olmap: Map) => {
    if (olmap) {
      const source = new VectorSource({ wrapX: false });

      const vector = new VectorLayer({
        source: source,
      });
      const d = new Draw({
        source: source,
        type: 'Polygon',
      });
      olmap.addInteraction(d);
      olmap.addLayer(vector);
      setDraw(d);
      setDrawsource(source);
      d.on('drawend', handleClear);
    }
  };

  const handleAddTile = () => {
    const t = new TileLayer({
      source: new XYZ({ url }),
    });
    setTile(t);
    if (map) {
      map.addLayer(t);
      t.setZIndex(0);
    }
  };

  const getPath = (e, path) => {
    console.log(e, path);
    if (path == null) {
      alert('请选择一个文件/文件夹');
    } else {
    }
  };

  const handleFileReader = async () => {
    const path = await window.electron.ipcRenderer.getTileSaveFolderPath();
    console.log('path', path);
    if (path) {
      setFolder(path);
    }
  };

  useEffect(() => {
    if (mapEl && mapEl.current) {
      const olmap = new Map({
        layers: [],
        target: 'map',
        controls: defaultControls().extend([scaleControl]),
        view: new View({
          center: transform(
            [120.30029296875, 23.28171917560003],
            'EPSG:4326',
            projection
          ),
          zoom: 14,
          projection,
        }),
      });
      setMap(olmap);
      addWorld(olmap);
      addCity(olmap);
      addDraw(olmap);
      return () => {
        if (map) {
          map.removeLayer(city);
          map.removeLayer(world);
          map.removeLayer(tile);
        }
      };
    }
    return () => {};
  }, []);

  return (
    <div>
      <div className="flex mx12 my12">
        <input
          className="input input--s w-full mr6"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="瓦片地址"
        />
        <input
          className="input input--s w120 mr6"
          type="number"
          value={min}
          placeholder="最小级别"
          onChange={(e) => {
            setMin(parseInt(e.target.value));
          }}
        />
        <input
          className="input input--s w120"
          type="number"
          value={max}
          onChange={(e) => {
            setMax(parseInt(e.target.value));
          }}
          placeholder="最大级别"
        />
      </div>
      <div className="flex mx12 my12 flex--center-cross">
        <button type="button" className="btn btn--s round txt-light w120 mr6">
          点击拉框绘制范围
        </button>
        <div className="flex w-full">
          <input
            className="input input--s w-1/4 mr6"
            type="number"
            value={minx}
            placeholder="MinX/西边经度"
            onChange={(e) => setMinx(parseInt(e.target.value))}
          />
          <input
            className="input input--s w-1/4 mr6"
            type="number"
            value={miny}
            placeholder="MinY/南边纬度"
            onChange={(e) => setMiny(parseInt(e.target.value))}
          />
          <input
            className="input input--s w-1/4 mr6"
            type="number"
            value={maxx}
            placeholder="MaxX/东边经度"
            onChange={(e) => setMaxx(parseInt(e.target.value))}
          />
          <input
            className="input input--s w-1/4 mr6"
            type="number"
            value={maxy}
            placeholder="MaxY/北边纬度"
            onChange={(e) => setMaxy(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="flex mx12 my12">
        <input
          className="input input--s w-full mr6"
          placeholder="本地保存路径"
          value={folder}
          onClick={() => handleFileReader()}
        />
        <button
          type="button"
          className="btn btn--s btn--stroke round w120 mr6"
          onClick={handleAddTile}
        >
          叠加显示
        </button>
        <button type="button" className="btn btn--s round w120">
          下载到本地
        </button>
      </div>
      <div id="map" className="w-auto px6 py6 hmax1000" ref={mapEl} />
    </div>
  );
}

export default TileDownload;
