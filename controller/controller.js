var StudentDB = require('../models/student')

//create users
exports.create = (req,res) =>{

    console.log(req.body)
    //validating requst(making sure form is formatited correctly)
    if(!req.body){
        res.status(400).send({message : "Content can't be empty!"})
        return
    }

    const newStudent = new StudentDB({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    newStudent
        .save(newStudent)
        .then(data => {
            //res.send(data)
            res.redirect("/dashboard")
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating user"
            })
        })

}

//retrieve and return users
exports.find = (req,res) =>{
    if(req.query.id){
        const id = req.query.id
        StudentDB.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: `User ${id} not found`})
            }else{
                res.send(data)
            }
        })
        .catch(err => [
            res.status(500).send({message: `Error Retriving User ${id}`})
        ])

    }else{

        StudentDB.find()
        .then(student => {
        res.send(student)
        })
       .catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while retrieving the user"
        })
    })

    }
}

//update user
exports.update = (req,res) =>{
    if(!req.body){
        return res
        .status(400)
        .send({message : "Data to update is empty"})
    }

    const id = req.params.id
    StudentDB.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(400).send({
                message: `User ${id} can't be updated. Make Sure Id is correct`
            })
        }else{
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error! Update user information!"
        })
    })
}

//delete user
exports.delete = (req,res) =>{
    const id = req.params.id
    StudentDB.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message: `User ${id} can't be deleted. Make Sure Id is correct`
            })
        }else{
            res.send({
                message: "User was delleted successfully"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `User ${id} can't be deleted`
        })
    })
}