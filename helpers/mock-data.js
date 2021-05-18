export const EVENT = {
  '_id': 'kljdslkfjio',
  name: 'test event (local)',
  startDate: new Date().toString(),
  place: 'test place',
  description: 'test event that needs to be gotten from db instead',
};

export const EVENTS = {
  events: [
  {
    '_id': '24780823098',
    name: 'Test Event',
    startDate: '2019-08-13T18:15:11.000+00:00',
    endDate: '2019-08-30T18:15:11.000+00:00',
    place: 'The Place To Meet',
    description: 'The description of the event is here',
  },
  {
    '_id': '2478082dsf3098',
    name: 'Event 2',
    startDate: '2019-08-13T18:15:11.000+00:00',
    place: 'The Place To Meet 2',
    description: 'The description of the event is here. And only here',
  },
  EVENT,
] };
