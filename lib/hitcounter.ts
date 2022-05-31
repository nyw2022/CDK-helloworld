import {} from "aws-cdk-lib";
import { Code, IFunction, Runtime, Function } from "aws-cdk-lib/aws-lambda";
import { Table, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export interface HitCounterProps {
  // the function for which we want to count url hits
  downstream: IFunction;
}

export class HitCounter extends Construct {
  // allows public access to the counter function ?
  public readonly handler: Function;

  constructor(scope: Construct, id: string, props: HitCounterProps) {
    super(scope, id);
    const table = new Table(this, "Hits", {
      partitionKey: { name: "path", type: AttributeType.STRING },
    });

    this.handler = new Function(this, "HitCounterHandler", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset("lambda"),
      handler: "hitcounter.handler",
      environment: {
        DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
        HITS_TABLE_NAME: table.tableName,
      },
    });

    // grant the lambda role read/write permissions to out table
    table.grantReadWriteData(this.handler);

    // grant the lambda role invoke permissions to the downstream function (props)
    // so the hitcounter function has the permission to invoke the hello function ?
    props.downstream.grantInvoke(this.handler)
  }
}

// ## What's going on here
// We declared a new construct class called HitCounter.
// As usual, constructor arguments are scope, id and props, and we propagate them to the cdk.Construct base class.
// The props argument is of type HitCounterProps which includes a single property downstream of type lambda.IFunction. This is where we are going to “plug in” the Lambda function we created in the previous chapter so it can be hit-counted.

// ## Step 2
// We defined a DynamoDB table with path as the partition key.
// We defined a Lambda function which is bound to the lambda/hitcounter.handler code.
// We wired the Lambda’s environment variables to the functionName and tableName of our resources.
