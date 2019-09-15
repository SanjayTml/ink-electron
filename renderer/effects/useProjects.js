import { useEffect, useState } from 'react';
import { ipcRenderer as ipc } from 'electron-better-ipc';

export default function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const projects = await ipc.callMain('fetch-projects');
      setProjects(projects);
    }

    fetchProjects();
  }, []);

  return { projects, setProjects };
}
