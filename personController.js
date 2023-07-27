const dbCore = require('../Core/dbCore');
 
// method used to get all people
const getPeople = async (req, res) => {
    const people = await dbCore.People()
    if (!people) return res.status(204).json({ 'message': 'No people found.' });
    res.json(people);
}
 
// method used to get a person by surname
const getPerson = async (req, res) => {
    const person = await dbCore.PersonBySurname(req.params.surname);
    if (!person) return res.status(204).json({ 'message': 'No person found.' });
    res.json(person);
}
 
// method used to delete a person
const deletePerson = async (req, res) => {
    const result = await dbCore.DeletePerson(req.params.surname);
    res.json(result);
}
 
// method used to create a new person
const createPerson = async (req, res) => {
    const result = await dbCore.AddPerson({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age
    });
    res.json(result);
}
 
// method used to update a person
const updatePerson = async (req, res) => {
    const result = await dbCore.UpdatePerson({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age
    });
    res.json(result);
}
 
// definition of public methods
module.exports = { getPeople, getPerson, deletePerson, createPerson, updatePerson };