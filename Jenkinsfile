pipeline {
    agent any

    environment {
        KUBECONFIG = "/opt/jenkins-kubeconfig/k3s1-kubeconfig"

        BACKEND_IMAGE = "zeeshandynamo/voting-backend:${BUILD_NUMBER}"
        FRONTEND_IMAGE = "zeeshandynamo/voting-frontend:${BUILD_NUMBER}"
    }

    stages {
        stage('Verify Tools') {
            steps {
                sh '''
                    docker --version
                    kubectl version --client
                    kubectl get nodes
                    trivy --version
                '''
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $BACKEND_IMAGE .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $FRONTEND_IMAGE .'
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
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-cred',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin
                        docker push $BACKEND_IMAGE
                        docker push $FRONTEND_IMAGE
                    '''
                }
            }
        }

	stage('Deploy to Kubernetes') {
	    steps {
        	sh '''
            	    kubectl set image deployment/backend-deployment backend=$BACKEND_IMAGE -n voting-app
	            kubectl set image deployment/frontend-deployment frontend=$FRONTEND_IMAGE -n voting-app

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
            echo 'Full CI/CD pipeline completed successfully.'
        }

        failure {
            echo 'Full CI/CD pipeline failed.'
        }
    }
}
