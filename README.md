# CDK-helloworld

<!-- https://cdkworkshop.com/20-typescript/50-table-viewer.html -->

# How it works:

data flow:
client => api gateway => hitcounter => ddb +1 event path => hello => hitcounter => api gateway => client

hitcounter lambda function:

- Makes a add update item call to DDB
- passes the api call event down to the hello lambda (downstream)

hello lambda function:

- takes the event object from hitcounter
- responds with an promise which hitcounter will proxy back to client.

1. bin/cdk-helloworld.ts (creates the app stack)

   - Nothing special, like an index.js in React

2. hitcounter.ts (creates a Construct class, like an npm package you can share)

   - using cdk lib we defined the DDB table
   - also defined the hitcounter function/handler/env, gave public read access to the hitcounter function
   - grants read write permissions to ddb table
   - grants the hitcounter function invoke permissions to invoke the hello function

3. cdk-helloworld-stack (creates the cloud formation stack)
   - defines the hello function/handler here
   - imports hitcounter Construct and passed the hello function as a prop into the hitcounter Construct
   - Defined the LambdaRestApi and passed the

## Useful commands

- `npm run watch` live typescript to js
- `cdk watch` hot reload watching code/stack changes
- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
