// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyDTe7cLeM-HCs_MhTQKCaCKvGWHcTc0G3w",
    authDomain: "books-ab4ba.firebaseapp.com",
    databaseURL: "https://books-ab4ba.firebaseio.com",
    projectId: "books-ab4ba",
    storageBucket: "books-ab4ba.appspot.com",
    messagingSenderId: "428691209770"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
