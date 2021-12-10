import { User } from '../../users/entities/user.entity'

export default class TestUtil{
    static validUser(): User{
        const user = new User()
        user.id = '1'
        user.name = 'André'
        user.email = 'andre@mail.com'
        user.password = 'password'
        user.bets = []
        user.userPermission = []
        return user
    }
}