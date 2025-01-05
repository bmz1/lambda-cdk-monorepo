import { APIGatewayProxyHandler } from 'aws-lambda';
import { logger } from '@layers/logger';

export const handler: APIGatewayProxyHandler = async (event) => {
  logger.info('Processing request', { event });

  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello from Lambda 1!',
        input: event,
      }),
    };
  } catch (error) {
    logger.error('Error processing request', { error });
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
      }),
    };
  }
};