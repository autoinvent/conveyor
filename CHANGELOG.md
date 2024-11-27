## 1.8.2
- `feature`: `EnumInput` which accepts `options: string[]; value: string` and `EnumDisplay` to display the string[].
- `feature`: `SelectInput` can turn into a `Creatable` select by passing `isCreatable=true` to its props. 
- `feature`: defaults on selects to have `menuShouldBlockScroll` and `menuPortalTarget={document.body}`

## 1.8.1
- `feature`: Pagination per page select in not searchable anymore.
- `feature`: `ModelInput` now has default props for `clearValue, isClearable, closeMenuOnSelect` for when an array is passed as a value.
- `feature`: Added forward ref to `ModelDisplay`
- `ts`: `SelectInput` has correct typescript for its props.
- `bugfix`: `FormError` didn't appear when there was an error; fixed. 
- `bugfix`: `id` passed properly to input of `SelectInput`
- `storybook`: ModelIndexPage's first row bigger than the rest; fixed.

## 1.8.0
- `feature`: Shadcn Datetime input. 
- `feature`: Table now has per page options.
- `bugfix`: Table pads bottom properly when scrollbar exists.
- `bugfix`: `ModelDisplay` now shows `None` when it is an empty list.
- `bugfix`: `SelectInput` now matches rest of basic input's font size.
- `bugfix`: Now able to override `ModelFormContent`.
- `enhancement`: Import sorting using prettier.

## 1.7.0
`feature`: Combined `ModelListInput` and `ModelListDisplay` (as well as for the model item counterparts). Removed `selectoption` from `fieldOptions` due to `inputProps` being robust enough to do that and more.

## 1.6.0
- `package`: upgraded all packages.
- `feature`: added `inputProps` and `displayProps` to `FieldOptions` 
- `feature`: added `null/undefined` checks on inputs to default to the primitive type.
- `feature`: `ModelListDisplay` basic display component added. 
- `bugfix`: select input's ring color now using the `ring` css variable.
 
## 1.5.2 
- `bugfix`: Fixed `label` in `fieldOptions` not showing up on `ModelForm`.
- `enhancement`: Removed default `menuPortalTarget` prop from `SelectInput`.
- `enhancement`: Replaced `_display_value` with `displayValue` for consistent naming conventions. 

## 1.5.1
- `bugfix`: `SelectInput`'s options now allow any DataType for its options to utilize the `getOptionLabel` and `getOptionValue` props. The options passed into `fieldOptions` for `ModelTable/ModelForm` can be accessed from the form control by `selectoptions`. 

## 1.5.0
- `feature`: `CreatableSelectInput` exposes the `CreatableSelect` from **react-select**.
- `bugfix`: Table column resizing no longer affects other columns and work as intended.
- `bugfix`: When `onUpdate` for `ModelForm` and `ModelTable` is set to be undefined, hide the edit button.  

## 1.4.0
- `feature`: **react-select** now used under the hood for select components.
- `feature`: `ModelTable` can now be resized. 
- `feature`: `ModelTable`'s internal `ScrollAreaWrapper` and `BorderWrapper` classNames can now be accessed from `scrollable/bordered` props in  `tableOptions`
- `feature`: `ModelTable` and `ModelForm` now exposes main `UseFormProps` from **react-hook-form**.
  - This allows developers to configure the options for the form implemented under the hood for ModelTable and ModelForm. 
  - Default options are configured to have `mode="onSubmit"` and `criteriaMode="all"`. 
- `feature`: Action functions passed to ModelTable and ModelForm now contains onEdit and onEditCancel handlers to toggle between input and display modes; onEditCancel resets the form as well.  
- `removed`: `Loading` directory removed in usage of `isSubmitting` which can be accessed from react-hook-form. Spinner deemed unused and replaced with a lucide spinner icon inside of a button.
- `refactor`: `Form` no longer supports render functions; instead it utilizes radix UI Slots to pass form props to child input. 
  - Comes with `FormError`, `FormLabel`, and `FormControl`.
- `refactor`: `ModelTable` props moved around for ease of use. `data` is required as TableFallback no longer presents a spinner on undefined data. 
- `refactor`: `ModelForm` has been refactored in its entirety to utilize the new Form components. 

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