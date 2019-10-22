import CreateAccount from '../services/accounts/CreateAccount';
const createAccount = new CreateAccount
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