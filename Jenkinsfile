pipeline {
    agent any

    environment {
        PROD_DIR = '/var/www/comfortair.co.in'
        STAGING_DIR = '/var/www/staging.comfortair.co.in'
        DEV_DIR = '/var/www/dev.comfortair.co.in'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        echo 'Deploying to Production...'
                        sh "rsync -av --delete . ${PROD_DIR}/ --exclude node_modules --exclude .git"
                        sh "cd ${PROD_DIR} && npm install --production"
                        sh "pm2 restart comfortair-prod || pm2 start npm --name 'comfortair-prod' -- start -- -p 3063"
                    } 
                    else if (env.BRANCH_NAME == 'staging') {
                        echo 'Deploying to Staging...'
                        sh "rsync -av --delete . ${STAGING_DIR}/ --exclude node_modules --exclude .git"
                        sh "cd ${STAGING_DIR} && npm install --production"`
                        sh "pm2 restart comfortair-staging || pm2 start npm --name 'comfortair-staging' -- start -- -p 3002"
                    } 
                    else if (env.BRANCH_NAME == 'dev') {
                        echo 'Deploying to Dev...'
                        sh "rsync -av --delete . ${DEV_DIR}/ --exclude node_modules --exclude .git"
                        sh "cd ${DEV_DIR} && npm install"
                        sh "pm2 restart comfortair-dev || pm2 start npm --name 'comfortair-dev' -- start -- -p 3061"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}

