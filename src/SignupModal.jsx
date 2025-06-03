import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
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

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!show) return null;

  const handleRegister = async () => {
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'users', uid), {
        email,
        promosConsent
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
    <div className="signup-overlay" onClick={onClose}>
      <div className="signup-modal" onClick={e => e.stopPropagation()}>
        <div
          className="signup-closeBtn-wrapper"
          onClick={onClose}
          role="button"
          tabIndex={0}
          aria-label="Chiudi"
          onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') onClose(); }}
        >
          <button className="signup-closeBtn" tabIndex={-1}>&times;</button>
        </div>

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

        <p className="signup-disclaimer">
          Iscrivendoti, acconsenti al trattamento dei tuoi dati personali secondo la nostra{' '}
          <Link to="/disclaimer">Privacy Policy</Link>.
        </p>

        <label className="signup-checkbox-wrapper" htmlFor="promosConsent">
          <input
            type="checkbox"
            id="promosConsent"
            checked={promosConsent}
            onChange={e => setPromosConsent(e.target.checked)}
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
