// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const packageJson = require('../../package.json');

export const environment = {
  production: false,
  firebase: {
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
  },
  logging: [
    {
      loggerName: 'console',
      loggerLocation: '',
      isActive: true
    }, {
      loggerName: 'localStorage',
      loggerLocation: 'logger',
      isActive: false
    }, {
      loggerName: 'webApiFire',
      loggerLocation: 'logs',
      isActive: false
    }
  ]
};
