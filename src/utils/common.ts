import { ErrorMessage } from '../enums'

export const modelToQueryName = (modelName: string) => {
  return lowerCaseFirst(modelName)
}

export const queryToModelName = (queryName: string) => {
  return upperCaseFirst(queryName)
}

export const modelToModelListName = (modelName: string) => {
  if (!modelName) return ''
  return `${modelName}_list`
}

// As of now, the list form is the plural form; it will be changed
// to simply remove the word `List` after the modelName
export const modelListToModelName = (modelListName: string) => {
  if (!modelListName) return ''
  return modelListName.slice(0, -5)
}

export const humanizeText = (str: string) => {
  if (!str) return ''
  const separatedWords = str.replace(/(?=[A-Z][a-z])/g, ' ')
  return upperCaseFirst(separatedWords)
}

export const upperCaseFirst = (str: string) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const lowerCaseFirst = (str: string) => {
  if (!str) return ''
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export const parseResponseError = (error: any) => {
  let errorMessages = null
  if (typeof error?.message === 'string') {
    const matches = error.message.match(/\{".*\}/g)
    if (matches) {
      const parsedError = JSON.parse(matches[0])
      error = parsedError
    }
  }
  if (error?.response) {
    if (error.response?.status === 404) {
      errorMessages = [ErrorMessage.GQL_ENDPT_DNE]
    } else if (Array.isArray(error?.response?.errors)) {
      errorMessages = error.response.errors.map((err: any) => err.message)
    }
  }
  if (!errorMessages) {
    throw Error(ErrorMessage.UNKNOWN_ERROR + error.message)
  }
  return errorMessages
}

export const getFieldKeys = (fields: string[], keyFallbacks: string[], amt: number = 2) => {
  const keyFields: string[] = []
  keyFallbacks.forEach((key) => {
    if (fields.includes(key)) keyFields.push(key)
  })
  return keyFields.slice(0, amt)
}
