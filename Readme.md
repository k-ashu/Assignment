#Tables-
    
    1) person - [personId, name, power, familyId, univerId]
    2) family - [familyId, isBalanced]
    3) universe_family - [universId, familyId, total_power]

#Steps for creating local database (needs to be done if running the program for the first time)
    
    1) Uncomment the line where createDatabase function in called in index.js (specified in the code)
    2) Change the password to your password field in connectionConfig.js and createDatabase.js inside database folder

    NOTE: 
        *Initial data is already provided
        *To input your own data change the data in inputData.js file.
        *Comment the createDatabase function call after running the program for first time to avoid duplicate entries

#Commands for running the code-
    1) npm install - to install all dependencies
    2) node index.js - to run the code

#Postmand link to import the REST API:   https://www.getpostman.com/collections/5988b567f74cac2a8bb2

#Description of requests in the API:  
    
    -> Requests for the problem statement

    1) Families from a universe - To get families in a paticular universe (provide universe id in url)
    2) isBalanced - Check if a family is balanced or not (provide family id in url)
    3) Unbalanced families - lists all unbalanced families
    4) Balance family - To Balance a family (provide family id in url)
    
    -> Additional requests to get different data

    5) Family's power in all universe - Lists powers of a given family from all universe (makes easier to compare)
    6) Universes - List all universe
    7) Families - List all families
    8) people - list all data for every person

    -> Inserting data
    
    9) InsertPerson - POST request to insert a new record in person table   
        NOTE: To insert the values change the fields in the body tab of request
