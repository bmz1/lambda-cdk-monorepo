import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class Lambda1Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const loggerLayer = new lambda.LayerVersion(this, 'LoggerLayer', {
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../../../layers/logger/layer')
      ),
      compatibleRuntimes: [lambda.Runtime.NODEJS_18_X],
      description: 'Logger Layer',
    });

    // Create Lambda function
    const lambdaFunction = new NodejsFunction(this, 'Lambda1Function', {
      entry: path.join(__dirname, '../function/handler.ts'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      layers: [loggerLayer],
      bundling: {
        externalModules: [
          'aws-sdk',
          "winston",
          '@layers/logger'
        ],
      },
    });

    new cdk.CfnOutput(this, 'LambdaFunctionArn', {
      value: lambdaFunction.functionArn,
      description: 'ARN of the Lambda function',
      exportName: 'Lambda1FunctionArn',
    });
  }
}
