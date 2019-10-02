import { basename } from 'path';
import Git from 'nodegit';
import * as projectStore from './store/project-store'
import uuid from 'uuid/v4';

export async function initProject(projectPath) {

  // Check if the project is Unique and doesnt already exsist. 
  if(projectStore.getByPath(projectPath) != null) {
    console.error("PROJECT ALREADY EXISTS", projectPath);
    return;
  }

  try {
    const repo = await Git.Repository.open(`${projectPath}/.git`);
    console.log('REPO EXISTED', repo); // TODO: use `debug` module
  } catch (err) {
    if (err.errno === Git.Error.CODE.ENOTFOUND) {
      const repo = await Git.Repository.init(`${projectPath}/.git`, 0);

      // Create initial commit
      const index = await repo.refreshIndex();
      await index.addAll();
      await index.write();
      const oid = await index.writeTree();
      const signature = await Git.Signature.default(repo);

      await repo.createCommit('HEAD', signature, signature, 'initial commit', oid, []);
      console.log('REPO CREATED', repo); // TODO: use `debug` module
    } else {
      throw err;
    }
  }

  return new projectStore.Project(
    uuid(),
    basename(projectPath),
    projectPath,
    'ableton-project');  
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

export async function commitProject(projectPath, commitMessage) {
  try {
    const repo = await Git.Repository.open(`${projectPath}/.git`);
    const index = await repo.refreshIndex();
    await index.addAll();
    await index.write();
    const oid = await index.writeTree();
    const head = await Git.Reference.nameToId(repo, 'HEAD');
    const parent = await repo.getCommit(head);
    const signature = await Git.Signature.default(repo);
    await repo.createCommit('HEAD', signature, signature, commitMessage, oid, [parent]);
    return 0;// TODO: Return the id
  } catch (err) {
    console.error(err);
    return;
  }
}
