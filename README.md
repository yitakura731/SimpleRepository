# Simple Repository
* This is a sample application for my own study
* Store pdf or jpeg with tagging, at a specified location
* View registerd file via browser

## Architecture
Simple Reposioty is composed of the following components.

<img src=./capture/architect.jpg width="800">

* All component is dockernized.

### Database
- Save meta data of the file in JSON format
- Using mongo DB
### Repository
- Offer REST API of the repository to client
- Using express for application framework
- Using swagger for REST api documentation viewer
### Web Server
- Publish web page
- Using Nginx for web server
- Using Nuxt for front end js framework
- Using BootstrapVue for css framework

## Overview of this application 
### Login 
<img src=./capture/login.jpg width="800">

* Sign in with local account or social account (Github and Facebook)

### Viewer
<img src=./capture/home.jpg width="800">

* Registerd pdfs/images are listed at the left area
* Selected pdfs/image is shown in the right area

### API document
<img src=./capture/api-documentation.png width="800">

* Use swagger for repository api documentation framework

## Get start

### Pull images
1.  Pull git repository
    ```Console
    git clone https://github.com/yitakura731/SimpleRepository
    ```

1. Pull simple repository images from docker hub
    ```Docker
    docker pull yitakura731/simple-repository-db
    docker pull yitakura731/simple-repository-rep
    docker pull yitakura731/simple-repository-web
    ```

1. Edit environment file

    Edit following env files
    - template.env
    - sr-db/template_db.env
    - sr-repository/template_rep.env
    - sr-view/template_app.env

    Rename env files as follow
    - "template.env"  to  ".env"
    - "template_db.env"  to  "db.env"
    - "template_rep.env"  to  "rep.env"
    - "template_app.env"  to  "app.env"

1. Start docker
    ```Docker
    docker-compose up -d
    ```
