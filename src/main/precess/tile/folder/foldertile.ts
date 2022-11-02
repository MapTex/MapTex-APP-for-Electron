/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/lines-between-class-members */
import Tile from '../tile';

class FolderTile extends Tile {
  public uri: string = '';
  public canvaX: number = 0;
  public canvaY: number = 0;
}

export default FolderTile;
