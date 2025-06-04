import React, { useEffect, useState, useRef } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import Header from '../components/Header/Header';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import '../components/home/home.css';

// Config Firebase
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  // altri campi...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventsCol = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCol);
        const eventsList = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList);
      } catch (error) {
        console.error('Errore caricamento eventi:', error);
      }
    }
    fetchEvents();
  }, []);

  // Autoplay ogni 4s
  useEffect(() => {
    if (events.length === 0) return;
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 4000);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, events]);

  function goPrev() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  }

  function goNext() {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % events.length
    );
  }

  return (
    <>
      <Header />
      <NavigationBar />
      <main className="home-main" style={{ maxWidth: 800, margin: '40px auto', color: 'white' }}>
        <h2 className="home-title">Welcome to the thrilling world of Wu Xing TCG!</h2>
        <p className="home-subtitle">
          As a summoner, you command powerful entities to fight for you, harness chakra to enhance your abilities, and control domains to shape the battlefield.
        </p>

        {events.length > 0 ? (
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 10 }}>
            <img
              src={events[currentIndex].imageUrl}
              alt={events[currentIndex].title || 'Evento'}
              style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: 10 }}
            />
            {events[currentIndex].title && (
              <h3 style={{ textAlign: 'center', marginTop: 10 }}>
                {events[currentIndex].title}
              </h3>
            )}

            {/* Pulsanti */}
            <button
              onClick={goPrev}
              style={{
                position: 'absolute',
                top: '50%',
                left: 10,
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                border: 'none',
                color: 'white',
                fontSize: 24,
                cursor: 'pointer',
                borderRadius: '50%',
                width: 40,
                height: 40,
              }}
              aria-label="Immagine precedente"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              style={{
                position: 'absolute',
                top: '50%',
                right: 10,
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                border: 'none',
                color: 'white',
                fontSize: 24,
                cursor: 'pointer',
                borderRadius: '50%',
                width: 40,
                height: 40,
              }}
              aria-label="Immagine successiva"
            >
              ›
            </button>
          </div>
        ) : (
          <p>Caricamento eventi...</p>
        )}
      </main>
    </>
  );
}
