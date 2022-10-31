import axios from "axios"
var getListOfficers;
var postNewOfficer
axios.get('/user?ID=12345')
    .then(function (response) {
        console.log(response);
        getListOfficers = response.data
    })
    .catch(function (error) {
        console.log(error);
    });
axios.post("").then(function (response) {
    console.log(response);
    postNewOfficer = response.data
}).catch(err => {
    console.log(err);
})
export var getListOfficers
export var postNewOfficer