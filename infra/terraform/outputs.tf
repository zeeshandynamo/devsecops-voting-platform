output "jenkins_public_ip" {
  value = aws_eip.jenkins_eip.public_ip
}

output "jenkins_url" {
  value = "http://${aws_eip.jenkins_eip.public_ip}:8080"
}

output "ssh_command" {
  value = "ssh -i ~/.ssh/devsecops-key.pem ubuntu@${aws_eip.jenkins_eip.public_ip}"
}
