import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import '../components/home/home.css';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);
  const [animState, setAnimState] = useState('fadeIn'); // fadeIn, fadeOut

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventsCol = collection(db, 'events');
        const q = query(eventsCol, where('home', '==', true));
        const eventsSnapshot = await getDocs(q);
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

  useEffect(() => {
    if (events.length === 0) return;
    if (isHovered) return; // ferma il timer se hover

    timeoutRef.current = setTimeout(() => {
      // Prima fadeOut
      setAnimState('fadeOut');
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
        setAnimState('fadeIn');
      }, 500); // durata animazione fadeOut
    }, 4000);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, events, isHovered]);

  function goPrev() {
    setAnimState('fadeOut');
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? events.length - 1 : prevIndex - 1
      );
      setAnimState('fadeIn');
    }, 500);
  }

  function goNext() {
    setAnimState('fadeOut');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
      setAnimState('fadeIn');
    }, 500);
  }

  if (events.length === 0) {
    return <p>Loading events...</p>;
  }

  const currentEvent = events[currentIndex];

  return (
    <main className="home-main">
      <h2 className="home-title">Welcome to the thrilling world of Wu Xing TCG!</h2>

      <div
        className={`slider-container ${animState}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={currentEvent.image}
          alt={currentEvent.title || 'Evento'}
          style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 10, display: 'block' }}
        />

        <div className="overlay-text">
          {currentEvent.title && <h3>{currentEvent.title}</h3>}
          <p className="overlay-description">{currentEvent.description}</p>
        </div>

        <button
          onClick={goPrev}
          aria-label="Previous Image"
          type="button"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          aria-label="Next Image"
          type="button"
        >
          ›
        </button>
      </div>

      <p className="home-subtitle" style={{ marginTop: 30 }}>
        As a summoner, you command powerful entities to fight for you, harness chakra to enhance your abilities, and control domains to shape the battlefield.
      </p>
    </main>
  );
}
