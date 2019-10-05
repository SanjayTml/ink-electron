import { basename } from 'path';
import * as projectStore from './store/project-store';
import {gitCheckAndInit, gitProjectState, gitCommit} from './git/utils';
import uuid from 'uuid/v4';

export async function initProject(projectPath) {
  // Check if the project is Unique and doesnt already exsist. 
  if(projectStore.getByPath(projectPath) != null) {
    console.error("PROJECT ALREADY EXISTS", projectPath);
    return;
  }
  // Check if git is already initialized, if not then do it. 
  await gitCheckAndInit(projectPath);
  return new projectStore.Project(
    uuid(),
    basename(projectPath),
    projectPath,
    'ableton-project');  
}

export async function getProjectState(projectPath) {
  return await gitStatus(projectPath);
}

export async function commitProject(projectPath, commitMessage) {
  return await gitCommit(projectPath, commitMessage);
}
