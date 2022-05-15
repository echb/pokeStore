import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import Vue from 'vue';

const authLogged = Vue.observable({
  isLogged: false
});


const login = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(getAuth(), email, password)
  } catch (error) {
    return false
  }
}

const SignUp = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(getAuth(), email, password)
  } catch (error) {
    return false
  }
}

const logOut = () => {
  signOut(getAuth())
}


const authChanged = () => {
  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      authLogged.isLogged = true
    } else {
      authLogged.isLogged = false
    }
  })

}

const getCurrentUser = () => {
  return new Promise((res, rej) => {
    const removes = onAuthStateChanged(
      getAuth(), (user) => {
        removes()
        res(user)
      },
      rej
    )
  })
}


export {
  SignUp,
  login,
  logOut,
  authChanged,
  getCurrentUser,
  authLogged,
}