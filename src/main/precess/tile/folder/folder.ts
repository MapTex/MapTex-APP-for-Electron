/* eslint-disable no-restricted-properties */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-named-as-default */
import { readdirSync, statSync } from 'fs';

import FolderMatrix from './foldermatrix';
import FolderTile from './foldertile';

import Schema from '../schema';

import TileFormat from '../format';

type FolderMatrixSet = FolderMatrix[];

enum FolderOrder {
  ZXY = 'zxy',
  ZYX = 'zyx',
}

export class Folder {
  public tileMatrixSet: FolderMatrixSet = [];

  public format: TileFormat = TileFormat.PNG;

  public schema: Schema = Schema.XYZ;

  public fileOrder: FolderOrder = FolderOrder.ZYX;

  private validTile: Function = (tilename: string) => {
    if (!tilename) return false;
    const regexp = new RegExp(`.${this.format}`);
    return tilename.match(regexp);
  };

  async recursion(folderpath: string) {
    const { fileOrder } = this;
    switch (fileOrder) {
      case FolderOrder.ZYX:
        this.recursionZYX(folderpath);
        break;
      case FolderOrder.ZXY:
        this.recursionZXY(folderpath);
        break;
      default:
        break;
    }
  }

  private async recursionZYX(folderpath: string) {
    const self = this;
    const { schema } = this;
    try {
      const levels = readdirSync(folderpath);
      levels.forEach(async (level) => {
        const z = parseInt(level, 10);
        const matirx = new FolderMatrix();
        matirx.level = level;
        matirx.uri = `${folderpath}/${level}`;
        const fstate = statSync(matirx.uri);

        if (fstate.isDirectory()) {
          this.tileMatrixSet.push(matirx);
          const rows = readdirSync(matirx.uri);
          rows.forEach(async (row) => {
            let y = parseInt(row, 10);
            if (schema === 'tms') {
              y = Math.pow(2, z) - y;
            }
            if (y < matirx.minY) {
              matirx.minY = y;
            }
            if (y > matirx.maxY) {
              matirx.maxY = y;
            }

            const coluri = `${matirx.uri}/${row}`;
            const cols = readdirSync(coluri).filter((c) => self.validTile(c));

            cols.forEach(async (col) => {
              const x = parseInt(col, 10);
              if (x < matirx.minX) {
                matirx.minX = x;
              }
              if (x > matirx.maxX) {
                matirx.maxX = x;
              }
              const tile = new FolderTile();
              tile.x = x;
              tile.y = y;
              tile.z = z;
              tile.uri = `${coluri}/${col}`;
              matirx.folderMatrix.push(tile);
            });
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  private async recursionZXY(folderpath: string) {
    const self = this;
    const { schema } = this;
    try {
      const levels = readdirSync(folderpath);
      levels.forEach(async (level) => {
        const z = parseInt(level, 10);
        const matirx = new FolderMatrix();
        matirx.level = level;
        matirx.uri = `${folderpath}/${level}`;
        const fstate = statSync(matirx.uri);

        if (fstate.isDirectory()) {
          this.tileMatrixSet.push(matirx);
          const cols = readdirSync(matirx.uri);
          cols.forEach(async (col) => {
            let y = parseInt(col, 10);
            if (schema === Schema.TMS) {
              y = Math.pow(2, z) - y;
            }
            if (y < matirx.minY) {
              matirx.minY = y;
            }
            if (y > matirx.maxY) {
              matirx.maxY = y;
            }

            const coluri = `${matirx.uri}/${col}`;
            const rows = readdirSync(coluri).filter((c) => self.validTile(c));

            rows.forEach(async (row) => {
              const x = parseInt(row, 10);
              if (x < matirx.minX) {
                matirx.minX = x;
              }
              if (x > matirx.maxX) {
                matirx.maxX = x;
              }
              const tile = new FolderTile();
              tile.x = x;
              tile.y = y;
              tile.z = z;
              tile.uri = `${coluri}/${row}`;
              matirx.folderMatrix.push(tile);
            });
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  quantify() {
    this.tileMatrixSet.forEach((matrix) => matrix.quantify());
  }

  combine(index: number, output: string) {
    const { tileMatrixSet, format } = this;
    if (index < tileMatrixSet.length) {
      tileMatrixSet[index].combine(format, output);
    }
  }
}

export default Folder;
