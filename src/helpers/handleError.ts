type ErrorType = {
  response?: { data: { error: string } }
  message: string
}

export const createErrorMessage = (err: ErrorType) => {
  const error = err.response
    ? err.response.data.error
    : err.message + ', more details in the console'
  return error
}
