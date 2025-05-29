import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Slider from 'react-slick';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Events.css';

export default function Events() {
  const [events, setEvents] = useState([]);

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

  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    pauseOnHover: false
  };

  return (
    <>
      <Header />
      <NavigationBar />

      <div className="events-container">
        {/* SLIDER */}
        {featured.length > 0 && (
          <Slider {...sliderSettings} className="event-slider">
            {featured.map(event => (
              <div
                key={event.id}
                style={{ backgroundImage: `url(${event.image})` }}
              >
                <h2>{event.title}</h2>
              </div>
            ))}
          </Slider>
        )}

        {/* GRIGLIA */}
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
