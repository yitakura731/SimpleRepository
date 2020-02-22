# Simple Repository
This is a sample application for my own study. This application is able to store pdf or jpeg file with tagging at a specified location, and view registerd file via browser

# Architecture
Simple Repository is one of the microservice which offer repository service. [Simple Auth](https://github.com/yitakura731/SimpleAuth) is another microservice which offer authentication service.  
Simple Repository is composed of three components.

<img src=./capture/architect.png width="700">

All components are dockernized and published at the docer-hub.
* [Simple Repository web](https://hub.docker.com/repository/docker/yitakura731/simple-repository-web)

* [Simple Repository rep](https://hub.docker.com/repository/docker/yitakura731/simple-repository-rep)

* [Simple Repository db](https://hub.docker.com/repository/docker/yitakura731/simple-repository-db)

## Database
- Save a meta data of the stored file in JSON format
- Use mongo DB
## Repository
- Offer REST API of the repository operation to client
- Use express.js for node.js backend framework
- Use swagger for REST api documentation viewer
## Web Server
- This is a web server for publishing single page application and SSL end point
- Use Nginx for web server
- Use Nuxt for frontend js framework
- Use BootstrapVue for css framework

# Overview of this application 
## Login 
<img src=./capture/cap05.png width="600">  

* Sign in with local account or social account (Github and Facebook)

## Viewer
* Thumbnails of the jpeg or pdf are listed at the left side of the viewer
* Selected jpeg or pdf is shown in the right side of the viewer

### Jpeg Viewer
<img src=./capture/cap01.png width="600">

### PDF Viewer
<img src=./capture/cap02.png width="600">  

## Responsive view

<img src=./capture/cap06.png width="170" height="340">
<img src=./capture/cap03.png width="170" height="340">
<img src=./capture/cap04.png width="170" height="340">


### API document
<img src=./capture/api-doc.png width="600">

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
