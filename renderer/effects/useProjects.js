import electron from 'electron';
import { useEffect, useState } from 'react';

const ipcRenderer = electron.ipcRenderer || false;

export default function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (ipcRenderer) {
      const handleChanged = (event, projects) => {
        setProjects(projects);
      };

      ipcRenderer.on('projects-changed', handleChanged);
      ipcRenderer.send('fetch-projects');

      return () =>
        ipcRenderer.removeListener('projects-changed', handleChanged);
    }
  }, []);

  return projects;
}
