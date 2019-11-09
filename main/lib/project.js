import { basename } from 'path';
import * as projectStore from './store/project-store';
import {gitCheckAndInit, gitStatus, gitCommit} from './git/utils';
import uuid from 'uuid/v4';
import { initInkFile, loadInkFile, applyDiff } from './ink-file/ink-file';
import { getParsedDiff } from './parser/parser';

export async function initProject (path) {
  // Check if the project is Unique and doesnt already exsist.
  if (projectStore.getByPath(path) != undefined) {
    console.error("PROJECT ALREADY EXISTS", projectStore.getByPath(path));
    return;
  }
  let name = basename(path);
  // Check if git is already initialized, if not then do it.
  await gitCheckAndInit(path);
  initInkFile(name, path);
  return new projectStore.Project(
    uuid(),
    name,
    path,
    'ableton-project');
}

export async function addProject(path) {
  let project = await initProject(path);
  return projectStore.append(project);
}

export async function getProjectState(path) {
  loadInkFile(path);
  let delta = await getParsedDiff(path);
  console.log(delta);
  // TODO: Use the state of the ink file
  let status = await gitStatus(path);
  return status;
}

export async function commitProject(path, commitMessage, delta) {
  applyDiff(delta);
  return await gitCommit(path, commitMessage);
}
