// Aggiungo className alle colonne nella <thead> e <tbody> per gestire larghezze
<thead>
  <tr>
    <th>Titolo</th>
    <th>Descrizione</th>
    <th className="col-image-url">Immagine</th> {/* più larga */}
    <th className="col-date">Data</th>           {/* più stretta */}
    <th>Ora</th>
    <th>In evidenza</th>
    <th className="col-action">Azioni</th>       {/* stretta */}
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
        />
      </td>
      <td>
        <textarea
          value={e.description}
          onChange={(ev) => updateEventLocally(e.id, 'description', ev.target.value)}
          rows={2}
        />
      </td>
      <td className="col-image-url">
        <input
          value={e.image}
          onChange={(ev) => updateEventLocally(e.id, 'image', ev.target.value)}
          style={{ width: '100%' }}
        />
      </td>
      <td className="col-date">
        <input
          type="date"
          value={e.date}
          onChange={(ev) => updateEventLocally(e.id, 'date', ev.target.value)}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="time"
          value={e.time}
          onChange={(ev) => updateEventLocally(e.id, 'time', ev.target.value)}
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={e.featured}
          onChange={(ev) => updateEventLocally(e.id, 'featured', ev.target.checked)}
        />
      </td>
      <td className="col-action">
        <button onClick={() => removeEvent(e.id)}>🗑</button>
      </td>
    </tr>
  ))}
</tbody>
