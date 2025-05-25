import { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './firebase';

export default function SignupModal({ show, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  // Monitor auth state
  useState(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!show) return null;

  const handleRegister = async () => {
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button 
          onClick={onClose} 
          aria-label="Chiudi"
          style={styles.closeBtn}
        >
          &times;
        </button>

        <h2 style={styles.title}>Accedi o Registrati</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.buttons}>
          {!user ? (
            <>
              <button onClick={handleLogin} style={styles.button}>Accedi</button>
              <button onClick={handleRegister} style={styles.button}>Registrati</button>
            </>
          ) : (
            <button onClick={handleLogout} style={{...styles.button, backgroundColor: '#c00'}}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 1000
  },
  modal: {
    position: 'relative',
    background: '#fff', 
    padding: 25, 
    borderRadius: 10, 
    minWidth: 320,
    maxWidth: '90vw',
    display: 'flex', 
    flexDirection: 'column', 
    gap: 15,
    color: '#222',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    background: 'transparent',
    border: 'none',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c00',
    cursor: 'pointer',
    lineHeight: 1,
  },
  title: {
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center'
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#222',
    outline: 'none',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: 6,
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: '#c00',
    fontSize: 14,
    textAlign: 'center',
    marginTop: -8,
  },
};
