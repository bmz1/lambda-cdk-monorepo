# Turbo Lambda Project

This project is a monorepo containing multiple AWS Lambda functions and shared layers, managed using Turbo and AWS CDK.

## Project Structure

```plaintext
.
├── layers/
│   ├── logger/
│   │   ├── package.json
│   │   ├── scripts/
│   │   │   └── layers/logger/scripts/build-layer.ts
│   │   ├── src/
│   │   ├── tsconfig.json
│   │   └── tsconfig.tsbuildinfo
│   └── secret-manager/
│       ├── package.json
│       ├── scripts/
│       ├── src/
│       ├── tsconfig.json
│       └── tsconfig.tsbuildinfo
├── projects/
│   ├── lambda-1/
│   │   ├── .gitignore
│   │   ├── .npmignore
│   │   ├── bin/
│   │   │   └── projects/lambda-1/bin/projects.ts
│   │   ├── cdk.json
│   │   ├── function/
│   │   ├── jest.config.js
│   │   ├── lib/
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── tsconfig.json
│   │   └── tsconfig.tsbuildinfo
│   └── lambda-2/
│       ├── .gitignore
│       ├── .npmignore
│       ├── bin/
│       ├── cdk.json
│       ├── function/
│       ├── jest.config.js
│       ├── lib/
│       ├── package.json
│       ├── README.md
│       ├── tsconfig.json
│       └── tsconfig.tsbuildinfo
├── package.json
├── tsconfig.base.json
└── turbo.json

```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- AWS CLI configured with appropriate credentials

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### CDK Setup

1. Install AWS CDK globally if you haven't already:
    ```sh
    npm install -g aws-cdk
    ```

2. Bootstrap your AWS environment:
    ```sh
    cdk bootstrap
    ```

### Building the Project

To build the entire project, run:
```sh
npm run build
````

To deploy a specific lambda function, navigate to the respective directory and run:
### Deploying the Project

To deploy the entire project, run:

```sh
npm run build
````

### Deploying the Project

To deploy the entire project, run:

```sh
npm run deploy
```

## Useful Commands

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and compile
- `npm run test` - Run Jest unit tests
- `npx cdk deploy` - Deploy the stack to your default AWS account/region
- `npx cdk diff` - Compare deployed stack with current state
- `npx cdk synth` - Emit the synthesized CloudFormation template

## License

This project is licensed under the MIT License.
