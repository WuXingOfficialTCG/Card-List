import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import '../components/home/home.css';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [animDirection, setAnimDirection] = useState('right'); // 'right' or 'left'
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventsCol = collection(db, 'events');
        const q = query(eventsCol, where('home', '==', true));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(list);
      } catch (err) {
        console.error('Errore caricamento eventi:', err);
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length === 0 || isHovered || animating) return;

    timeoutRef.current = setTimeout(() => goNext(), 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, events, isHovered, animating]);

  const goNext = () => {
    if (animating) return;
    const next = (currentIndex + 1) % events.length;
    triggerSlide(next, 'right');
  };

  const goPrev = () => {
    if (animating) return;
    const next = (currentIndex - 1 + events.length) % events.length;
    triggerSlide(next, 'left');
  };

  const triggerSlide = (next, direction) => {
    setNextIndex(next);
    setAnimDirection(direction);
    setAnimating(true);

    setTimeout(() => {
      setCurrentIndex(next);
      setNextIndex(null);
      setAnimating(false);
    }, 500);
  };

  const currentEvent = events[currentIndex];
  const nextEvent = nextIndex !== null ? events[nextIndex] : null;

  return (
    <main className="home-main">
      <h2 className="home-title">Welcome to the thrilling world of Wu Xing TCG!</h2>
      <p className="home-subtitle">
        As a summoner, you command powerful entities to fight for you, harness chakra to enhance your abilities, and control domains to shape the battlefield.
      </p>

      <div
        className="slider-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          key={currentEvent.id}
          src={currentEvent.image}
          alt={currentEvent.title}
          className={`slider-image ${
            animating
              ? animDirection === 'right'
                ? 'slide-out-right'   // esce a destra
                : 'slide-out-left'    // esce a sinistra
              : ''
          }`}
          draggable={false}
        />

        {nextEvent && (
          <img
            key={nextEvent.id}
            src={nextEvent.image}
            alt={nextEvent.title}
            className={`slider-image ${
              animDirection === 'right'
                ? 'slide-in-left'     // entra da sinistra
                : 'slide-in-right'    // entra da destra
            }`}
            draggable={false}
          />
        )}

        <div className="overlay-bar" aria-live="polite">
          <h3>{currentEvent.title}</h3>
          <p>{currentEvent.description}</p>
        </div>

        <button onClick={goPrev} disabled={animating} aria-label="Previous">
          ‹
        </button>
        <button onClick={goNext} disabled={animating} aria-label="Next">
          ›
        </button>
      </div>

      <div className="rulebook-container">
        <button className="rulebook-button" onClick={() => (window.location.href = '/rulebook')}>
          Rulebook
        </button>
      </div>
    </main>
  );
}
