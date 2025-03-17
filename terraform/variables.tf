variable "instance_type" {
  description = "Type of EC2 instance"
  default     = "t3.medium"  # Free tier eligible
}

variable "ami" {
  description = "AMI ID for the EC2 instance"
  default     = "ami-0694d931cee176e7d"  # Amazon Linux 2 AMI for eu-west-1 (updated)
}
