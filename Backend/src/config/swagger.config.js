const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hotel Reservation System API',
      version: '1.0.0',
      description: 'A comprehensive API for hotel reservation system with booking, payments, reviews, and more',
      contact: {
        name: 'API Support',
        email: 'support@hotelreservation.com',
      },
      license: {
        name: 'ISC',
      },
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://api.hotelreservation.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            message: {
              type: 'string',
            },
            error: {
              type: 'object',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
            phone: {
              type: 'string',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin', 'hotel_owner'],
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Hotel: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            address: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            country: {
              type: 'string',
            },
            rating: {
              type: 'number',
              format: 'float',
            },
            ownerId: {
              type: 'integer',
            },
          },
        },
        Room: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            hotelId: {
              type: 'integer',
            },
            roomNumber: {
              type: 'string',
            },
            type: {
              type: 'string',
              enum: ['single', 'double', 'suite', 'deluxe'],
            },
            price: {
              type: 'number',
              format: 'float',
            },
            capacity: {
              type: 'integer',
            },
            available: {
              type: 'boolean',
            },
          },
        },
        Booking: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            userId: {
              type: 'integer',
            },
            roomId: {
              type: 'integer',
            },
            checkInDate: {
              type: 'string',
              format: 'date',
            },
            checkOutDate: {
              type: 'string',
              format: 'date',
            },
            totalPrice: {
              type: 'number',
              format: 'float',
            },
            status: {
              type: 'string',
              enum: ['pending', 'confirmed', 'cancelled', 'completed'],
            },
          },
        },
        Payment: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            bookingId: {
              type: 'integer',
            },
            amount: {
              type: 'number',
              format: 'float',
            },
            method: {
              type: 'string',
              enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
            },
            status: {
              type: 'string',
              enum: ['pending', 'completed', 'failed', 'refunded'],
            },
            transactionId: {
              type: 'string',
            },
          },
        },
        Review: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            userId: {
              type: 'integer',
            },
            hotelId: {
              type: 'integer',
            },
            rating: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
            },
            title: {
              type: 'string',
            },
            comment: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
      responses: {
        Success: {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  message: {
                    type: 'string',
                  },
                  data: {
                    type: 'object',
                  },
                },
              },
            },
          },
        },
        BadRequest: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        Unauthorized: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        NotFound: {
          description: 'Not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        InternalError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: 'Auth',
        description: 'Authentication endpoints',
      },
      {
        name: 'Users',
        description: 'User management endpoints',
      },
      {
        name: 'Hotels',
        description: 'Hotel information endpoints',
      },
      {
        name: 'Rooms',
        description: 'Room management endpoints',
      },
      {
        name: 'Bookings',
        description: 'reservationmanagement endpoints',
      },
      {
        name: 'Payments',
        description: 'Payment processing endpoints',
      },
      {
        name: 'Reviews',
        description: 'Review management endpoints',
      },
      {
        name: 'Facilities',
        description: 'Facility information endpoints',
      },
      {
        name: 'Notifications',
        description: 'Notification management endpoints',
      },
      {
        name: 'Chat',
        description: 'Chat messaging endpoints',
      },
      {
        name: 'Dashboard',
        description: 'Dashboard analytics endpoints',
      },
      {
        name: 'Test',
        description: 'Test endpoints for JWT protection validation',
      },
      {
        name: 'Admin',
        description: 'Admin-only management endpoints',
      },
    ],
  },
  apis: [
    './src/modules/**/*.routes.js',
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
