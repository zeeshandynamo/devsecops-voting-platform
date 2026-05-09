pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
        DOCKERHUB_USERNAME = 'zeeshandynamo'
    }

    stages {

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

        stage('Build Docker Backend Image') {
            steps {
                sh 'docker build -t zeeshandynamo/voting-backend:v1 ./backend'
            }
        }

        stage('Build Docker Frontend Image') {
            steps {
                sh 'docker build -t zeeshandynamo/voting-frontend:v1 ./frontend'
            }
        }

        stage('DockerHub Login') {
            steps {
                sh '''
                echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                '''
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
}
