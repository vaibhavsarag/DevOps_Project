pipeline {
    agent any

    environment {
        IMAGE_NAME = "vaibhavsarag/sample-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
        CONTAINER_NAME = "immverse-app"
        APP_PORT = "3000"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/vaibhavsarag/DevOps_Project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t $IMAGE_NAME:$IMAGE_TAG .
                    docker tag $IMAGE_NAME:$IMAGE_TAG $IMAGE_NAME:latest
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    echo "Testing Docker image..."

                    docker run -d \
                        --name ${CONTAINER_NAME}-test \
                        -p 3001:3000 \
                        $IMAGE_NAME:$IMAGE_TAG

                    sleep 5

                    curl -f http://localhost:3001

                    docker stop ${CONTAINER_NAME}-test
                    docker rm ${CONTAINER_NAME}-test
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login \
                            -u "$DOCKER_USER" \
                            --password-stdin

                        docker push $IMAGE_NAME:$IMAGE_TAG
                        docker push $IMAGE_NAME:latest

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                    echo "Deploying application..."

                    docker stop $CONTAINER_NAME || true
                    docker rm $CONTAINER_NAME || true

                    docker run -d \
                        --name $CONTAINER_NAME \
                        --restart unless-stopped \
                        -p ${APP_PORT}:3000 \
                        $IMAGE_NAME:$IMAGE_TAG

                    sleep 5

                    curl -f http://localhost:${APP_PORT}

                    echo "Deployment successful!"
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline executed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}
