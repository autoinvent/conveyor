## 1.3.0
- `story`: Table column DnD story added under Table > TableGuide 
- `bufix`: `SearchResult.extra` was supposed to be optional per magql-sqlalchemy docs
- `backlog`: `ModelIndexSortSetting` is backlogged until it becomes more customizable. 

## 1.2.0 🎉
- `feature`: Added `ModelFilter`; A basic filters UI for ModelIndex that can be customized.
- `feature`: Added `ModelCheckDelete`; A basic delete confirmation UI. [#5](https://github.com/autoinvent/conveyor/issues/5)
- `cleanup`: Removed `useTableView` due to just being a useState for tableView with minor functionality. (reduces the amount to know about this repo)