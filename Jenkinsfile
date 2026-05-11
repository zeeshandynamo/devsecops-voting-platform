pipeline {
    agent any

    environment {
        KUBECONFIG = "/opt/jenkins-kubeconfig/k3s1-kubeconfig"
        SONAR_HOST_URL = "http://13.235.203.19:9000"
    }

    stages {
        stage('Verify Tools') {
            steps {
                sh '''
                    echo "Checking tools..."
                    docker --version
                    kubectl version --client
                    kubectl get nodes
                    trivy --version
                    sonar-scanner --version
                '''
            }
        }
    }

    post {
        success {
            echo 'Tool verification successful.'
        }

        failure {
            echo 'Tool verification failed.'
        }
    }
}
