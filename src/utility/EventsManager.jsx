import React, { useEffect, useState } from 'react';
import {
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from '../utility/firebaseHelpers';

export default function EventsManager() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchEvents();
      setEvents(data);
      setLoading(false);
    };
    load();
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  const handleChange = (id, field, value) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
    setHasChanges(true);
  };

  const handleAdd = async () => {
    const newEvent = {
      title: '',
      description: '',
      image: '',
      date: '',
      time: '',
      featured: false,
      home: false,
    };
    const added = await addEvent(newEvent);
    setEvents((prev) => [...prev, added]);
    setExpandedIds((prev) => new Set(prev).add(added.id));
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setExpandedIds((prev) => {
      const copy = new Set(prev);
      copy.delete(id);
      return copy;
    });
  };

  const saveChanges = async () => {
    for (const e of events) {
      const { id, ...data } = e;
      await updateEvent(id, data);
    }
    setHasChanges(false);
    alert('Modifiche eventi salvate.');
  };

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const updated = [...events];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, moved);

    setEvents(updated);
    setDraggedIndex(null);
    setHasChanges(true);
  };

  if (loading) return <div>Caricamento eventi...</div>;

  return (
    <>
      <h2>Gestione Eventi (Admin)</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button onClick={handleAdd}>➕ Aggiungi evento</button>
        {hasChanges && (
          <button
            onClick={saveChanges}
            className="save-button"
            style={{ minWidth: 140 }}
          >
            💾 Salva modifiche
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {events.map((e, index) => {
          const isOpen = expandedIds.has(e.id);

          return (
            <div
              key={e.id}
              draggable
              onDragStart={() => setDraggedIndex(index)}
              onDragOver={(ev) => ev.preventDefault()}
              onDrop={() => handleDrop(index)}
              style={{
                border: '1px solid #ccc',
                borderRadius: 8,
                padding: 16,
                width: 320,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                cursor: 'grab',
              }}
            >
              <div
                onClick={() => toggleExpand(e.id)}
                style={{
                  fontSize: 16,
                  fontWeight: isOpen ? 'bold' : 'normal',
                  color: '#000',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  userSelect: 'none',
                }}
                title="Clicca per espandere o comprimere"
              >
                {e.title || '(Titolo vuoto)'}
                <span style={{ fontSize: 20 }}>{isOpen ? '▲' : '▼'}</span>
              </div>

              {isOpen && (
                <>
                  <textarea
                    placeholder="Titolo"
                    value={e.title}
                    onChange={(ev) => handleChange(e.id, 'title', ev.target.value)}
                    rows={2}
                    style={{ width: '100%', resize: 'vertical', fontSize: 16, fontWeight: 'bold' }}
                  />
                  <textarea
                    placeholder="Descrizione"
                    value={e.description}
                    onChange={(ev) => handleChange(e.id, 'description', ev.target.value)}
                    rows={3}
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                  <input
                    type="text"
                    placeholder="URL immagine"
                    value={e.image}
                    onChange={(ev) => handleChange(e.id, 'image', ev.target.value)}
                    style={{ width: '100%' }}
                  />
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input
                      type="date"
                      value={e.date}
                      onChange={(ev) => handleChange(e.id, 'date', ev.target.value)}
                      style={{ flex: 1 }}
                    />
                    <input
                      type="time"
                      value={e.time}
                      onChange={(ev) => handleChange(e.id, 'time', ev.target.value)}
                      style={{ flex: 1 }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 10,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <label style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#000' }}>
                      <input
                        type="checkbox"
                        checked={e.featured}
                        onChange={(ev) => handleChange(e.id, 'featured', ev.target.checked)}
                      />
                      In evidenza
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#000' }}>
                      <input
                        type="checkbox"
                        checked={e.home}
                        onChange={(ev) => handleChange(e.id, 'home', ev.target.checked)}
                      />
                      Homepage
                    </label>
                    <button
                      onClick={() => handleDelete(e.id)}
                      title="Elimina evento"
                      style={{
                        backgroundColor: '#e74c3c',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        padding: '6px 10px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
