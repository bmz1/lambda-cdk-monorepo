// projects/lambda2/src/index.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { secretsManager } from '@layers/secret';

interface APIConfig {
  endpoint: string;
  apiKey: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    // Example: Get API configuration from Secrets Manager
    const apiConfig = await secretsManager.getSecretJSON<APIConfig>('api/config');
    
    if (!apiConfig) {
      throw new Error('API configuration not found');
    }

    // Here you would use the apiConfig to make API calls
    // But we'll just return a sanitized response
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'API configuration retrieved',
        endpoint: apiConfig.endpoint 
      })
    };
    
  } catch (error) {
    console.error('Error in handler:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Internal server error'
      })
    };
  }
};