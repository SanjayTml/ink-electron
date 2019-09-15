import { basename } from 'path';
import Git from 'nodegit';
import uuid from 'uuid/v4';

export async function validateProject(projectPath) {
  try {
    const repo = await Git.Repository.open(`${projectPath}/.git`);
    console.log('REPO EXISTED', repo); // TODO: use `debug` module
  } catch (err) {
    if (err.errno === Git.Error.CODE.ENOTFOUND) {
      const repo = await Git.Repository.init(`${projectPath}/.git`, 0);
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

export async function getProjectState(projectPath) {
  const repo = await Git.Repository.open(`${projectPath}/.git`);
  const statuses = await repo.getStatus();

  const state = {
    modified: [],
    new: [],
    deleted: [],
  };

  statuses.forEach(file => {
    if (file.isModified()) {
      state.modified.push(file.path());
    } else if (file.isNew()) {
      state.new.push(file.path());
    } else if (file.isDeleted()) {
      state.deleted.push(file.path());
    }
  });

  return state;
}
