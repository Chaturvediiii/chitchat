import {auth, provider} from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

function Auth(props) {
    const {setIsAuth} = props
    const signInWithGoogle = async () =>{
        try{
            const result = await signInWithPopup(auth,provider)
            cookies.set("auth token", result.user.refreshToken)
            setIsAuth(true)
        } catch(err){
            console.log(err);
        }
    }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md text-white">
          <h1 className="text-2xl font-bold ">Hello there, welcome to ChitChat</h1>
          <p className="py-6">
           Join the conversation, meet new people, and make conections in one room.
          </p>
          <button onClick={signInWithGoogle} className="btn btn-primary">Login With Google</button>
        </div>
      </div>
    </div>
  )
}

export default Auth
