import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';


interface RDSStackProps extends cdk.StackProps {
    vpc: ec2.Vpc;
}

export class RDSStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: RDSStackProps){
        super(scope, id, props);


        const rdsInstance = new rds.DatabaseInstance( this, 'CDKRDSDatabase', {
            vpc: props.vpc,
            engine: rds.DatabaseInstanceEngine.mysql({version: {
                mysqlFullVersion: '8.4.11',
                mysqlMajorVersion: '8.4'
            }}),
            allocatedStorage: 20,
            maxAllocatedStorage: 30,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
            deletionProtection: true,
            backupRetention: cdk.Duration.days(7),
            parameterGroup: rds.ParameterGroup.forInstance(this, 'RDSParameterGroup', {
                engine: rds.DatabaseInstanceEngine.mysql({version: {
                    mysqlFullVersion: '8.4.11',
                    mysqlMajorVersion: '8.4'
                }}),
            }),
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                availabilityZones: [props.vpc.availabilityZones[0], props.vpc.availabilityZones[1]]
            }
        });

        cdk.Tags.of(rdsInstance).add('Name', 'MyRDSInstance')

        new cdk.CfnOutput(this, 'RdsInstanceEndpoint', {
            value: rdsInstance.dbInstanceEndpointAddress,
            description: 'RDS database endpoint'
        })
    }
}

