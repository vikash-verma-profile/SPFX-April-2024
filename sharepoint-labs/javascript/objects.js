const employee = {
    firstName: "vikash", lastName: "vikash", empid: 101, fullName: function () {
        return this.firstName + " " + this.lastName;
    }
};

const samplearray=[1,2,3];
console.log(employee.fullName());

console.log(samplearray[0])