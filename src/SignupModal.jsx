import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import './SignupModal.css';

export default function SignupModal({ show, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [promosConsent, setPromosConsent] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!show) return null;

  const handleRegister = async () => {
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const registeredUser = userCredential.user;

      // Salvo il consenso promozionale su Firestore
      await setDoc(doc(db, "users", registeredUser.uid), {
        email: email,
        promosConsent: promosConsent,
        createdAt: new Date()
      });

      onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
      setEmail('');
      setPassword('');
      setError('');
      setPromosConsent(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal">
        <button onClick={onClose} aria-label="Chiudi" className="signup-closeBtn">
          &times;
        </button>

        <h2 className="signup-title">Accedi o Registrati</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="signup-input"
        />

        {/* Disclaimer con link alla Privacy Policy */}
        <p className="signup-disclaimer" style={{ fontSize: '12px', color: '#555', marginBottom: '15px' }}>
          Iscrivendoti, acconsenti al trattamento dei tuoi dati personali secondo la nostra{' '}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
        </p>

        {/* Checkbox per email promozionali */}
        <label style={{ fontSize: '12px', color: '#555', display: 'block', marginBottom: '15px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={promosConsent}
            onChange={e => setPromosConsent(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Acconsento a ricevere email promozionali e offerte speciali.
        </label>

        {error && <p className="signup-error">{error}</p>}

        <div className="signup-buttons">
          {!user ? (
            <>
              <button onClick={handleLogin} className="signup-button">Accedi</button>
              <button onClick={handleRegister} className="signup-button">Registrati</button>
            </>
          ) : (
            <button onClick={handleLogout} className="signup-button logout">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
