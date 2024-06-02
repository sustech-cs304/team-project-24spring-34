/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorDetail:
 *       title: ErrorDetail
 *       additionalProperties: false
 *       required:
 *         - title
 *         - description
 *       type: object
 *       properties:
 *         title:
 *           title: Title
 *           type: string
 *         description:
 *           title: Description
 *           type: string
 *   responses:
 *     '400':
 *       description: Bad Request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorDetail'
 *     '401':
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorDetail'
 *     '403':
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorDetail'
 *     '404':
 *       description: Not Found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorDetail'
 *     '429':
 *       description: Too Many Requests
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorDetail'
 *     '500':
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorDetail'
 */
function getErrorDetail(statusCode) {
  switch (statusCode) {
    case 400:
      return {
        title: 'Bad Request',
        description: 'The request could not be understood by the server.',
      };
    case 401:
      return {
        title: 'Unauthorized',
        description: 'The request requires user authentication.',
      };
    case 403:
      return {
        title: 'Forbidden',
        description:
          'The server understood the request, but is refusing to fulfill it.',
      };
    case 404:
      return {
        title: 'Not Found',
        description:
          'The server has not found anything matching the request URI.',
      };
    case 429:
      return {
        title: 'Too Many Requests',
        description:
          'The user has sent too many requests in a given amount of time.',
      };
    case 500:
      return {
        title: 'Internal Server Error',
        description:
          'The server encountered an unexpected condition that prevented it from fulfilling the request.',
      };
    default:
      return {
        title: 'Error',
        description: 'An error occurred.',
      };
  }
}

/**
 * Function to get a response object based on the status code and options provided.
 * @param {number} statusCode - The HTTP status code.
 * @param {{description: string}} options - The options for customizing the response.
 * @param {string} options.title - The title for the response. If not provided, the default title for the status code will be used.
 * @param {string} options.description - The description for the response. If not provided, the default description for the status code will be used.
 * @returns {Object} The response object.
 */
function getResponse(statusCode, options = {}) {
  const errorDetail = getErrorDetail(statusCode);
  return {
    statusCode,
    title: options.title ?? errorDetail.title,
    description: options.description ?? errorDetail.description,
  };
}

module.exports = getResponse;
