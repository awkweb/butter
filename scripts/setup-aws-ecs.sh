#!/bin/bash

# configure
echo "Configuring cluster"
ecs-cli configure --region us-east-1 --cluster wilbur

# setup cloud formation template
echo "Creating cluster"
ecs-cli up --keypair wilbur --capability-iam --size 2 --vpc vpc-80bfc5fb --subnets subnet-1b96637c,subnet-18756b45 --instance-type t2.micro
