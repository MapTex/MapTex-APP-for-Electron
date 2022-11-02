import { dialog } from 'electron';
import { readdirSync } from 'fs';

async function getTileInputFolderDialogPath() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  if (canceled) {
    return undefined;
  }
  const dir = filePaths[0];
  const levels = readdirSync(dir);

  return { dir, levels };
}

export default getTileInputFolderDialogPath;
