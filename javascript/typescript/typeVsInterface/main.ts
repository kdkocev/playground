// Interface and type can generally be used interchangably

type TUser = {
  email: string;
  isAdmin: boolean
}

interface IUser {
  email: string;
  isAdmin: boolean;
}

// This compiles properly
const userT1 = {email: 'test@hacksoft.io', admin: false};
const userI1 = userT1;

// With one specific difference.

// Below does not compile because of "Duplicate identifier TUser"

// type TUser = {
//   fullName: string
// }


// Bellow one compiles and extends the exsiting definition of IUser with an additional field
interface IUser {
  fullName: string;
}

const user1: IUser = {
  email: 'test@hacksoft.io',
  isAdmin: false,
  fullName: 'Test User'
}

console.log(JSON.stringify(user1))
