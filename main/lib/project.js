import { basename } from 'path';
import Git from 'nodegit';
import uuid from 'uuid/v4';

export async function validateProject(projectPath) {
  try {
    const repo = await Git.Repository.open(projectPath);
    console.log('REPO EXISTED', repo); // TODO: use `debug` module
  } catch (err) {
    if (err.errno === Git.Error.CODE.ENOTFOUND) {
      const repo = await Git.Repository.init(projectPath, 0);
      console.log('REPO CREATED', repo); // TODO: use `debug` module
    } else {
      throw err;
    }
  }

  return {
    name: basename(projectPath),
    id: uuid(),
  };
}
