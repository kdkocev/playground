// Interface and type can generally be used interchangably
// This compiles properly
var userT1 = { email: 'test@hacksoft.io', admin: false };
var userI1 = userT1;
var user1 = {
    email: 'test@hacksoft.io',
    isAdmin: false,
    fullName: 'Test User'
};
console.log(JSON.stringify(user1));
