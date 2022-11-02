/* eslint-disable import/no-named-as-default */
import { IpcMainInvokeEvent } from 'electron';
import Folder from '../precess/tile/folder/folder';

async function excuteTileCombine(
  event: IpcMainInvokeEvent,
  input: string,
  output: string,
  levelindex: number
) {
  console.log(event, input, output, levelindex);
  const result = `${output}/${levelindex}.png`;
  const folder = new Folder();
  folder.recursion(input);
  folder.quantify();
  folder.combine(levelindex, result);
  return result;
}

export default excuteTileCombine;
