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
    - Feels restrictive to the special select input provided.
    - The Model type field cell as a whole can now be modified by replacing the Model inputOption in the new Conveyor component. 

### Commons
#### Slots:
   - `slotOrder` prop renamed to `slotKeys` for better distinction
   - Internal slot management changed to be more efficient and clear.