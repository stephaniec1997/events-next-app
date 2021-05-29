import Head from "next/head";

import Events from "components/events";

import { getEvents } from "utils/firebase/admin";

export default function Home({ events }) {
  return (
    <>
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
        <Events data={events} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const data = await getEvents();

  return {
    props: {
      events: data,
    },
  };
}
