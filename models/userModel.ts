const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
];

const userModel = {

  /* FIX ME (types) Done */
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  /* FIX ME (types) Done */
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
  },
  findOrCreate:(profile:{id:string, username:string; email?:string}) =>{
    let user = database.find((user) => user.email === profile.id);
    if (!user) {
      const newUser = {
        id: database.length + 1,
        name: profile.username,
        email: profile.email || '',
        password:"",
        role:"",
      };
      database.push(newUser);
      user = newUser;
    }
    return user;
  },
};

export { database, userModel };
