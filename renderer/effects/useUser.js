import { useEffect, useState } from 'react';
import { ipcRenderer as ipc } from 'electron-better-ipc';

export default function useUser() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await ipc.callMain('fetch-user');
        setUser(user);
      } catch(e) {
        console.log(e)
      }

    }

    fetchUser();
  }, []);

  return { user, setUser };
}
