const mongoose = require('mongoose');

mongoose.connect(process.env.DBURI)
.then(() => {
    console.log('Connected to the database succesfully')
})
.catch((error) => {
    console.log(error);
});