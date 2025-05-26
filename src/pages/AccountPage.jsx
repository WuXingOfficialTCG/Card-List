import {
  logout,
  deleteAccount,
  updatePromosConsent
} from '../utility/accountUtils'; // ✅ Import funzioni

// ...

<button onClick={() => logout(navigate)}>Logout</button>
<button
  onClick={() => deleteAccount(user, navigate)}
  style={{ backgroundColor: 'red', color: 'white' }}
>
  Elimina account
</button>
<button onClick={() => updatePromosConsent(user, promosConsent)}>
  Salva preferenza
</button>
