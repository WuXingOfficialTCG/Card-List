import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import '../components/home/home.css';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  // Per gestire animazione slide out/in
  // direzione: 'left' o 'right'
  const [animDirection, setAnimDirection] = useState('left'); 
  const [animStage, setAnimStage] = useState('idle'); // idle, animatingOut, animatingIn

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
    if (isHovered || animStage !== 'idle') return; // ferma timer se hover o animazione in corso

    timeoutRef.current = setTimeout(() => {
      slideToNext();
    }, 4000);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, events, isHovered, animStage]);

  function slideToNext() {
    setAnimDirection('left');
    setAnimStage('animatingOut');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
      setAnimStage('animatingIn');
    }, 500); // durata animazione out
    setTimeout(() => {
      setAnimStage('idle');
    }, 1000); // durata totale animazioni out + in
  }

  function goPrev() {
    if (animStage !== 'idle') return; // blocca click se animazione in corso
    setAnimDirection('right');
    setAnimStage('animatingOut');
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? events.length - 1 : prevIndex - 1
      );
      setAnimStage('animatingIn');
    }, 500);
    setTimeout(() => {
      setAnimStage('idle');
    }, 1000);
  }

  function goNext() {
    if (animStage !== 'idle') return;
    setAnimDirection('left');
    setAnimStage('animatingOut');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
      setAnimStage('animatingIn');
    }, 500);
    setTimeout(() => {
      setAnimStage('idle');
    }, 1000);
  }

  if (events.length === 0) {
    return <p>Loading events...</p>;
  }

  const currentEvent = events[currentIndex];

  // Determina classi animazione per immagine
  let imgClass = 'slider-image';

  if (animStage === 'animatingOut') {
    imgClass += animDirection === 'left' ? ' slide-out-left' : ' slide-out-right';
  } else if (animStage === 'animatingIn') {
    imgClass += animDirection === 'left' ? ' slide-in-right' : ' slide-in-left';
  }

  return (
    <main className="home-main">
      <h2 className="home-title">Welcome to the thrilling world of Wu Xing TCG!</h2>

      <div
        className="slider-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={currentEvent.image}
          alt={currentEvent.title || 'Evento'}
          className={imgClass}
          draggable={false}
        />

        <div className="overlay-bar" aria-live="polite">
          {currentEvent.title && <h3>{currentEvent.title}</h3>}
          <p>{currentEvent.description}</p>
        </div>

        <button
          onClick={goPrev}
          aria-label="Previous Image"
          type="button"
          disabled={animStage !== 'idle'}
        >
          ‹
        </button>
        <button
          onClick={goNext}
          aria-label="Next Image"
          type="button"
          disabled={animStage !== 'idle'}
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
