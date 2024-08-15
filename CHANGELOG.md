## 1.4.0
- `feature`: **react-select** now used under the hood for select components.
- `feature`: `ModelTable` can now be resized. 
- `feature`: `ModelTable`'s internal `ScrollAreaWrapper` and `BorderWrapper` classNames can now be accessed from `scrollable/bordered` props in  `tableOptions`
- `refactor`: `LoadingProvider` removed in usage of `isSubmitting` which can be accessed from react-hook-form. 
- `refactor`: `Form` no longer supports render functions; instead it utilizes radix UI Slots to pass form props to child input. 

## 1.3.1
- `bugfix`: Pagination className typescript error fixed. 
- `css`: Added default padding around pagination and padding to last row of `ModelTable` when overflown.

## 1.3.0
- `feature`: `ModelTable` can now make columns visible or not based off of toggles.
- `feature`: `ModelTable: columnOptions` have `hidden: boolean` prop to hide columns completely and cannot be made visible. 
- `story`: Table column DnD story added under Table > TableGuide 
- `typescript`: `SearchResult.extra` was supposed to be optional per magql-sqlalchemy docs
- `typescript`: Extra type safety on `ModelTable`'s `columnOptions` based off of `fields` prop.
- `bugfix`: Escape key press now resets table row form. 
- `css`: Buttons spacing in `ModelTable` and `ModelForm`
- `backlog`: `ModelIndexSortSetting` is backlogged until it becomes more customizable. 

## 1.2.0 🎉 
- `feature`: Added `ModelFilter`; A basic filters UI for ModelIndex that can be customized.
- `feature`: Added `ModelCheckDelete`; A basic delete confirmation UI. [#5](https://github.com/autoinvent/conveyor/issues/5)
- `cleanup`: Removed `useTableView` due to just being a useState for tableView with minor functionality. (reduces the amount to know about this repo)