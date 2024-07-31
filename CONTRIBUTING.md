## Development Environment
Do the following to set up your development environment. 
```bash
  git clone "[YOUR-FORKED-CONVEYOR-REPO]"
  git checkout dev
  pnpm install
  git checkout -b "[NEW-DEV-BRANCH-NAME]"
```

## Naming the branch
1. Prefix the branch with one of the labels below; if your PR does not fit any of the following, feel free to make an PR:
   - `feature`: PR to add a new feature (can include bugfixes as a side effect)
   - `css`: PR to improve or fix styling
   - `story`: PR to add a story to storybook
   - `bugfix`: PR to fix a bug without changing the underlying feature
   - `cleanup`: PR to cleanup the repo (linting, console log removals, etc... )
   - `docs`: PR to improve documentation
2. Keep the branch name simple and concise; 3 words max if possible; lowercase.
3. Here are some examples of how the branch would be labeled:
   - `feature-modelindex-sort`
   - `feature-modelcheckdelete`
   - `story-table-column-visibility`
   - `docs-branch-name-prefix`
4. When making a PR the title of your PR should be the same as your branch name separated by space instead of hyphens as well as proper casing and a colon after the prefix label:
   - `Feature: ModelIndex Sort`

## File Heirarchy: Grouped by feature

- Create a directory for a new feature or add onto an already existing feature directory
- Create an index.ts file to export all named exports: Order by groups i.e. components, hooks, types

## Exports: Named Exports Only

- Keeping things simple, no default exports since Prop Interfaces/Types can be exported as well from same file

## Imports: Libraries/API > src code > Feature Directory

Group imports where:
- 3rd party libraries/packages start at the top
  - scoped packages below non-scroped packages
- Any project src code starting with '@/' as it is a named alias for 'src/'
- Lastly files that exists within the current directory

