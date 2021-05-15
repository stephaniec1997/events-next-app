import Head from 'next/head';

import Events from 'components/events';

export default function Home() {
  return (
    <div >
      <Head>
        <title>Events</title>
        <meta name="description" content="A list of Events created by admin" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <main>
          <Events />
      </main>

      <footer >

      </footer>
    </div>
  );
}
