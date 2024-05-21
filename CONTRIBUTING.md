### File Heirarchy: Grouped by feature

- Create a directory for a new feature or add onto an already existing feature directory
- Create an index.ts file to export all named exports: Order by groups i.e. components, hooks, types

### Exports: Named Exports Only

- Keeping things simple, no default exports since Prop Interfaces/Types can be exported as well from same file

### Imports: Libraries/API > src code > Feature Directory

- Group imports where Libraries start at the top, project src code starting with '@/' as it is a named alias for 'src/', and lastly files that exists within the current directory
- Alphabetize named imports and import location per group.
