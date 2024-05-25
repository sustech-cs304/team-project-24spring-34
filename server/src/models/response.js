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
 */

/**
 * @swagger
 * components:
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
const responses = {
  400: {
    description: 'Bad Request',
    content: {
      'application/json': {
        schema: {
          title: 'ErrorDetail',
          additionalProperties: false,
          required: ['title', 'description'],
          type: 'object',
          properties: {
            title: {
              title: 'Title',
              type: 'string',
              default: 'Bad Request',
            },
            description: {
              title: 'Description',
              type: 'string',
              default: 'The request is invalid.',
            },
          },
        },
      },
    },
  },
  401: {
    description: 'Unauthorized',
    content: {
      'application/json': {
        schema: {
          title: 'ErrorDetail',
          additionalProperties: false,
          required: ['title', 'description'],
          type: 'object',
          properties: {
            title: {
              title: 'Title',
              type: 'string',
              default: 'Unauthorized',
            },
            description: {
              title: 'Description',
              type: 'string',
              default: 'The request requires user authentication.',
            },
          },
        },
      },
    },
  },
  403: {
    description: 'Forbidden',
    content: {
      'application/json': {
        schema: {
          title: 'ErrorDetail',
          additionalProperties: false,
          required: ['title', 'description'],
          type: 'object',
          properties: {
            title: {
              title: 'Title',
              type: 'string',
              default: 'Forbidden',
            },
            description: {
              title: 'Description',
              type: 'string',
              default:
                'The server understood the request, but is refusing to fulfill it.',
            },
          },
        },
      },
    },
  },
  404: {
    description: 'Not Found',
    content: {
      'application/json': {
        schema: {
          title: 'ErrorDetail',
          additionalProperties: false,
          required: ['title', 'description'],
          type: 'object',
          properties: {
            title: {
              title: 'Title',
              type: 'string',
              default: 'Not Found',
            },
            description: {
              title: 'Description',
              type: 'string',
              default: 'The requested resource could not be found.',
            },
          },
        },
      },
    },
  },
  429: {
    description: 'Too Many Requests',
    content: {
      'application/json': {
        schema: {
          title: 'ErrorDetail',
          additionalProperties: false,
          required: ['title', 'description'],
          type: 'object',
          properties: {
            title: {
              title: 'Title',
              type: 'string',
              default: 'Too Many Requests',
            },
            description: {
              title: 'Description',
              type: 'string',
              default:
                'The user has sent too many requests in a given amount of time.',
            },
          },
        },
      },
    },
  },
  500: {
    description: 'Internal Server Error',
    content: {
      'application/json': {
        schema: {
          title: 'ErrorDetail',
          additionalProperties: false,
          required: ['title', 'description'],
          type: 'object',
          properties: {
            title: {
              title: 'Title',
              type: 'string',
              default: 'Internal Server Error',
            },
            description: {
              title: 'Description',
              type: 'string',
              default: 'An unexpected condition was encountered.',
            },
          },
        },
      },
    },
  },
};

/**
 * Function to get a response object based on the status code and options provided.
 * @param {number} statusCode - The HTTP status code.
 * @param {Object} options - The options for customizing the response.
 * @param {string} options.title - The title for the response. If not provided, the default title for the status code will be used.
 * @param {string} options.description - The description for the response. If not provided, the default description for the status code will be used.
 * @returns {Object} The response object.
 */
function getResponse(statusCode, options = {}) {
  const response = {...responses[statusCode]};
  const {properties} = response.content['application/json'].schema;

  properties.title.default = options.title || properties.title.default;
  properties.description.default =
    options.description || properties.description.default;

  return response;
}

module.exports = getResponse;
