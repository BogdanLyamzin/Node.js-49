const createUser = ({name, lastName, birdthday}) => {
    return {
        name,
        lastName,
        fullName: `${name} ${lastName}`,
        age: 42
    }
}

module.exports = createUser;

const user = createUser({name: "Alex", lastName:"Regent"});
if(Object.keys(user).length === 3) {
    
}