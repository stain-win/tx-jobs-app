# TxJobsApp

## Installation

Run `npm ci` to install the dependencies.

## Start the application

Run `npx nx serve tx-jobs` to start the development server. Happy coding!

if you would like to use different port for the json-server you can change the port in the ```package.json``` file in the ```json-server``` script and environment definition in `libs/core/environment/src/lib/environment.ts`,
just change the ```apiBaseUrl``` property to the desired port number.

Run `npm run json-server` to start the json-server for the application on port `:3000`

Run `npx nx test tx-jobs` to execute the unit tests on the app.

Run `npx nx test core` to execute the unit tests on the library.



### Using the application
`/` route will display the home page, with listed published Job Ads, you can click on the job ad to see the details of the job ad.

`/login` route will display the login page, where you can login with the following credentials:
- username: ```test```
- password: ```test```

This will redirect you to the ```/dashboard``` route where you can see the list of jobs, invoices and do basic operation with Job ads.

## Build for production

Run `npx nx build tx-jobs` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.
