# Create a key pair for SSH access
resource "aws_key_pair" "deployer_key" {
  key_name   = "new-key"
  # You'll need to replace this with your new public key content
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDWtuW5U9F/WPp6FQJNrW8ElBIxwYXYKMgvCD55UOwN06hAvL5zLNqulyDLIebdO1z71eS/oWqmgdQ/H6iY7hxAh/0ZZlXYCUXVq6Rl+ChNi63uhQqjmc8jgZ+a76XXfsG8XGqTBRxuUUoWVJCQJ3LFOCaWey5q4FPCP4KBShlzFnod1c2JvGxpqkmx9ui4QbfOV8zoyoo07y/QOQ/a++L/bOjpczN6gJ/cHXRfopbLrq5yONfxgLBzrrqmOUDpp80ldJsUSHxHwAtjIhytb7sFC6WX8g1l1+D9xWbNoROgoP17Nu8P6FQZe2cF3EExNquAaAm9olpMfYz6lL8ESYIj Robert Cojocaru@LAPTOP-L5UJUSTL"
}

resource "aws_instance" "my_ec2_instance" {
  ami           = var.ami
  instance_type = var.instance_type
  vpc_security_group_ids = [aws_security_group.allow_ssh.id]  # Reference the security group directly
  iam_instance_profile = aws_iam_instance_profile.ec2_profile.name
  key_name = aws_key_pair.deployer_key.key_name  # Use the key pair
  
  # User data script to update and install Docker, k3s, and basic utilities
  user_data = <<-EOF
              #!/bin/bash
              # Update system and install basic utilities
              yum update -y
              yum install -y curl wget git

              # Install Docker
              amazon-linux-extras install docker -y
              systemctl enable docker
              systemctl start docker
              usermod -aG docker ec2-user

              # Install k3s (lightweight Kubernetes)
              curl -sfL https://get.k3s.io | sh -
              
              # Make kubectl accessible for ec2-user
              mkdir -p /home/ec2-user/.kube
              cp /etc/rancher/k3s/k3s.yaml /home/ec2-user/.kube/config
              chown -R ec2-user:ec2-user /home/ec2-user/.kube
              echo "export KUBECONFIG=/home/ec2-user/.kube/config" >> /home/ec2-user/.bashrc
              
              # Set proper permissions
              chown ec2-user:ec2-user /home/ec2-user/.kube/config
              chmod 600 /home/ec2-user/.kube/config
              EOF

  root_block_device {
    volume_size = 10  # 10GB for root volume
    volume_type = "gp3"
    delete_on_termination = true
  }

  tags = {
    Name = "K3sInstance"
  }
}

# Additional EBS volume for database persistence
resource "aws_ebs_volume" "db_data" {
  availability_zone = aws_instance.my_ec2_instance.availability_zone
  size              = 5  # 5GB volume for database data
  type              = "gp3"
  
  tags = {
    Name = "DatabaseData"
  }
}

# Attach the EBS volume to the EC2 instance
resource "aws_volume_attachment" "db_data_attachment" {
  device_name = "/dev/sdf"
  volume_id   = aws_ebs_volume.db_data.id
  instance_id = aws_instance.my_ec2_instance.id
}