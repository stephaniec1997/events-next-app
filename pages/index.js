import Head from 'next/head';
import List from '@material-ui/core/List';

import Event from 'components/event';

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
        <List>
          <Event event={{
            '_id': '24780823098',
            name: 'Test Event',
            startDate: '2019-08-13T18:15:11.000+00:00',
            endDate: '2019-08-30T18:15:11.000+00:00',
            place: 'The Place To Meet',
            description: 'The description of the event is here',
          }} />
        </List>
      </main>

      <footer >

      </footer>
    </div>
  );
}
