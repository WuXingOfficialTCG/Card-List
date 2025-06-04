import React, { useEffect, useState } from 'react';
import {
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from '../utility/firebaseHelpers';

export default function EventsManager() {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      const list = await fetchEvents();
      setEvents(list);
      setLoadingEvents(false);
    };
    loadEvents();
  }, []);

  const addNewEvent = async () => {
    const newEvent = {
      title: '',
      description: '',
      image: '',
      date: '',
      time: '',
      featured: false,
      home: false,  // aggiunto campo home
    };
    const added = await addEvent(newEvent);
    setEvents([...events, added]);
  };

  const updateEventLocally = (id, field, value) => {
    setEvents(events.map(e => (e.id === id ? { ...e, [field]: value } : e)));
    setChanges(true);
  };

  const saveAllChanges = async () => {
    for (const e of events) {
      const { id, ...data } = e;
      await updateEvent(id, data);
    }
    setChanges(false);
    alert('Modifiche eventi salvate.');
  };

  const removeEvent = async (id) => {
    await deleteEvent(id);
    setEvents(events.filter(e => e.id !== id));
  };

  if (loadingEvents) return <div>Caricamento eventi...</div>;

  return (
    <>
      <h2>Gestione Eventi (Admin)</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={addNewEvent}>➕ Aggiungi evento</button>
        {changes && (
          <button onClick={saveAllChanges} className="save-button" style={{ minWidth: 120 }}>
            💾 Salva modifiche
          </button>
        )}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {events.map((e) => (
          <div
            key={e.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              padding: 16,
              width: 320,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              backgroundColor: '#fff',
            }}
          >
            <textarea
              placeholder="Titolo"
              value={e.title}
              onChange={(ev) => updateEventLocally(e.id, 'title', ev.target.value)}
              rows={2}
              style={{ width: '100%', resize: 'vertical', fontWeight: 'bold', fontSize: 16 }}
            />
            <textarea
              placeholder="Descrizione"
              value={e.description}
              onChange={(ev) => updateEventLocally(e.id, 'description', ev.target.value)}
              rows={3}
              style={{ width: '100%', resize: 'vertical' }}
            />
            <input
              type="text"
              placeholder="URL immagine"
              value={e.image}
              onChange={(ev) => updateEventLocally(e.id, 'image', ev.target.value)}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
              <input
                type="date"
                value={e.date}
                onChange={(ev) => updateEventLocally(e.id, 'date', ev.target.value)}
                style={{ flex: 1 }}
              />
              <input
                type="time"
                value={e.time}
                onChange={(ev) => updateEventLocally(e.id, 'time', ev.target.value)}
                style={{ flex: 1 }}
              />
            </div>
            <div style={{ display: 'flex', gap: 15, justifyContent: 'space-between', alignItems: 'center' }}>
              <label>
                <input
                  type="checkbox"
                  checked={e.featured}
                  onChange={(ev) => updateEventLocally(e.id, 'featured', ev.target.checked)}
                />{' '}
                In evidenza
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={e.home}
                  onChange={(ev) => updateEventLocally(e.id, 'home', ev.target.checked)}
                />{' '}
                Homepage
              </label>
              <button
                onClick={() => removeEvent(e.id)}
                title="Elimina evento"
                style={{
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
