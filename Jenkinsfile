pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
        DOCKERHUB_USERNAME = 'zeeshandynamo'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                credentialsId: 'github',
                url: 'https://github.com/zeeshandynamo/devsecops-voting-platform.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    withSonarQubeEnv('sonarqube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t voting-backend:v2 ./backend'
                sh 'docker build -t voting-frontend:v2 ./frontend'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                sh 'trivy image voting-backend:v2'
                sh 'trivy image voting-frontend:v2'
            }
        }

        stage('DockerHub Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_USERNAME --password-stdin'
            }
        }

        stage('Tag Docker Images') {
            steps {
                sh 'docker tag voting-backend:v2 zeeshandynamo/voting-backend:v1'
                sh 'docker tag voting-frontend:v2 zeeshandynamo/voting-frontend:v1'
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                sh 'docker push zeeshandynamo/voting-backend:v2'
                sh 'docker push zeeshandynamo/voting-frontend:v2'
            }
        }

        stage('Deploy to K3s Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'k3s-kubeconfig', variable: 'KUBECONFIG_FILE')]) {
                    sh '''
                    kubectl --kubeconfig=$KUBECONFIG_FILE apply -f k8s/
                    kubectl --kubeconfig=$KUBECONFIG_FILE rollout restart deployment/backend-deployment -n voting-app
                    kubectl --kubeconfig=$KUBECONFIG_FILE rollout restart deployment/frontend-deployment -n voting-app
                    kubectl --kubeconfig=$KUBECONFIG_FILE rollout status deployment/backend-deployment -n voting-app
                    kubectl --kubeconfig=$KUBECONFIG_FILE rollout status deployment/frontend-deployment -n voting-app
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}
