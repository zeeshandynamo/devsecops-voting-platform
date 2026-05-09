pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/zeeshandynamo/devsecops-voting-platform.git'
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
    }
}
