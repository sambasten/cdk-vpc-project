import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

interface EC2StackProps extends cdk.StackProps {
    vpc : ec2.Vpc;
}
export class EC2Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: EC2StackProps) {

        super(scope, id, props);

        const privinstance1 = new ec2.Instance(this, 'MyPrivateEC2-AZ1', {
            vpc : props.vpc,
            vpcSubnets: {
                availabilityZones:[props.vpc.availabilityZones[0]],
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED
            },
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
        })
        cdk.Tags.of(privinstance1).add('Name', 'MyPrivateEC2-AZ1')

        const privinstance2 = new ec2.Instance(this, 'MyPrivateEC2-AZ2', {
            vpc : props.vpc,
            vpcSubnets: {
                availabilityZones: [props.vpc.availabilityZones[1]],
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED
            },
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
        })
        cdk.Tags.of(privinstance2).add('Name', 'MyPrivateEC2-AZ2')
    }
}