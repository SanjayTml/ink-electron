import { useEffect, useState } from 'react';
import { ipcRenderer as ipc } from 'electron-better-ipc';

export default function useProjectState(projectPath) {
  const [state, setState] = useState({});

  useEffect(() => {
    async function getState() {
      const status = await ipc.callMain('get-project-state', projectPath);
      setState(status);
    }

    if (projectPath) {
      getState();
    }
  }, [projectPath]);

  return { state };
}
