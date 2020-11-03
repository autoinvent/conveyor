Schema Overview
---------------

*All schema information is determined by the back end unless otherwise noted

The schema utilized by the framework will be different than the existing schema and will look like::

  {
    <modelName>: {
      tabs: {} #See tab documentation, determined by Front end
      hasIndex: boolean #Whether the model should be included in an index page
      deletable: boolean or function #Whether the given field should be deletable
      creatable: boolean or function #Whether the given field should be creatable
      singleton: boolean #Whether this model is singleton (display one instance only)
      createFieldOrder: #List or a function that returns a list of the order that the create fields display
      indexFieldOrder: #List or a function that returns a list of the order that the index fields display
      detailFieldOrder: #List or a function that returns a list of the order that the detail fields display
      queryName: #Name of gql query that will return a single instance of the model
      queryAllName: #Name of gqlquery that will return all instances of the model
      queryRequired: #List of fields that must be present on the query
      modelName: #Name of model
      displayName: "" or function #Singular display name of model or function that calculates displayName, used on detail page
      displayNamePlural: "" or function #Plural display name of Model or function that calculates displayNamePlural, used on index page
      tableLinkField: "" #name of the field/column in a table that links to the detail page, a value of null means no link to the model should be displayed on a table
      displayField: "" or function #name of field that holds the data used to represent the instance when it is being displayed or referenced, defaults to "name" if left undefined, can also be a function that determines the value for any instance of the model
      fieldOrder: "" #List of ALL fields on a model in the order that they should be displayed on its own Detail and Index pages, also serves as a fall back if a different model is displaying this model without having specified the order in which the fields should be displayed.
      filterable: bool or func #Whether the given table should be filterable (can be set on field lvl as well)
      sortable: bool or func #Whether the given table should be sortable (can be set on field lvl as well)
      paginate: bool #if false, deactivates pagination for the model index table
      fields: {
        <fieldName>: {
          components: {
            cell: () => {} #Override the display component of model.field when displayed within a table, determined by Front end
            detail: () => {} #Override the display label and value of model.field when displayed on a detail page, determined by Front end
            detailLabel: () => {} #Override the display label of model.field when displayed on a detail page, determined by Front end
            detailValue: () => {} #Override the display value of model.field when displayed on a detail page, determined by Front end
            input: () => {} #Override the input component of model.field when editing, determined by Front end
            labelInfo: () => {} #the content to display in the popover when the label is clicked on
          }

          fieldName: "" #Name of the field, used as the key in fields dictionary
          fieldHelp: "" #Text to display under the field when it is being edited
          displayName: "" or function #Provides how the field should be displayed or function that calculates displayName
          noDataDisplayValue: "" or function #Value to display when a field has no data
          detailAttribute: boolean #Determines whether or not a field should display in the attribute or table section of a detail page
          type:  "" #When type is a string it provides the type of a simple type such as string, int, or date
          OR
          type: { #When type is an object is provides the type of a more complicated type such as relationship or enum
            type: "" # Database type of OneToOne, OneToMany, ManyToMany, or ManyToOne
            target: "" #modelName of the target of the relationship
            backref(formerly inverseSide): "" #name of relationship on the targets side
            tableFields: [] #List of fields on the target model to display when displaying a table on the detail page
          }
          choices: { #Dict of choice values to their labels
              'choice_value' : 'choice_label'
          }
          choiceOrder: [] #Order of 'choices' appearing in Enum field
          displayConditions: {
            detail: () => #A function that evaluates to true or false to determines if the field will display on a detail page
            index: () => #A function that evaluates to true or false to determines if the field will display in an index table
            create: () => #A function that evaluates to true or false to determine if the field will display on a create page
          },
          hideable: #bool; if table component can be hidden, have 'hide' button
          disabled: () => {} #bool or function #Whether field should be disabled or not,
          disabledDropDown: () => {} #function which filters out or disables drop down options,
          sortable: bool or func #Whether the given field should be sortable on tables (can be set on table lvl as well)
          filterable: bool or func #Whether the given field should be filterable on tables (can be set on table lvl as well)
          editable: boolean or function #Whether the given field should be editable
          showDetail: boolean or function #Whether the given field should be displayed on the detail page
          showIndex: boolean or function #Whether the given field should be displayed on the index page
          showCreate: boolean or function #Whether the given field should be displayed on the create page
          showTooltip: boolean or function #Whether the given field should be displayed on the tooltip
          queryIndex: boolean #Whether should be queried while fetching index page; by default the query will look at 'showIndex' prop but, if showIndex is false and queryIndex is true, will still query the field; used if you wish to have a field be available but NOT displaying for index
          queryDetail: boolean #Whether should be queried while fetching detail page; by default the query will look at 'showDetail' prop but, if showDetail is false and queryDetail is true, will still query the field; used if you wish to have a field be available but NOT displaying for detail
          virtualField: boolean #If set true, will deactivate the field from being queried so that no back end resolver needs to be created.
        }
      },
      //hold methods that will fire when certain events occur to fetch data for the related
      actions: {
        //holds methods that fire actions that fetch data for create pages
        create: {
        }
        edit: {
        }
        delete: {
        }
        list{
        }
        detail{
        },
      },
      //model level components
      components: {
        detail: () => {} // Detail override components (both title and page)
        detailTitle: () => {} // Detail Title override component
        detailPage: () => {} // Detail Page override components
        create: () => {} // Create override components (both title and page)
        createTitle: () => {} // Create Title override component
        createPage: () => {} // Create page override component
        index: () => {} // Index page override components (both title and page)
        indexTitle: () => {} Index title override component
        indexPage: () => {} // Index page override component
      }
    }
  }
