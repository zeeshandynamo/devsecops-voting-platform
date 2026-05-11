pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')

        BACKEND_IMAGE = "zeeshandynamo/voting-backend:${BUILD_NUMBER}"
        FRONTEND_IMAGE = "zeeshandynamo/voting-frontend:${BUILD_NUMBER}"

        KUBECONFIG = "/opt/jenkins-kubeconfig/k3s1-kubeconfig"

        SONAR_HOST_URL = "http://13.235.203.19:9000"
    }

    tools {
        jdk 'jdk17'
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                credentialsId: 'github',
                url: 'https://github.com/zeeshandynamo/devsecops-voting-platform.git'
            }
        }

        stage('Verify Tools') {
            steps {
                sh '''
                    docker --version
                    kubectl version --client
                    trivy --version
                    sonar-scanner --version
                '''
            }
        }

        stage('SonarQube Scan') {
            steps {
                withCredentials([string(credentialsId: 'mongo-uri', variable: 'MONGO_URI')]) {
                    sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=voting-app \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=$SONAR_HOST_URL
                    '''
                }
            }
        }

        stage('Trivy Filesystem Scan') {
            steps {
                sh '''
                    trivy fs . \
                    --severity HIGH,CRITICAL \
                    --exit-code 0
                '''
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh '''
                        docker build -t $BACKEND_IMAGE .
                    '''
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh '''
                        docker build -t $FRONTEND_IMAGE .
                    '''
                }
            }
        }

        stage('Trivy Image Scan') {
            steps {
                sh '''
                    trivy image $BACKEND_IMAGE --severity HIGH,CRITICAL --exit-code 0
                    trivy image $FRONTEND_IMAGE --severity HIGH,CRITICAL --exit-code 0
                '''
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                sh '''
                    echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin

                    docker push $BACKEND_IMAGE
                    docker push $FRONTEND_IMAGE
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl set image deployment/backend-deployment \
                    backend-container=$BACKEND_IMAGE \
                    -n voting-app

                    kubectl set image deployment/frontend-deployment \
                    frontend-container=$FRONTEND_IMAGE \
                    -n voting-app

                    kubectl rollout status deployment/backend-deployment -n voting-app --timeout=300s

                    kubectl rollout status deployment/frontend-deployment -n voting-app --timeout=300s
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    kubectl get pods -n voting-app
                    kubectl get svc -n voting-app
                    kubectl get ingress -n voting-app
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }

        always {
            cleanWs()
        }
    }
}
