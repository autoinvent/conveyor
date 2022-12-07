# Conveyor

A modern minimal Vite + React + TypeScript template with pre-configured ESLint (with Airbnb JS/React rules), testing with Vitest and Testing Library, and Prettier, Stylelint and Git hooks powered by pre-commit out of the box 📦

![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Stylelint](https://img.shields.io/badge/stylelint-000?style=for-the-badge&logo=stylelint&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-719A20?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Testing Library](https://img.shields.io/badge/Testing_Library-242526?style=for-the-badge&logo=testing-library&logoColor=FA4445)

## Features

## Usage

```bash
pnpm install

pnpm dev
```

## Scripts

- `pnpm dev` - start a development server for testing the conveyor library with hot reload.
- `pnpm build` - build library for production. The generated files will be on the `dist` folder. `pnpm pack` will package these files into a tarball for install.
- `pnpm preview` - locally preview the production build.
- `pnpm test` - run tests in watch mode.
- `pnpm test:ci` - run tests once without watch mode.
- `pnpm test:ui` - run tests with ui.
- `pnpm format` - format all files with Prettier.
- `pnpm lint` - runs TypeScript, ESLint and Stylelint.
- `pnpm validate` - runs `lint`, `test:ci`.

## Usage from CDN

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="/src/logo.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Conveyor</title>
  <style>
    body {
      height: 100%;
      margin: 0;
      width: 100%;
      overflow: hidden;
    }
  </style>

  <!--
      This AutoInvent example depends on Promise and fetch, which are available in
      modern browsers, but can be "polyfilled" for older browsers.
      Conveyor itself depends on React DOM.
      If you do not want to rely on a CDN, you can host these files locally or
      include them directly in your favored resource bundler.
    -->
  <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
</head>

<body>
  <div id="conveyor">Loading...</div>
  <script src="dist/conveyor.umd.js"></script>
  <script defer>
    function autoInventAdapter(aiSchema) {
      const modelTitles = Object.keys(aiSchema);
      modelTitles.pop();
      const modelNames = modelTitles.map((modelTitle) => String(modelTitle).toLowerCase());
      const modelPluralNames = modelNames.map((modelName) => `${modelName}s`);
      const relationalFieldTypes = modelNames.concat(modelPluralNames);
      const conveyorSchema = modelTitles.map((modelTitle) => {
        const fieldNames = Object.keys(aiSchema[modelTitle].fields);
        // Extracts conveyor schema fields
        const compatibleFields = [];
        fieldNames.forEach((fieldName) => {
          // Gets rid of incompatible fields
          switch (fieldName) {
            case 'noEditField':
            case 'noViewField':
            case 'noViewField2':
              return;
            default:
              break;
          }
          // Sets compatible field meta data
          const currentField = aiSchema[modelTitle].fields[fieldName];
          let type = null;
          switch (currentField.type) {
            case 'string':
            case 'currency':
            case 'enum':
            case 'date':
            case 'boolean':
            case 'file':
            case 'creatable_string_select':
            case 'email':
            case 'phone':
            case 'text':
            case 'ID': {
              type = currentField.type;
              break;
            }
            default: {
              if (relationalFieldTypes.includes(currentField.fieldName)) {
                type = {
                  // FieldName is the closest representation to what type should be
                  name: currentField.fieldName.toLowerCase(),
                };
              }
            }
          }
          if (type) {
            const field = {
              name: String(fieldName),
              type,
              required: aiSchema[modelTitle].fields[fieldName].required,
            };
            compatibleFields.push(field);
          }
        });
        return {
          name: aiSchema[modelTitle].queryName,
          fields: compatibleFields,
        };
      });
      return { models: conveyorSchema };
    }

    const Conveyor = window.conveyor.Conveyor
    const request = window.conveyor.request

    // Fetcher to retrieve schema from endpoint
    const schemaUrl = '/api/schema';
    const schemaFetcher = async () => {
      const response = await fetch(schemaUrl);
      const remoteSchemaResponse = await response.json();
      return autoInventAdapter(remoteSchemaResponse.definitions);
    };
    // Fetcher to retrieve GraphQL query/mutation from endpoint
    const graphQLUrl = '/api/graphql';
    const graphqlFetcher = async (graphQLParams) => {
      const result = await request(
        graphQLUrl,
        graphQLParams.request,
        graphQLParams.variables,
      );
      return result;
    };

    ReactDOM.render(
      React.createElement(Conveyor, {
        schemaFetcher: schemaFetcher,
        gqlFetcher: graphqlFetcher,
      }),
      document.getElementById('conveyor'),
    );
  </script>
</body>
</html>
```

## Resources

- [Vite](https://github.com/vitejs/vite)
- [Airbnb JS Style Guide](https://github.com/airbnb/javascript)
- [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [Vitest Docs](https://vitest.dev/guide/features.html)
- [Testing Library Docs](https://testing-library.com/docs/)
