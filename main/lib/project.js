import { basename } from 'path';
// import Git from 'nodegit';
import uuid from 'uuid/v4';

export async function validateProject(projectPath) {
  //Git.Repository.open(projectPath)
  //  .then(repo => console.log('REPO', repo))
  //  .catch(err => console.error(err));
  console.log('hue hue hue');
  return {
    name: basename(projectPath),
    id: uuid(),
  };
}
