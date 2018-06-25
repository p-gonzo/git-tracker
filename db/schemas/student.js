let mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
  "name": String,
  "github-handle": String
})

let Student = mongoose.model('student', studentSchema);

Student.prototype.getAll = () => {
  return new Promise((resolve, reject) => {
    Student
    .find({})
    .exec((err, docs) => {
      if(err) reject(err)
      resolve(docs)
    })
  })
}

module.exports = Student;