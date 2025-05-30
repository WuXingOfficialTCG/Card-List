import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Events.css';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(data);
      } catch (err) {
        console.error('Errore nel caricamento eventi:', err);
      }
    };

    fetchEvents();
  }, []);

  const featured = events.filter(e => e.featured);

  // Cambia slide ogni 4 secondi
  useEffect(() => {
    if (featured.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featured.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [featured]);

  return (
    <>
      <Header />
      <NavigationBar />

      <div className="events-container">
        {/* SLIDER FATTO A MANO */}
        {featured.length > 0 && (
          <div className="custom-slider">
            {featured.map((event, index) => (
              <div
                key={event.id}
                className={`custom-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${event.image})` }}
              >
                <h2>{event.title}</h2>
              </div>
            ))}
            <div className="custom-dots">
              {featured.map((_, index) => (
                <button
                  key={index}
                  className={index === currentSlide ? 'active' : ''}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        )}

        {/* GRIGLIA EVENTI */}
        <h2 className="events-grid-title">Tutti gli eventi</h2>
        <div className="events-grid">
          {events.map(event => (
            <div className="event-card" key={event.id}>
              <div
                className="event-card-image"
                style={{ backgroundImage: `url(${event.image})` }}
              />
              <div className="event-card-content">
                <strong>{event.title}</strong>
                {event.date && <p>{event.date}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
