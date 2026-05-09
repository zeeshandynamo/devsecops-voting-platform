pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
        DOCKERHUB_USERNAME = 'zeeshandynamo'
        IMAGE_TAG = "${BUILD_NUMBER}"
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
                sh 'docker build -t voting-backend:${IMAGE_TAG} ./backend'
                sh 'docker build -t voting-frontend:${IMAGE_TAG} ./frontend'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                sh 'trivy image voting-backend:${IMAGE_TAG}'
                sh 'trivy image voting-frontend:${IMAGE_TAG}'
            }
        }

        stage('DockerHub Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_USERNAME --password-stdin'
            }
        }

        stage('Tag Docker Images') {
            steps {
                sh 'docker tag voting-backend:${IMAGE_TAG} zeeshandynamo/voting-backend:${IMAGE_TAG}'
                sh 'docker tag voting-frontend:${IMAGE_TAG} zeeshandynamo/voting-frontend:${IMAGE_TAG}'
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                sh 'docker push zeeshandynamo/voting-backend:${IMAGE_TAG}'
                sh 'docker push zeeshandynamo/voting-frontend:${IMAGE_TAG}'
            }
        }

        stage('Update Kubernetes Image Tags') {
            steps {
                sh '''
                sed -i "s|image: zeeshandynamo/voting-backend:.*|image: zeeshandynamo/voting-backend:${IMAGE_TAG}|g" k8s/backend-deployment.yaml
                sed -i "s|image: zeeshandynamo/voting-frontend:.*|image: zeeshandynamo/voting-frontend:${IMAGE_TAG}|g" k8s/frontend-deployment.yaml
                '''
            }
        }

        stage('Deploy to K3s Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'k3s-kubeconfig', variable: 'KUBECONFIG_FILE')]) {
                    sh '''
                    kubectl --kubeconfig=$KUBECONFIG_FILE apply -f k8s/
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
