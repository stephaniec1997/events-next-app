# Events Next App

This project is a personal project to update technologies of a previous project called Events MERN App which can be found [here](https://github.com/stephaniec1997/events-app). New
technologies include: Firebase, Next.js, Material UI, and React Testing Library.

## Demo

You can find a demo of this project [here](http://events-next-app.vercel.app).

## Running Application

This application uses yarn as the package manager. The backend tech is Google's Firebase which needs to be setup and those directions can be found under [Firebase Setup](#firebase-setup). You will also need to get a google api key for the autocomplete service (Note: this variable is not needed, the project will still work without it) which can be setup in the Google Cloud Console :

To install dependencies run:

```
yarn
```

And to get the project running on your local machine run:

```
yarn dev
```

### Testing

For testing I used the jest and react testing library. Run tests with:

```
yarn test
```

## App Information

The app was meant to display events created by an admin. Authentication happens client-side while data retrieval happens server side. This project makes use of Next APIs to edit data.

### Future improvements

- More test coverage
- Event Subscription with Notifications
- Use Firebase Cloud Function to initialize admin/super-user

## Firebase Setup

I've used the firebase console for all the setup.

1. Create Firebase Project
  - Go to [https://console.firebase.google.com](https://console.firebase.google.com) and add a new project.
2. Setup Authentication by enabling Email/Password under sign-in method.
3. Initialize Firestore and Realtime Databases
4. Get public variables for project's client side use.
  - If you haven't already go to Project Settings - General and add a new web app. Once it's been setup, your config variables will be displayed under that web app.
5. Get Admin SDK private variables for project.
  - Under Project Settings - Service Accounts generate a private key for admin sdk, download file to store and use variables within file for the private env variables.
6. If taking to production, you'll also need to setup some database security rules which you can find more info on [here](https://firebase.google.com/docs/auth/admin/custom-claims).

Some Helpful Resources:

- [https://firebase.google.com/docs/web/setup](https://firebase.google.com/docs/web/setup)
- [https://firebase.google.com/docs/admin/setup#add-sdk](https://firebase.google.com/docs/admin/setup#add-sdk)

## Sources

- Frontend and simple firebase config was created from previous knowledge and next/firebase documentation.

- Authentication Hook: Huge shoutout to UI.dev for their help on the [authentication hook](https://usehooks.com/useAuth/) which I found through the Next documentation: [https://nextjs.org/docs/authentication#firebase](https://nextjs.org/docs/authentication#firebase).

- Admin SDK Setup: [https://colinhacks.com/essays/nextjs-firebase-authentication](https://colinhacks.com/essays/nextjs-firebase-authentication).

- Google Autocomplete Service: Material UI provided that code which can be found at [https://material-ui.com/components/autocomplete/#google-maps-place](https://material-ui.com/components/autocomplete/#google-maps-place).
