## 1.11.0
`feature`: `FieldVisibility` now accepts the `children` prop to allow a custom dropdown button.
`feature`: `EnumInput` can now be passed options of of type `SelectOption | string` for more customizability. 
`feature`: Enhanced the way to customize actions for `ModelForm` and `ModelTable`. Can alter the underlying button by the `actionOptions.actionProps` prop or by expanding the model component down to its primitive components: `EditAction, CancelEditAction, SubmitAction, DeleteAction`.  

## 1.10.2
`bugfix`: Fixed delay on form values populating `FormDisplay`.
`upgrade`: react-hook-form@7.54.2

## 1.10.1
`bugfix`: z-index of select components were using `react-select`'s default z-index and not the override version. 

## 1.10.0
- `feature`: Can now set which rows are "selected" to trigger its selected-row background color. 
- `bugfix`: Table resizing now does not allow you to go less than the content width for a brief moment
- `bugfix`: No more default widths set, now uses the default behavior of the auto growing behavior of a table column to fit to the width of the table. 
- `bugfix`: Fixed `snakeToCamelCase` to accept numbers.
- `bugfix`: `EnumInput` can now support multi values.
- `cleanup`: Several default props moved to base `SelectInput` component.
- `stories`: Added stories for `EnumInput, ModelInput, SelectInput`
- `typescript`: Fixed typings on `EnumInput.value` and `SelecInput.props`
- `css`: Set z-index 20 to `SelectInput`.
- `css`: Add scrollbar to `FieldVisibility`.
- `packages`: Upgraded `react-select@5.9.0`



## 1.9.4
- `css`: Sticky action column now works on chrome.

## 1.9.3
- `css`: Sticky action column + header
- `css`: Scrollbar for select inputs are now consistent with Shadcn
- `bugfix`: `BooleanDisplay` can now handle null values.
- `bugfix`: `NumberInputs` can now be empty. 

## 1.9.2
- `bugfix`: ModelSelect was always in creatable select mode; fixed. Fixed typings for ModelSelect to support creatable.
- `css`: Consistent styling for select-inputs
- `css`: Consistent datetime input dimensions. 
- `css`: Removed z-index from scrollbar.
- `packages`: Updated `react-day-picker` and `cross-spawn`

## 1.9.1
- `feature`: `ModelDisplay` now accepts `noneValue` which is the display to show when the value is either an empty array, null, or undefined. 

## 1.9.0
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