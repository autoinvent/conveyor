# Outline

- [Model Pages](#model-pages)
- [Model Components](#model-components)
- [Common Components](#common-components)

## Model Pages

- [Admin UI](#admin-ui)
- [Create Page](#create-page)
- [Index Page](#index-page)
- [Detail Page](#detail-page)

### Admin UI

#### Basic Usage

```TSX
    <ConveyorAdmin {...props} />
```

#### Custom Usage

```TSX
    <!-- Base Provider that Conveyor Components needs to work -->
    <ConveyorProvider {...props }>
            <ConveyorAdminContent {...props} />
    </ConveyorProvider>
```

### Create Page

#### Basic Usage

```TSX
    <ModelCreate {...props} />
```

#### Custom Usage

```TSX
    <div>
        <div>
            <h1></h1>
        </div>
        <!-- Part of Model Components -->
        <ModelCreateForm {...props}>
            { props.fields.map((field) => (
                <label>
                    <!-- Part of Model Components -->
                    <ModelFormInput {...props}/>
                </label>
            ))}
            <!-- Part of Model Components -->
            <ModelCreateCrud {...props} />
        </ModelCreateForm>
    </div>
```

### Index Page

#### Basic Usage

```TSX
    <ModelIndex {...props} />
```

#### Custom Usage

```TSX
    <!-- Sets up initial tableView -->
    <ModelIndex>
        <div>
            <h2></h2>
        </div>
        <!-- Part of Model Components -->
        <ModelIndexTable {...props} />
    </ModelIndex>
```

### Detail Page

#### Basic Usage

```TSX
    <ModelDetail {...props} />
```

#### Custom Usage

```TSX
    <div>
        <!-- Part of Model Components -->
        <ModelForm {...props}>
            <div>
                <h2></h2>
                <!-- Part of Model Components -->
                <ModelDetailCrud {...props} >
            </div>
            <dl>
            { props.fields.map((field) => (
                <dt></dt>
                <!-- Part of Model Components -->
                <dd><ModelFormField/></dd>
            ))}
            </dl>
        </ModelForm>
        {relatedManyFields.map(field => (
            <details>
                <summary><h4></h4></summary>
                <!-- Part of Model Components -->
                <ModelDetailTable />
            </details>
        ))}
    </div>
```

## Model Components

The basic usage for most of these components do not accept children.
The word wrapper in the description indicates that the component must have a child. More complex components will have a basic and custom usage below. A link to the usages for the complex components is provided on the component name.

- `Alert` - Displays any active alerts set; to be used once in the top level component under `ConveyorProvider`
- `ConveyorProvider` - Wrapper to provide necessary contexts that `Page Components` and `Model Components`
- `ModelCreateCrud` - Implements `ModelFormCrud` for Create page.
- `ModelCreateForm` - Implements `ModelForm` for Create page.
- `ModelDetailCrud` - Implements `ModelFormCrud` for Detail page.
- `ModelDetailTable` - Implements `ModelTable` for Detail page's tables.
- `ModelDetailTableCrud` - Implements `ModelFormCrud` for Detail page table's cruds.
- `ModelForm` - Wrapper to provide react-hook-form, loading, and display mode contexts
- `ModelFormCrud` - Uses loading and display mode contexts to display the appropriate crud button(s)
- `ModelFormField` - Selector that selects the appropriate display for a model's field; displays either `ModelFormInput`, `ModelFormValue`, or a passed `displayValueFn` in the `fieldData` property.
- `ModelFormInput` - Determines the input type and use connects to reach-hook-form
- `ModelFormValue` - Determines display value for a model's field data
- [ModelTable](#modeltable)
- `ModelTableCrud` - Implements `ModelFormCrud` for table usage
- `ModelTableHeader` - `th` tag that enables sorting if set.
- `ModelTablePagination` - Uses tableviews context to create pagination buttons for an Index page's table.
- [ModelTableRow](#modeltablerow) - Implements `ModelForm` for table rows.
- `ModelNav` - Wrapper to make it's children use navigate contexts when clicked on.

### ModelTable

#### Basic Usage

```TSX
    <ModelTable {...props} />
```

#### Custom Usage

```TSX
    <table>
        <thead>
            <tr>
                { props.fields.map((field) => (
                    <!-- Part of Model Components -->
                    <ModelTableHeader {...props} />
                ))}
            </tr>
        </thead>
        <tbody>
            { props.fields.map((field) => (
                <!-- Part of Model Components -->
                <ModelTableRow {...props} />
            ))}
        </tbody>
    </table>
```

### ModelTableRow

#### Basic Usage

```TSX
    <ModelTableRow {...props} />
```

#### Custom Usage

```TSX
    <!-- Part of Model Components -->
    <ModelForm>
        <tr>
            { props.fields.map((field) => (
                <!-- Part of Model Components -->
                <td><ModelFormField {...props} /></td>
            ))}
            <!-- Part of Model Components -->
            <td><ModelTableCrud /></td>
        </tr>
    </ModelForm>
```

## Common Components

- Checkbox
- ErrorList
- FlexibleInput
- Loading
- LoadingButtonGroup

## NOTES:

- ConveyorAdmin will deafult to 'id' as the primarykey; if 'id' does not exist and the default primary key is not overriden, errors will occur
- ConveyorAdmin will query for ${modelname}\_item to find models.
- required field may not be necessary as it can be inferred from type
- fields -> fieldNames? to stay consistent with modelName
