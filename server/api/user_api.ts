import CreateAccount from '../services/accounts/CreateAccount';
import DeletingAccount from '../services/accounts/DeletingAccount';
const createAccount = new CreateAccount;
const deleteAccount = new DeletingAccount;
export default class UserApi {

userSignUp(req,res){
    let user = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe123',
    password: '12345',
    email: 'johndoe@gmail.com',
    image: '',
    active: false,
    timestamp: {
      created: 'date',
      lastSeen: 'date'
    },
    playlists: ['house']
  }
  createAccount.create(user)
}

deleteUser(req,res){
  let user = 'johndoe123';
  deleteAccount.delete(user);
}

 
userSignIn(req,res){

}

getUserData(req,res){
    res.json({
        status:'Dummy Data',
        response:{firstname:'John',lastname:'Doe',username:'johndoe123'}
    })
}

editUserData(req,res){
    
}


}