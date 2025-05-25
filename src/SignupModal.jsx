// src/components/SignupModal.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function SignupModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onClose(); // chiudi il popup
    } catch (err) {
      alert("Errore registrazione: " + err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose(); // chiudi il popup
    } catch (err) {
      alert("Errore login: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl mb-4">Registrati o Accedi</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2">
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Accedi
          </button>
          <button onClick={handleSignup} className="bg-green-500 text-white px-4 py-2 rounded w-full">
            Registrati
          </button>
        </div>
      </div>
    </div>
  );
}
