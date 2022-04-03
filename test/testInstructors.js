const { faker } = require('@faker-js/faker');

let users = [];
for (let i = 0; i < 100; i++) {
  users.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password',
    accountType: 'instructor',
    avatar: null,
    tokens: [
      {
        token: faker.datatype.uuid()
      }
    ],
    location: {
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      coordinates: { lat: faker.address.latitude(47.0, 29.0), long: faker.address.longitude(-80.0, -120.0) }
    },
    instructorProfile: {
      bio: faker.lorem.paragraph(),
      rates: {
        private: faker.datatype.number({ min: 1, max: 200 }),
        group: faker.datatype.number({ min: 1, max: 200 }),
        other: [
          {
            title: faker.lorem.word(),
            rate: faker.datatype.number({ min: 1, max: 200 })
          }
        ]
      },
      lessonLocations: {
        skatepark: faker.datatype.boolean(),
        instructorsHome: faker.datatype.boolean(),
        studentsHome: faker.datatype.boolean(),
        virtual: faker.datatype.boolean()
      },
      agesTaught: {
        children: faker.datatype.boolean(),
        teens: faker.datatype.boolean(),
        adults: faker.datatype.boolean()
      },
      skillLevelsTaught: {
        beginner: faker.datatype.boolean(),
        intermediate: faker.datatype.boolean(),
        advanced: faker.datatype.boolean()
      },
      socialMediaLinks: {
        facebook: faker.internet.url(),
        instagram: faker.internet.url(),
        twitter: faker.internet.url(),
        youtube: faker.internet.url(),
        tiktok: faker.internet.url(),
        snapchat: faker.internet.url()
      }
    }
  });
}

module.exports = users;
