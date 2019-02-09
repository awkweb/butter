variable "AWS_ACCESS_KEY" {
  description = "AWS access key"
}

variable "AWS_SECRET_KEY" {
  description = "AWS secret key"
}

variable "AWS_REGION" {
  description = "AWS region"
  default     = "us-east-1"
}

/*====
environment specific variables
======*/

variable "DJ_DB_NAME" {
  description = "Database name"
}

variable "DJ_DB_USER" {
  description = "Database username"
}

variable "DB_PASSWORD" {
  description = "Database password"
}

variable "DJ_SECRET_KEY" {
  description = "Django secret key"
}

variable "DJ_DOMAIN" {
  default = "Domain"
}
