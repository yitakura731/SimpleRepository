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

    ```json
    {
        "apiServerURL" : "http://localhost:3000",    // Application server URL
        "appLabel" : "SimpleRepository",             // Application label
        "dbServerURL" : "mongodb://localhost:27017", // MongoDB server URL
        "dbName" : "SimpleRepository"                // MongoDB server database name,
        "contentsStorage" : "storage\\contents"      // Direcotry path of the stored file
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