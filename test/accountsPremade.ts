import {Iaccounts} from '../server/services/models/Accounts';
import CreateAccount from '../server/services/accounts/CreateAccount';

export default async () => {
    const createAccount = new CreateAccount;
        
    let user: Iaccounts = {
        firstName: 'Dyllan',
        lastName: 'Hope',
        username: 'dyllanhope123',
        password: 'Fwgr123#',
        email: 'dyllanhope@gmail.com',
        image: '',
        active: true,
        timestamp: {
            created: 'date',
            lastSeen: 'date'
        },
        status:''
    }
    await createAccount.create(user);
    user = {
        firstName: 'John',
        lastName: 'Hope',
        username: 'johnhope123',
        password: 'Fwgr123#',
        email: 'johnhope@gmail.com',
        image: '',
        active: true,
        timestamp: {
            created: 'date',
            lastSeen: 'date'
        },
        status:''
    }
    await createAccount.create(user);
    user = {
        firstName: 'Michael',
        lastName: 'Dollman',
        username: 'Mikey',
        password: 'Fwgr123#',
        email: 'mikey@gmail.com',
        image: '',
        active: true,
        timestamp: {
            created: 'date',
            lastSeen: 'date'
        },
        status:''
    }
    await createAccount.create(user);
    user = {
        firstName: 'Chris',
        lastName: 'Green',
        username: 'ChrisCross',
        password: 'Fwgr123#',
        email: 'chris_green@gmail.com',
        image: '',
        active: true,
        timestamp: {
            created: 'date',
            lastSeen: 'date'
        },
        status:''
    }
    await createAccount.create(user);
    user = {
        firstName: 'Mark',
        lastName: 'Anderson',
        username: 'Sharkykzn',
        password: 'Fwgr123#',
        email: 'markganderson@gmail.com',
        image: '',
        active: true,
        timestamp: {
            created: 'date',
            lastSeen: 'date'
        },
        status:''
    }
    await createAccount.create(user);
    user = {
        firstName: 'Daniel',
        lastName: 'Minter',
        username: 'danielminter123',
        password: 'Fwgr123#',
        email: 'danielminter@gmail.com',
        image: '',
        active: true,
        timestamp: {
            created: 'date',
            lastSeen: 'date'
        },
        status:''
    }
    await createAccount.create(user);
}