// api/health.js
// Pequeño endpoint para comprobar que las funciones serverless están respondiendo.
// Cuando hagas una petición GET a /api/health debería devolver { ok: true }.

module.exports = (req, res) => {
  res.status(200).json({ ok: true });
};