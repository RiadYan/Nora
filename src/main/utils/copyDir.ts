import path from 'path';
import fs from 'fs/promises';

import logger from '../logger';
import makeDir from './makeDir';
import isPathADir from './isPathADir';

async function copyDir(src: string, dest: string) {
  try {
    const { exist } = await makeDir(dest, { recursive: true });
    if (exist) logger.info(`Directory already exists. Will re-write contents of the directory.`);

    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (isPathADir(entry)) await copyDir(srcPath, destPath);
      else await fs.copyFile(srcPath, destPath);
    }
  } catch (error) {
    logger.error('Failed to copy the directory', { error, src, dest });
    throw error;
  }
}

export default copyDir;
