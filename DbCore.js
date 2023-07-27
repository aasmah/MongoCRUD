const parameters = require('./Parameters').default;
const { MongoClient } = require('mongodb');
 
// public method use to create a person
async function AddPerson(person)
{
    const mongoClient = new MongoClient(parameters.mongoDBConnection);
    return await Create(mongoClient, person);
}
 
// public method use to delete a person
async function DeletePerson(surName)
{
    const mongoClient = new MongoClient(parameters.mongoDBConnection);
    return await Delete(mongoClient, surName);
}
 
// public method use to update a person
async function UpdatePerson(person)
{
    const mongoClient = new MongoClient(parameters.mongoDBConnection);
    return await Update(mongoClient, person.surname, { name: person.name, age: person.age} );
}
 
// public method use to get a person by surname
async function PersonBySurname(surName)
{
    const mongoClient = new MongoClient(parameters.mongoDBConnection);
    return await GetOne(mongoClient, surName);
}
 
// public method use to get all people
async function People()
{
    const mongoClient = new MongoClient(parameters.mongoDBConnection);
    return await GetAll(mongoClient);
}
 
// private method use to open the database connection 
async function OpenConnection(mongoClient) {
    try {
        // Connect to the MongoDB 
        await mongoClient.connect();
    }
    catch (e) {
        console.error(e)
    };
}
 
// private method use to close the database connection
async function CloseConnection(mongoClient) {  
    try {
        // Close connect to the MongoDB
        await mongoClient.close();
    }
    catch (e) {
        console.error(e)
    };
}
 
// private method use to save a new person in MongoDB
async function Create(mongoClient, person)
{
    try {
        OpenConnection(mongoClient);
        return await mongoClient.db(parameters.mongoDBName).collection(parameters.collectionPeople).insertOne(person);
    } catch (error) {
        console.error(error);
    }
    finally{
        CloseConnection(mongoClient);
    }    
}
 
// private method use to delete a person in MongoDB
async function Delete(mongoClient, surnameInput)
{
    try {
        OpenConnection(mongoClient);
        return await mongoClient.db(parameters.mongoDBName).collection(parameters.collectionPeople).deleteOne({ surname: surnameInput });
    } catch (error) {
        console.error(error);
    }
    finally{
        CloseConnection(mongoClient);
    }    
}
 
// private method use to update a person in MongoDB
async function Update(mongoClient, surnameInput, updateFields)
{
    try {
        OpenConnection(mongoClient);
        return await mongoClient.db(parameters.mongoDBName).collection(parameters.collectionPeople).updateMany({ surname: surnameInput }, { $set: updateFields});
    } catch (error) {
        console.error(error);
    }
    finally{
        CloseConnection(mongoClient);
    }    
}
 
// private method use to get a person by surname in MongoDB
async function GetOne(mongoClient, surnameInput)
{
    try {
        OpenConnection(mongoClient);
        return await mongoClient.db(parameters.mongoDBName).collection(parameters.collectionPeople).findOne({ surname: surnameInput });
    } catch (error) {
        console.error(error);
    }
    finally{
        CloseConnection(mongoClient);
    }    
}
 
// private method use to get all people in MongoDB
async function GetAll(mongoClient)
{
    try {
        OpenConnection(mongoClient);
        return await mongoClient.db(parameters.mongoDBName).collection(parameters.collectionPeople).find({}).toArray();
    } catch (error) {
        console.error(error);
    }
    finally{
        CloseConnection(mongoClient);
    }    
}
 
// definition of public methods
module.exports = { AddPerson, DeletePerson, UpdatePerson, PersonBySurname, People };