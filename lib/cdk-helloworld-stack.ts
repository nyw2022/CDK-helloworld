import { App, Stack, StackProps } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";

export class CdkHelloworldStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloWorld = new Function(this, "HelloHandler", {
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset("lambda"), // file path
      handler: "hello.handler", // handler
    });

    new LambdaRestApi(this, "Endpoint", {
      handler: helloWorld,
    });
  }
}
