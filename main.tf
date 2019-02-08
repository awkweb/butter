provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region     = "${var.aws_region}"
}

resource "aws_key_pair" "wilbur" {
  key_name   = "wilbur"
  public_key = "${file(var.ssh_pubkey_file)}"
}

resource "aws_vpc" "default" {
  id = "${var.vpc_id}"
}

resource "aws_rds_cluster" "default" {
  engine                  = "aurora-postgresql"
  database_name           = "wilbur"
  master_username         = "${var.db_master_username}"
  master_password         = "${var.db_master_password}"
  preferred_backup_window = "06:00-08:00"
}
