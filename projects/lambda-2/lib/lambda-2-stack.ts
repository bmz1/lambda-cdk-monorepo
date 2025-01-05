import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class Lambda2Stack extends cdk.Stack {
  public readonly lambdaArn: string;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const secretsLayer = new lambda.LayerVersion(this, 'SecretsLayer', {
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../layers/secret-manager/layer')),
      compatibleRuntimes: [lambda.Runtime.NODEJS_18_X],
      description: 'Secret Layer',
    });

    // Create Lambda function
    const lambdaFunction = new NodejsFunction(this, 'Lambda2Function', {
      entry: path.join(__dirname, '../function/handler.ts'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      layers: [secretsLayer],
      bundling: {
        externalModules: [
          'aws-sdk',
          '@layers/secret',
          '@aws-sdk/client-secrets-manager'
        ],
      },
    });

    // Add Secrets Manager permissions
    lambdaFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['secretsmanager:GetSecretValue'],
        resources: ['*'], // Consider restricting to specific secrets ARNs
      })
    );

    // Store the Lambda ARN
    this.lambdaArn = lambdaFunction.functionArn;

    // Create CloudFormation outputs
    new cdk.CfnOutput(this, 'LambdaFunctionArn', {
      value: lambdaFunction.functionArn,
      description: 'ARN of the Lambda2 function',
      exportName: 'Lambda2FunctionArn',
    });
  }
}