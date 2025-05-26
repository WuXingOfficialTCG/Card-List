import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig"; // usa il tuo file firebaseConfig

const handleRegister = async () => {
  setError('');
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Salvataggio dati extra su Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      promosConsent: promosConsent,
      createdAt: new Date()
    });

    onSuccess();
  } catch (err) {
    setError(err.message);
  }
};
