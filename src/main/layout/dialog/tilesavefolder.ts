import { dialog } from 'electron';

async function getTileSaveFolderDialogPath() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  if (canceled) {
    return undefined;
  }
  return filePaths[0];
}

export default getTileSaveFolderDialogPath;
