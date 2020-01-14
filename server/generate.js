var faker = require('faker');

var database = { messages: [], authors: [] };

for (var i = 1; i <= 10; i++) {
  database.authors.push({
    id: i,
    name: [faker.name.firstName(), faker.name.lastName()].join(' '),
    info: faker.lorem.paragraph(10),
    imageUrl: faker.image.avatar()
  });
}

for (var i = 1; i <= 100; i++) {
  var randomAuthor = database.authors[faker.random.number(9)];
  database.messages.push({
    id: i,
    createdDate: faker.date.past(1),
    text: faker.lorem.sentences(),
    authorId: randomAuthor.id,
    authorName: randomAuthor.name,
  });
}

console.log(JSON.stringify(database));
