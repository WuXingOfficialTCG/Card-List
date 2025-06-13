import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (featured.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featured.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [featured]);

  const colorThemes = ['theme-a', 'theme-b', 'theme-c', 'theme-d', 'theme-e'];

  return (
    <div className="events-container">
      {featured.length > 0 && (
        <div className="custom-slider" role="region" aria-label="Slider eventi in evidenza">
          {featured.map((event, index) => (
            <div
              key={event.id}
              id={`slide-${index}`}
              className={`custom-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${event.image})` }}
              tabIndex={index === currentSlide ? 0 : -1}
              aria-hidden={index !== currentSlide}
              aria-label={`Slide: ${event.title}`}
            >
              <div className="slide-info">
                <h2>{event.title}</h2>
                <div className="extra-info">
                  {event.date && <p className="event-date">{event.date}</p>}
                  {event.description && <p className="event-description">{event.description}</p>}
                </div>
              </div>
            </div>
          ))}

          <div className="custom-dots" role="tablist" aria-label="Seleziona slide evento">
            {featured.map((event, index) => (
              <button
                key={index}
                className={index === currentSlide ? 'active' : ''}
                onClick={() => setCurrentSlide(index)}
                role="tab"
                aria-selected={index === currentSlide}
                aria-controls={`slide-${index}`}
                id={`tab-${index}`}
                tabIndex={index === currentSlide ? 0 : -1}
                aria-label={`Vai alla slide ${index + 1}`}
                style={{ backgroundImage: `url(${event.image})` }}
              />
            ))}
          </div>
        </div>
      )}

      <h2 className="events-grid-title">Tutti gli eventi</h2>
      <div className="events-grid">
        {events.map((event, idx) => (
          <div
            className={`event-card ${colorThemes[idx % colorThemes.length]}`}
            key={event.id}
            tabIndex={0}
            aria-label={`Evento: ${event.title}`}
          >
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
  );
}
