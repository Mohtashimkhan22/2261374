const logger = {
  log: (...args) => fetch('http://localhost:8000/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ level: 'info', message: args })
  }),
  error: (...args) => fetch('http://localhost:8000/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ level: 'error', message: args })
  })
};

export default logger;