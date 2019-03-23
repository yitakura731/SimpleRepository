# Simple Repository
* This is a sample application for my own study
* Can regist pdf file with tagging, to a specified location. And can view registerd pdf file via brower

## Environment 
- Node.js (v10.15.0)
- MongoDB (v4.0.5)

## Architecture
Simple Reposioty is composed following components.
- Database
- Reposiotry
- Viewer
### Database
- It's a database for this application
- Using MongoDB
### Repository
- Offer operation for repository with REST API
- Can regist folder(called space in this app), tag, file(called document in this app)
- Using express for application framework
- Using swagger for REST api documentation viewer
### Viewer
- Offer viewer for registed document via web browser
- Can show contents file, list registed documents grouped by tag and space
- Using Nuxt/Vue for front side js framework
- Using Bootstrap/BootstrapVue for css framework

## Capture of application 
### View area
<img src=./capture/capture01.png width="800">

### API document of repository
<img src=./capture/api-documentation.png width="800">

# Get Start
## Preconfition
- Install Node on repository and viewer server
- Install MongoDB on database server

## Installation
1. Clone SimpleRepository

    `git clone https://github.com/yitakura/SimpleRepository.git`

### Repository

1. Move current directory to repository

    `cd sr-repository`

1. Run npm install

    `npm install`

1. Edit below configuration in config/development.json or config/production.json

    * dbServerURL :  Mongodb server access URL
    * dbName : Database name of this application
    * contentsStorage : Directory which stored document file
    * spaceStorage : Directory which stored space icon image file
    * Example：
        ```json
        {
            "dbServerURL" : "mongodb://localhost:27017",
            "dbName" : "SimpleRepository",
            "contentsStorage" : "storage\\contents",
            "spaceStorage" : "storage\\spaces"
        }
        ```

1. Create Mongodb database which name is key _dbName_ in configration file

1. Migrate mongodb collections

    `npm run migration`

1. Start development server

    `npm run start`

1. Access following url

    http://_repositoryServerURL_:3000/_appLabel_/api-docs

### Viewer

1. Move current directory to repository

    `cd sr-view`

1. Run npm install

    `npm install`

1. Edit nuxt.config.js
    * repHost : Repository server FQDN
    * repPort : Repository server port
    * Example：
       ```js
       const repHost = 'localhost';
       const repPort = '3000';
       ```

1. Build project

    `npm run build`

1. Start Viewer server

    `npm run start`

1. Access following url

    http://_viewerServerURL_:3333/_appLabel_
