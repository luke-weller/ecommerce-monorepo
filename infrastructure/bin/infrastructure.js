const cdk = require('aws-cdk-lib');
const { DatabaseStack } = require('../lib/database-stack');

const app = new cdk.App();

// Test environment
new DatabaseStack(app, 'TestDatabaseStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  tableNamePrefix: 'Test',
});

// Production environment
new DatabaseStack(app, 'ProdDatabaseStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  tableNamePrefix: 'Prod',
});
