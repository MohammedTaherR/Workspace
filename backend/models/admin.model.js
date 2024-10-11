const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/* Admin schema list of Emails containing all the admins of the system */

const AdminSchema = new Schema({
    email: {
        type: String,
        required: true
    }
})


const Admin  = mongoose.model('admin', AdminSchema);

module.exports = {Admin};