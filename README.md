# Simple Repository
* This is a sample application for my own study
* We can regist pdf document or jpeg image with tagging, to a specified location (, which is called "space" in this application).
* We can view registerd file via brower

## Architecture
Simple Reposioty is composed of following components.

<img src=./capture/architect.jpg width="800">

* Each component is docker container.

### Database
- This component store document meta data with JSON format
- Using mongo DB
### Repository
- This component offer repository operation for client with REST API
- Using express for application framework
- Using swagger for REST api documentation viewer
### Web Server
- This component is web server (publsh html and reverse proxy)
- Using Nginx for web server and reverse proxy
- Using Nuxt / Vue for front end js framework
- Using Bootstrap / BootstrapVue for css framework

## Overview of this application 
### Login 
<img src=./capture/login.jpg width="800">

* We can sign in this application with local user account or social account (Github and Facebook)

### Viewer
<img src=./capture/home.jpg width="800">

* Registerd spaces are listed in the upper left of the screen
* Registerd pdfs and images are listed in the lower left of the screen
* Focused pdfs or image is shown in the right area of the screen

### API document
<img src=./capture/api-documentation.png width="800">

* We use swagger for api documentation framework


