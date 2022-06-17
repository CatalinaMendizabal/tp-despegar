pipeline {
    agent any

    tools {
        nodejs "Node Js 16"
    }

    environment {
        DATABASE_URL = 'postgresql://sa:password@despegar-db:5432/tp-despegar'
    }

    stages {
        stage('verify tooling') {
            steps {
                sh '''
                    docker info
                    docker version
                    docker-compose version
                    curl --version
                '''
            }
        }
        stage('Build') {
            steps {
                git branch: 'main', credentialsId: '9d343731-3a1b-469d-afc7-fa91c94303bc', url: 'git@github.com:CatalinaMendizabal/tp-despegar.git'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'chmod -R 777 ./jenkins/scripts/test.sh'
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Deliver') {
            steps {
                sh 'chmod -R 777 ./jenkins/scripts/deliver.sh'
                sh './jenkins/scripts/deliver.sh'
            }
        }
    }
}