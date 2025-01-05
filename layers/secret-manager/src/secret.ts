import { 
  SecretsManagerClient, 
  GetSecretValueCommand,
  GetSecretValueCommandInput 
} from "@aws-sdk/client-secrets-manager";

export class SecretsManager {
  private client: SecretsManagerClient;

  constructor() {
    this.client = new SecretsManagerClient({ region: process.env.AWS_REGION });
  }

  async getSecret(secretId: string): Promise<string | undefined> {
    try {
      const input: GetSecretValueCommandInput = {
        SecretId: secretId,
      };

      const command = new GetSecretValueCommand(input);
      const response = await this.client.send(command);
      
      return response.SecretString;
    } catch (error) {
      console.error('Error retrieving secret:', error);
      throw error;
    }
  }

  async getSecretJSON<T>(secretId: string): Promise<T | undefined> {
    const secretString = await this.getSecret(secretId);
    if (secretString) {
      try {
        return JSON.parse(secretString) as T;
      } catch (error) {
        console.error('Error parsing secret as JSON:', error);
        throw error;
      }
    }
    return undefined;
  }
}

export const secretsManager = new SecretsManager();