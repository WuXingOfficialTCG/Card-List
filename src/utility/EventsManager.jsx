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
      <table className="admin-table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '15%' }}>Titolo</th>
            <th style={{ width: '25%' }}>Descrizione</th>
            <th style={{ width: '20%' }}>Immagine (URL)</th>
            <th style={{ width: '10%' }}>Data</th>
            <th style={{ width: '10%' }}>Ora</th>
            <th style={{ width: '10%' }}>In evidenza</th>
            <th style={{ width: '10%' }}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <td>
                <textarea
                  value={e.title}
                  onChange={(ev) => updateEventLocally(e.id, 'title', ev.target.value)}
                  rows={2}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <textarea
                  value={e.description}
                  onChange={(ev) => updateEventLocally(e.id, 'description', ev.target.value)}
                  rows={2}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={e.image}
                  onChange={(ev) => updateEventLocally(e.id, 'image', ev.target.value)}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={e.date}
                  onChange={(ev) => updateEventLocally(e.id, 'date', ev.target.value)}
                  style={{ width: '90%' }}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={e.time}
                  onChange={(ev) => updateEventLocally(e.id, 'time', ev.target.value)}
                  style={{ width: '90%' }}
                />
              </td>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={e.featured}
                  onChange={(ev) => updateEventLocally(e.id, 'featured', ev.target.checked)}
                />
              </td>
              <td>
                <button
                  onClick={() => removeEvent(e.id)}
                  style={{ width: '100%' }}
                  title="Elimina evento"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
