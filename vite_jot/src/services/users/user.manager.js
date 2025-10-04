class User{
    constructor(){

    }
    async authWithGoogle(){
        window.location.href = "http://localhost:3000/user/googleAuth"
    }
}

const user = new User()

export default user