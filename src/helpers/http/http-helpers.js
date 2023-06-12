const badRequest = (error) => ({
  statusCode: 400,
  body: error
})

const unauthorized = () => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

const forbidden = (error) => ({
  statusCode: 403,
  body: error
})

const notFound = (error) => ({
  statusCode: 404,
  body: error
})


const conflict = (error) => ({
  statusCode: 409,
  body: error
})


const serverError = (error) => ({
  statusCode: 500,
  body: (error.stack)
})

const ok = (data) => ({
  statusCode: 200,
  body: data
})

const noContent = () => ({
  statusCode: 204,
  body: null
})

module.exports = {
  badRequest,
  conflict,
  unauthorized,
  forbidden,
  serverError,
  ok,
  noContent,
  notFound,
}