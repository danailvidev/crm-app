const packageJson = require('../../package.json');
export const environment = {
  production: true,
  firebase : {
    apiKey: 'AIzaSyBe2dRVEiMbg2l1H3NHgMgvBEd6LJCkXJs',
    authDomain: 'ngcrm-95d41.firebaseapp.com',
    databaseURL: 'https://ngcrm-95d41.firebaseio.com',
    projectId: 'ngcrm-95d41',
    storageBucket: 'ngcrm-95d41.appspot.com',
    messagingSenderId: '655592356617'
  },
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    material: packageJson.dependencies['@angular/material'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  }
};
