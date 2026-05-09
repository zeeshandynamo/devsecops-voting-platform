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
                        sh """
                        ${scannerHome}/bin/sonar-scanner
                        """
                    }
                }
            }
        }

        stage('Build Docker Backend Image') {
            steps {
                sh 'docker build -t voting-backend:v1 ./backend'
            }
        }

        stage('Build Docker Frontend Image') {
            steps {
                sh 'docker build -t voting-frontend:v1 ./frontend'
            }
        }

        stage('DockerHub Login') {
            steps {
                sh """
                echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin
                """
            }
        }

        stage('Tag Backend Image') {
            steps {
                sh 'docker tag voting-backend:v1 zeeshandynamo/voting-backend:v1'
            }
        }

        stage('Tag Frontend Image') {
            steps {
                sh 'docker tag voting-frontend:v1 zeeshandynamo/voting-frontend:v1'
            }
        }

        stage('Push Backend Image') {
            steps {
                sh 'docker push zeeshandynamo/voting-backend:v1'
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh 'docker push zeeshandynamo/voting-frontend:v1'
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
