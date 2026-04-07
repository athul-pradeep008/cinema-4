pipeline {
    agent any

    environment {
        // Defines the variables for Docker image tagging
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        DOCKER_HUB_USERNAME = 'athulpradeep123'
        IMAGE_BACKEND = "${DOCKER_HUB_USERNAME}/cinema-backend"
        IMAGE_FRONTEND = "${DOCKER_HUB_USERNAME}/cinema-frontend"
        DOCKER_TAG = "v${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Test Backend Locally') {
            steps {
                dir('backend') {
                    // Test locally before building container if you want
                    bat '''
                        echo "Testing backend..."
                        :: Add your pytest commands here if applicable
                    '''
                }
            }
        }

        stage('Build & Push Backend Image') {
            steps {
                script {
                    echo "Building backend Docker Image: ${IMAGE_BACKEND}:${DOCKER_TAG}"
                    def app = docker.build("${IMAGE_BACKEND}:${DOCKER_TAG}", "./backend")
                    
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        app.push()
                        app.push("latest")
                    }
                }
            }
        }

        stage('Build & Push Frontend Image') {
            steps {
                script {
                    echo "Building frontend Docker Image: ${IMAGE_FRONTEND}:${DOCKER_TAG}"
                    def app = docker.build("${IMAGE_FRONTEND}:${DOCKER_TAG}", "./frontend")
                    
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        app.push()
                        app.push("latest")
                    }
                }
            }
        }

        stage('Deploy via Ansible') {
            steps {
                script {
                    echo "Running Ansible Playbook to Deploy"
                    bat "ansible-playbook -i ansible/inventory ansible/deploy.yml"
                }
            }
        }
    }

    post {
        always {
            echo "CI/CD Pipeline finished."
        }
        success {
            echo "Pipeline succeeded! Successfully built ${DOCKER_TAG} and pushed to Docker Hub."
        }
        failure {
            echo "Pipeline failed. Check the logs for details."
        }
    }
}
