// context/AuthContext.jsx
import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(""); // ✅ for name

  // Google Sign In
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // Firebase provides displayName
    setUserName(result.user.displayName);
    return result;
  };

  // Email/Password Signup
  const signUp = async (email, password, name) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // ✅ Update displayName in Firebase
    await updateProfile(result.user, { displayName: name });
    setUserName(name);
    return result;
  };

  // Email/Password Login
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // Firebase already has displayName if set
    setUserName(result.user.displayName || "");
    return result;
  };

  // Logout
  const logOut = () => {
    setUserName("");
    return signOut(auth);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserName(currentUser.displayName || "");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userName, googleSignIn, signUp, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
