import * as cdk from 'aws-cdk-lib';
import { Lambda2Stack } from '../lib/lambda-2-stack';

const app = new cdk.App();
new Lambda2Stack(app, 'Lambda2Stack');
