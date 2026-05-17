variable "aws_region" {
  default = "ap-south-1"
}

variable "instance_type" {
  default = "t3.large"
}

variable "key_name" {
  description = "devsecops-key"
}

variable "allowed_ssh_ip" {
  description = "13.235.203.19/32"
}
