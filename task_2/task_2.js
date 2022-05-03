
const obj = {
    name : "Anton",
    age : 36,
    skills : ["Javascript", "HTML", "CSS"],
    salary : 80000
};

const result = JSON.stringify(obj);
console.log(result);

// {"name":"Anton","age":36,"skills":["Javascript","HTML","CSS"],"salary":80000}