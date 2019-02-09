/*====
Variables used across all modules
======*/
locals {
  production_availability_zones = ["us-east-1a", "us-east-1b"]
}

provider "aws" {
  access_key = "${var.AWS_ACCESS_KEY}"
  secret_key = "${var.AWS_SECRET_KEY}"
  region     = "${var.AWS_REGION}"
}

resource "aws_key_pair" "key" {
  key_name   = "wilbur"
  public_key = "${file("wilbur.pub")}"
}

module "networking" {
  source               = "./modules/networking"
  environment          = "production"
  vpc_cidr             = "10.0.0.0/16"
  public_subnets_cidr  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets_cidr = ["10.0.10.0/24", "10.0.20.0/24"]
  region               = "${var.AWS_REGION}"
  availability_zones   = "${local.production_availability_zones}"
  key_name             = "production_key"
}

module "rds" {
  source            = "./modules/rds"
  environment       = "production"
  allocated_storage = "20"
  database_name     = "${var.DJ_DB_NAME}"
  database_username = "${var.DJ_DB_USER}"
  database_password = "${var.DB_PASSWORD}"
  subnet_ids        = ["${module.networking.private_subnets_id}"]
  vpc_id            = "${module.networking.vpc_id}"
  instance_class    = "db.t2.micro"
}

module "ecs" {
  source             = "./modules/ecs"
  environment        = "production"
  vpc_id             = "${module.networking.vpc_id}"
  availability_zones = "${local.production_availability_zones}"
  repository_name    = "openjobs/production"
  subnets_ids        = ["${module.networking.private_subnets_id}"]
  public_subnet_ids  = ["${module.networking.public_subnets_id}"]

  security_groups_ids = [
    "${module.networking.security_groups_ids}",
    "${module.rds.db_access_sg_id}",
  ]

  database_endpoint = "${module.rds.rds_address}"
  database_name     = "${var.DJ_DB_NAME}"
  database_username = "${var.DJ_DB_USER}"
  database_password = "${var.DB_PASSWORD}"
  secret_key_base   = "${var.DJ_SECRET_KEY}"
}
