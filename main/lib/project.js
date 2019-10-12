import { basename } from 'path';
import * as projectStore from './store/project-store';
import { gitCheckAndInit, gitStatus, gitCommit } from './git/utils';
import uuid from 'uuid/v4';
import { initInkFile, loadInkFile } from './ink-file/ink-file';

export async function initProject (projectPath) {
  // Check if the project is Unique and doesnt already exsist.
  if (projectStore.getByPath(projectPath) != undefined) {
    console.error("PROJECT ALREADY EXISTS", projectStore.getByPath(projectPath));
    return;
  }
  let name = basename(projectPath);
  // Check if git is already initialized, if not then do it.
  await gitCheckAndInit(projectPath);
  initInkFile(name, projectPath);
  return new projectStore.Project(
    uuid(),
    name,
    projectPath,
    'ableton-project');
}

export async function addProject(projectPath) {
  var project = await initProject(projectPath);
  return projectStore.append(project);
}

export async function getProjectState(projectPath) {
  var inkFile = loadInkFile(projectPath);
  console.log(inkFile);
  // TODO: Use the state of the ink file
  var status = await gitStatus(projectPath);
  return status;
}

export async function commitProject(projectPath, commitMessage) {
  return await gitCommit(projectPath, commitMessage);
}
