import { remote } from 'electron';
import React, { useCallback } from 'react';
import Head from 'next/head';

const Home = () => {
  const handleChooseRepository = useCallback(async () => {
    console.log(
      JSON.stringify(
        await remote.dialog.showOpenDialog({
          properties: ['openDirectory'],
        })
      )
    );
  });

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (api-routes)</title>
      </Head>

      <button onClick={handleChooseRepository}>Choose Repository</button>
    </React.Fragment>
  );
};

export default Home;
