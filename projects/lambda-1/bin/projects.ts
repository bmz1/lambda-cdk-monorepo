#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Lambda1Stack } from '../lib/lambda-1-stack';

const app = new cdk.App();
new Lambda1Stack(app, 'Lambda1Stack');