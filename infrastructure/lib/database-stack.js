const { Stack, Duration, aws_ec2, RemovalPolicy } = require('aws-cdk-lib');
const {
  Table,
  AttributeType,
  BillingMode,
  TableEncryption,
} = require('aws-cdk-lib/aws-dynamodb');

class DatabaseStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const vpc = new aws_ec2.Vpc(this, 'EcommerceVPC');

    const database = new Table(this, 'EcommerceDatabase', {
      tableName: 'ecommerce',
      partitionKey: { name: 'id', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
      encryption: TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      timeToLiveAttribute: 'ttl',
      vpc,
    });

    // Add tables
    const cartTable = new Table(this, 'CartTable', {
      tableName: 'cart',
      partitionKey: { name: 'id', type: AttributeType.STRING },
      sortKey: { name: 'user_id', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
      encryption: TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      timeToLiveAttribute: 'ttl',
      vpc,
    });

    const cartItemsTable = new Table(this, 'CartItemsTable', {
      tableName: 'cart_items',
      partitionKey: { name: 'id', type: AttributeType.STRING },
      sortKey: { name: 'cart_id', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
      encryption: TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      timeToLiveAttribute: 'ttl',
      vpc,
    });

    const categoriesTable = new Table(this, 'CategoriesTable', {
      tableName: 'categories',
      partitionKey: { name: 'id', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
      encryption: TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      timeToLiveAttribute: 'ttl',
      vpc,
    });

    const orderItemsTable = new Table(this, 'OrderItemsTable', {
      tableName: 'order_items',
      partitionKey: { name: 'id', type: AttributeType.STRING },
      sortKey: { name: 'order_id', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
      encryption: TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      timeToLiveAttribute: 'ttl',
      vpc,
    });

    const ordersTable = new Table(this, 'OrdersTable', {
      tableName: 'orders',
      partitionKey: { name: 'id', type: AttributeType.STRING },
      sortKey: { name: 'user_id', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
      encryption: TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      timeToLiveAttribute: 'ttl',
      vpc,
    });

    const productsTable = new Table(this, 'ProductsTable', {
      tableName: 'products',
      partitionKey: { name: 'id', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
      encryption: TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      timeToLiveAttribute: 'ttl',
      vpc,
    });

    const usersTable = new Table(this, 'UsersTable', {
      tableName: 'users',
      partitionKey: { name: 'id', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
      encryption: TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      timeToLiveAttribute: 'ttl',
      vpc,
    });
  }
}

module.exports = { DatabaseStack };
