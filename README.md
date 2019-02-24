# SimpleRepository
* Can regist pdf file with tagging, to a specified location. And can view registerd pdf file via brower
* This is a sample application for study of author

## Environment 
- Node.js (v10.15.0)
- MongoDB (v4.0.5)

## Using frameworks
### Server side
- Express
### Front side
- Vue/Vuex
- bootstrap/bootstrapVue
### Multi national
- i18next

## Capture of application 
### Top View
<img src=./public/images/capture01.png width="700">

# Get Start
## Preconfition
- Install Node on application server
- Install MongoDB on database server

## Installation
1. Clone SimpleRepository

    `git clone https://github.com/yitakura/SimpleRepository.git`

1. Run npm install

    `npm run install`

1. Edit configuration json file

    * apiServerURL：Set api server URL
    * appLabel：Set application label
    * dbServerURL :  Set database server URL
    * dbName : Set database name
    * contentsStorage : Set contents storage directory
    * Example：
        ```json
        {
            "apiServerURL" : "http://localhost:3000",
            "appLabel" : "SimpleRepository",
            "dbServerURL" : "mongodb://localhost:27017",
            "dbName" : "SimpleRepository",
            "contentsStorage" : "storage\\contents"
        }
        ```

1. Create database which name is key _dbName_ value in configration file

1. Migrate mongodb collections

    `npm run migration`

1. Build front side js file (bundle.js)

    `npm run build`

1. Start development server

    `npm run start`

# Access vai brower

- set following url in your brower

    http://_apiServerURL_:_appLabel_