import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Disclaimer() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sections = [
    { id: 'raccolta', label: '1. Raccolta dei dati' },
    { id: 'utilizzo', label: '2. Utilizzo dei dati' },
    { id: 'conservazione', label: '3. Conservazione dei dati' },
    { id: 'condivisione', label: '4. Condivisione dei dati' },
    { id: 'diritti', label: '5. Diritti dell’utente' },
    { id: 'cookie', label: '6. Cookie' },
    { id: 'responsabilita', label: '7. Limitazioni di responsabilità' },
    { id: 'modifiche', label: '8. Modifiche al disclaimer' },
  ];

  const handleJump = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        color: 'white',
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Sidebar or Dropdown */}
      <div
        style={{
          width: isMobile ? '100%' : '220px',
          marginBottom: isMobile ? '20px' : 0,
          borderRight: isMobile ? 'none' : '1px solid #444',
          padding: isMobile ? '0 10px' : '0 20px 0 0',
          background: isMobile ? 'transparent' : '#1a1a1a',
          position: isMobile ? 'static' : 'sticky',
          top: 20,
          alignSelf: 'flex-start',
          height: isMobile ? 'auto' : 'calc(100vh - 40px)',
          overflowY: isMobile ? 'visible' : 'auto',
        }}
      >
        {isMobile ? (
          <select
            onChange={(e) => handleJump(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#121212',
              color: '#fff',
              border: '1px solid #444',
              borderRadius: '4px',
            }}
          >
            <option value="">Salta a...</option>
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        ) : (
          <nav>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Salta a</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {sections.map((s) => (
                <li
                  key={s.id}
                  style={{
                    marginBottom: '8px',
                    cursor: 'pointer',
                    color: '#4caf50',
                    userSelect: 'none',
                  }}
                  onClick={() => handleJump(s.id)}
                >
                  {s.label}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          maxWidth: '900px',
          lineHeight: '1.6',
        }}
      >
        <h1>Disclaimer / Privacy Policy</h1>

        <p>
          La protezione dei tuoi dati personali è importante per noi. Questa pagina
          spiega come raccogliamo, utilizziamo e proteggiamo le informazioni che ci
          fornisci tramite il nostro sito.
        </p>

        <h2 id="raccolta">1. Raccolta dei dati</h2>
        <p>
          Quando ti registri o utilizzi i nostri servizi, potremmo raccogliere dati
          come il tuo indirizzo email e altre informazioni che decidi di fornire.
        </p>

        <h2 id="utilizzo">2. Utilizzo dei dati</h2>
        <p>
          I dati raccolti vengono utilizzati esclusivamente per fornirti i servizi
          richiesti, migliorare l’esperienza utente e comunicarti informazioni
          rilevanti, come aggiornamenti o novità.
        </p>

        <h2 id="conservazione">3. Conservazione dei dati</h2>
        <p>
          I tuoi dati saranno conservati in modo sicuro e per il tempo strettamente
          necessario a garantire il corretto funzionamento del servizio.
        </p>

        <h2 id="condivisione">4. Condivisione dei dati</h2>
        <p>
          Non condividiamo i tuoi dati con terze parti senza il tuo esplicito
          consenso, salvo obblighi di legge.
        </p>

        <h2 id="diritti">5. Diritti dell’utente</h2>
        <p>
          Hai il diritto di accedere, modificare o cancellare i tuoi dati personali in
          qualsiasi momento, contattandoci tramite i recapiti forniti sul sito.
        </p>

        <h2 id="cookie">6. Cookie</h2>
        <p>
          Utilizziamo cookie tecnici e, con il tuo consenso, cookie di profilazione per
          migliorare la navigazione e i servizi offerti.
        </p>

        <h2 id="responsabilita">7. Limitazioni di responsabilità</h2>
        <p>
          Il sito è fornito “così com’è” senza garanzie di alcun tipo. Non ci
          assumiamo responsabilità per eventuali danni derivanti dall’uso o
          dall’impossibilità di usare il sito o i suoi servizi.
        </p>

        <h2 id="modifiche">8. Modifiche al disclaimer</h2>
        <p>
          Ci riserviamo il diritto di aggiornare o modificare questo disclaimer in
          qualsiasi momento. Ti invitiamo a consultare periodicamente questa pagina
          per eventuali cambiamenti.
        </p>

        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '6px',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Torna indietro
        </button>
      </div>
    </div>
  );
}
