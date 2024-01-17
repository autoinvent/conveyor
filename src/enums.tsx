export enum ErrorMessage {
  GQL_ACTION_DNE = 'Unknown GQL action:',
  GQL_ENDPT_DNE = 'The graphql endpoint could not be reached.',
  INV_ADMIN_PAGE = 'Invalid page accessed.',
  INV_MODEL_ID = 'This model does not exist.',
  KEY_FALL_ERR = 'At least one key is needed in keyFallbacks.',
  NAVIGATE_DNE = 'navigate was not defined.',
  REDUCER_ACTION_DNE = 'Unkown reducer action:',
  REQUIRED_FIELD = 'is required.',
  UNKNOWN_ERROR = 'Unkown Error: ',
  USE_GQL_MUTATION_DNE = 'useGQLMutationRequest was not defined.',
  USE_GQL_QUERY_DNE = 'useGQLQueryResponse was not defined.',
}

export enum SuccessMessage {
  MODEL_CREATE = 'created successfully.',
  MODEL_DELETE = 'deleted successfully.',
  MODEL_UPDATE = 'saved successfully.',
}

export enum Defaults {
  RHK_MODE = 'onChange',
}

export enum Page {
  CREATE = 'Create',
  DETAIL = 'Detail',
  HOME = 'Home',
  INDEX = 'Index',
  SEARCH = 'Search'
}
