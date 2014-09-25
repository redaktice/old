var students = [{
	name: 'Liz',
	age: 25,
	city: 'Boulder'
}, {
	name: 'Meghan',
	age: 27,
	city: 'Denver'
}, {
	name: 'Trent',
	age: 32,
	city: 'Boulder'
},{
	name: 'Chelsea',
	age: 24,
	city: 'Boulder'
},{
	name: 'Amir',
	age: 18,
	city: 'Denver'
}]



// PROBLEM 1
// Print out the ages

for (var i=0; i<students.length; i++) {
	console.log(students[i].age);
};



// PROBLEM 2
// Print out the name, city

for (var i=0; i<students.length; i++) {
	console.log(students[i].name + ',', students[i].city);
};




// PROBLEM 3
// Print out the name "is from" city for the students form Boulder

for (var i=0; i<students.length; i++) {
	if (students[i].city === 'Boulder')
	console.log(students[i].name + ' is from', students[i].city);
};




// PROBLEM 4
// Print out the name "is older than" age for the students older than 25

for (var i=0; i<students.length; i++) {
	if (students[i].age > 25)
	console.log(students[i].name + ' is older than 25');
};