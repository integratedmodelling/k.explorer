pipeline {
    agent { label "kexplorer-agent"}
    options { skipDefaultCheckout(true) }
    stages {
        stage ('Initialize') {
            steps {
                dir('k.explorer') {
                    git url: 'https://github.com/integratedmodelling/k.explorer.git'
                }
                dir('klab') {
                    git credentialsId: '2f30d924-29e5-4235-b61f-a0dbe2bb7783', branch: 'develop', url: 'git@github.com:integratedmodelling/klab.git'
                }

            }
        }
        stage('Build k.Explorer') {
            steps {
                dir('k.explorer') {
                    sh "yarn"
                    sh "yarn quasar-build"
                }
            }
        }
        stage('Commit and PR') {
            when {
                branch 'master'
            }
            steps {
                dir('k.explorer') {
                    script {
                        env.REV = sh(script: 'git rev-parse HEAD | cut -c -7', returnStdout: true).trim()
                    }
                }
                dir('klab') {
                    configFileProvider([configFile(fileId: '817052da-4dcc-45b9-92e2-d91978010da0', variable: 'GH_SSH_KEYS')]) {
                        sh 'mkdir ~/.ssh && cp $GH_SSH_KEYS ~/.ssh/known_hosts && chmod 600 ~/.ssh/known_hosts'
                    }
                    sh "git checkout -b kexplorer-${env.REV}"
                    sh "rsync -avP --delete ../k.explorer/dist/ui/ klab.engine/src/main/resources/static/ui/"
                    sh "git config --global user.email admin@integratedmodelling.org"
                    sh "git config --global user.name klab-bot"
                    sshagent(['2f30d924-29e5-4235-b61f-a0dbe2bb7783']) {
                        sh "git add klab.engine/src/main/resources/static/ui/"
                        sh "git commit -m '[AUTOMATED UPDATE] k.Explorer - Rev ${env.REV}'"
                        sh "git push origin kexplorer-${env.REV}"
                    }
                    withCredentials([file(credentialsId: 'klab-bot-gh-cli', variable: 'TOKEN')]) {
                        sh 'gh auth login --with-token < $TOKEN'
                        sh "gh pr create --base develop --title '[AUTOMATED UPDATE] k.Explorer - Rev ${env.REV}' --body 'Automated update' --assignee '@me' --reviewer integratedmodelling/reviewers"
                    }
                }
            }
        }
    }
}
