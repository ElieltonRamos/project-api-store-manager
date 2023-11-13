const HTTPCodeStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  CONFLICT: 409,
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
};

const mapStatusHTTP = (status) => HTTPCodeStatus[status] || 500;

module.exports = mapStatusHTTP;
