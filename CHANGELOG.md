### General
- @tanstack/store -> zustand due to @tanstack/store being in beta still (v0)
- StoreProviders now do most of the heavy lifting in terms of setting up the internal store
- hooks for internal store is renamed from `use[Component]` to `use[Component]Store`

### Models

#### Conveyor:
- The features that the `Conveyor` component provided for the ConveyorAdmin repo has been moved to the `ConveyorAdmin` component.
- `Conveyor` in this repo acts as a global store to add special overriding/customizing capabilities over Model components:
  - `inputOptions/valueOptions`: Allows for display input overriding based off of field types. This allows for a developer to make quick changes for specific field types such as Model types or any of the Scalar types so that expanding Model components is not needed. Customizing by component expansion over rules this option. 
  - **Example**: Suppose you have 20 ModelIndex's where all String type fields need to have specific padding or margins. Instead of having to expand each table just to add a padding/margin, a developer can wrap the 20 tables with the `Conveyor` component and specify the inputOptions/valueOptions props to make those changes. Also, Conveyor can be placed within itself to stylize a subset of the 20 tables to have a different style/feature/component.    

#### ModelIndex:
- When focused on an input in edit mode, the `Escape` key can be pressed to go back to display mode.
- `onOpenFieldSelect` prop removed due to it providing a too fine-grained solution to overriding Model select input fields. 
  - Assumes that users want to create options for select when the onOpenSelect event is fired. 
  - Feels restrictive in the sense that the special select input provided is expected to be used instead of overriding the actual field through expansion with a custom select input.
  - The Model type field cell as a whole can now be modified by replacing the Model inputOption in the new Conveyor component. 

### Commons
#### Slots:
  - `slotOrder` prop renamed to `slotKeys` for better distinction
  - Internal slot management changed to be more efficient and clear.
#### Form:
  - The `ModelFormInput`, `ModelFormValue` components from `ModelForm` have been abstracted away from Conveyor to be used as a common component that can be used outside the scope of Conveyor.
  - All components under `Form` is just an implementation of react-hook-form  to fit the styling/conventions of Conveyor for consistency.
  - Everything related to react-hook-form can be found under Form to make it easier to replace if needed in the future. 
#### Loading:
- Removed as it was a future component to be explored but crawled its way into Conveyor v1.

