import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class CdkVpcProjectStack extends cdk.Stack {
  public readonly vpc : ec2.Vpc;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkVpcProjectQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    this.vpc = new ec2.Vpc(this, 'MyVPC', {
        maxAzs : 2 ,
        subnetConfiguration : [
            {
                name : 'Public',
                subnetType : ec2.SubnetType.PUBLIC,
                cidrMask: 24
            },
            {
                name : 'Private',
                subnetType : ec2.SubnetType.PRIVATE_ISOLATED,
                cidrMask: 24
            },
            {
                name : 'Database',
                subnetType : ec2.SubnetType.PRIVATE_ISOLATED,
                cidrMask: 24
            }
        ]
    })

    new cdk.CfnOutput(this, 'VpcId', {
        value : this.vpc.vpcId,
        description: 'VPC ID'
    })
  }
}
