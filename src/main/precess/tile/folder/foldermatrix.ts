/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-param-reassign */
import { createWriteStream } from 'fs';
// import { createCanvas, loadImage } from 'canvas';
import FolderTile from './foldertile';
import Schema from '../schema';
import TileFormat from '../format';

class FolderMatrix {
  public level: string = '';

  public uri: string = '';

  public folderMatrix: FolderTile[] = [];

  public tileWidth: number = 256;

  public tileHeight: number = 256;

  public minX = Number.MAX_VALUE;

  public minY = Number.MAX_VALUE;

  public maxX = Number.MIN_VALUE;

  public maxY = Number.MIN_VALUE;

  quantify(schema?: string) {
    schema = schema || Schema.TMS;
    this.folderMatrix.forEach((tile) => {
      tile.canvaX = (tile.x - this.minX) * this.tileWidth;
      tile.canvaY = (tile.y - this.minY) * this.tileHeight;
    });
  }

  combine(format: TileFormat, output: string) {
    const { minX, minY, maxX, maxY, tileHeight, tileWidth, folderMatrix } =
      this;
    const width = (maxX - minX + 1) * tileWidth;
    const height = (maxY - minY + 1) * tileHeight;
    /* const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    const promises = folderMatrix.map((tile) => loadImage(tile.uri));
    Promise.all(promises).then((res) => {
      res.forEach((img, i) => {
        const tile = folderMatrix[i];
        const { canvaX, canvaY } = tile;
        ctx.drawImage(img, canvaX, canvaY, tileWidth, tileHeight);
      });
      const out = createWriteStream(output);
      const stream = canvas.createPNGStream();
      stream.pipe(out);
    }); */
  }
}

export default FolderMatrix;
