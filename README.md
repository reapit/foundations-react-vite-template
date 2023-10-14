# React App Scaffolded With Foundations React Vite Template

## Getting Started

Each package has the following commands that can be run using yarn:

- `yarn start` will start a dev server with typechecking and linting enabled
- `yarn build` will build an app for production
- `yarn test` will run the Jest tests in watch mode
- `yarn lint` will run eslint and prettier accross the project
- `yarn check` will use tsc to type check the project

## CI/CD and Releases

### Development & PRs

Then with `NodeJS ~18` installed, run;

```
npx degit reapit/foundations-react-vite-template/#main/templates/vite-simple <<Your App Name>> --mode=git
```

Then;

```
git init
```

And;

```
yarn
```

Add your `connectClientId` to the `.env` file at the root of the project.

Finally to start a server at `http://localhost:8080`;

```
yarn start
```

For a full list of commands, see the README in the directory of the scaffolded app.
