/**
 * Lists weather records the user has manually submitted, with a delete
 * action for each one. Purely presentational — state lives in App.
 */
function SavedEntries({ entries, onSelect, onDelete }) {
  if (entries.length === 0) {
    return null
  }

  return (
    <section className="card">
      <h2 className="card__title">Your saved entries</h2>
      <ul className="saved-list">
        {entries.map((entry) => (
          <li key={entry.id} className="saved-list__item">
            <button type="button" className="saved-list__info" onClick={() => onSelect(entry)}>
              <span className="saved-list__city">{entry.city}</span>
              <span className="saved-list__meta">
                {entry.temperature}°C · {entry.condition}
              </span>
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--danger"
              onClick={() => onDelete(entry.id)}
              aria-label={`Delete ${entry.city}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SavedEntries
