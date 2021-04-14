#Conveyor Changelog

## Unreleased

Add classNames to common components Issue #13
Refactor, added NullComponent branched lists to own branches
Move styling from inside react components to the css
Fix extra columns being generated in the DeleteDetail tables

## Version 0.6.0

Released 3-10-21

Add DateTime input type


## Version 0.5.0

Released 1-26-21

Added noDataDisplayValue to fields, which displays custom values when there is no data
Added Alerts component
Added ability to turn off pagination on model or detail level
Added a prop noDataDisplayString that allows user to customize the string that displays when a field has no data
Fix disappearing select options, broken initialOffset


## Version 0.4.0

Released 9-15-20

Corrected redirect logic for empty detail page
Added spellCheck to input types: String, TextArea
Added print button to ImageModal
Added EXISTS and DOESNOTEXIST string operators for the filter
Fixed CollapseTableIcon being set to FaAngleDown instead of FaAngleRight when collapsed
Removed href=# (anchor to top of page) from PaginationLink


## Version 0.3.0

Released 3-22-20

Updated pagination to start at index 1; updated tableView structure (not backwards compatible change)


## Version 0.2.0

Released 3-4-20

Extracted helper functions into conveyor-schema library (not backwards compatible change)


## Version 0.1.0

Released 2-25-20

Initial public version