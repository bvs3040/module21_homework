// {"name":"Anton","age":36,"skills":["Javascript","HTML","CSS"],"salary":80000}

const jsonString = `{"name":"Anton","age":36,"skills":["Javascript","HTML","CSS"],"salary":80000}`;
const unit = JSON.parse(jsonString);
const result = JSON.stringify(unit);
console.log(result);