output "ec2_public_ip" {
  value = aws_instance.my_ec2_instance.public_ip
}

output "ec2_instance_id" {
  value = aws_instance.my_ec2_instance.id
}

output "ssh_connection_command" {
  value = "ssh -i new-key ec2-user@${aws_instance.my_ec2_instance.public_ip}"
}