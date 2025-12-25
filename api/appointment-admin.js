// api/appointment-admin.js
// Aquí concentramos la lógica de administración de citas (CRUD) usando Supabase.
// Este archivo expone un endpoint protegido para listar / crear / actualizar / borrar citas
// y además exporta funciones reutilizables (por ejemplo createAppointment) para otros endpoints.

const { createClient } = require('@supabase/supabase-js');

// --- Configuración de Supabase ---
// Usamos variables de entorno que configurarás en Vercel.
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  // Lanzamos un error temprano para que sepas si falta algo en la configuración.
  throw new Error('Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en las variables de entorno');
}

// Cliente de Supabase con la clave de servicio (solo debe usarse en backend).
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// --- Helpers de validación ---

function isValidEmail(email) {
  if (!email) return false;
  // Validación sencilla de email.
  return /.+@.+\..+/.test(email);
}

function validateAppointmentPayload(payload) {
  const requiredFields = [
    'date',
    'time',
    'requester_name',
    'company_name',
    'company_location',
    'phone',
    'email',
    'reason',
  ];

  for (const field of requiredFields) {
    if (!payload[field] || String(payload[field]).trim() === '') {
      throw new Error(`El campo "${field}" es obligatorio`);
    }
  }

  if (!isValidEmail(payload.email)) {
    throw new Error('El correo electrónico no es válido');
  }
}

// --- Funciones principales de negocio (CRUD) ---

/**
 * Crea una nueva cita en la tabla appointments.
 * @param {Object} payload - Datos de la cita.
 */
async function createAppointment(payload) {
  validateAppointmentPayload(payload);

  const appointmentData = {
    date: payload.date,
    time: payload.time,
    requester_name: payload.requester_name,
    company_name: payload.company_name,
    company_location: payload.company_location,
    phone: payload.phone,
    email: payload.email,
    reason: payload.reason,
    status: payload.status || 'pending',
  };

  const { data, error } = await supabase
    .from('appointments')
    .insert(appointmentData)
    .select()
    .single();

  if (error) {
    console.error('Error al crear cita en Supabase:', error);
    throw new Error('No se pudo guardar la cita en la base de datos');
  }

  return data;
}

/**
 * Lista todas las citas ordenadas por fecha y hora.
 */
async function listAppointments() {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error) {
    console.error('Error al listar citas en Supabase:', error);
    throw new Error('No se pudieron obtener las citas');
  }

  return data;
}

/**
 * Actualiza una cita existente.
 */
async function updateAppointment(id, updates) {
  if (!id) {
    throw new Error('Falta el id de la cita a actualizar');
  }

  const { data, error } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar la cita en Supabase:', error);
    throw new Error('No se pudo actualizar la cita');
  }

  return data;
}

/**
 * Elimina una cita.
 */
async function deleteAppointment(id) {
  if (!id) {
    throw new Error('Falta el id de la cita a eliminar');
  }

  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al eliminar la cita en Supabase:', error);
    throw new Error('No se pudo eliminar la cita');
  }
}

// --- Autenticación simple para el endpoint admin ---

function isAuthorizedAdmin(req) {
  const header = req.headers['authorization'] || req.headers['Authorization'];
  if (!header) return false;

  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) return false;

  return token === process.env.ADMIN_SECRET;
}

// --- Handler principal del endpoint /api/appointment-admin ---

module.exports = async function handler(req, res) {
  if (!isAuthorizedAdmin(req)) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const { method, query, body } = req;

  try {
    if (method === 'GET') {
      // Listar citas
      const appointments = await listAppointments();
      return res.status(200).json(appointments);
    }

    if (method === 'POST') {
      // Crear cita desde el panel admin
      const created = await createAppointment(body || {});
      return res.status(201).json(created);
    }

    if (method === 'PUT' || method === 'PATCH') {
      // Actualizar cita existente
      const id = query.id || (body && body.id);
      if (!id) {
        return res.status(400).json({ error: 'Falta el id de la cita en la query o en el body' });
      }

      const updates = { ...body };
      delete updates.id; // Evitamos que se actualice el id.

      const updated = await updateAppointment(id, updates);
      return res.status(200).json(updated);
    }

    if (method === 'DELETE') {
      // Borrar cita
      const id = query.id;
      if (!id) {
        return res.status(400).json({ error: 'Falta el id de la cita en la query ?id=' });
      }

      await deleteAppointment(id);
      return res.status(204).end();
    }

    // Si llega aquí, el método no está permitido
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
    return res.status(405).json({ error: 'Método no permitido' });
  } catch (err) {
    console.error('Error en /api/appointment-admin:', err);
    return res.status(500).json({ error: err.message || 'Error interno del servidor' });
  }
};

// Exportamos funciones para reutilizarlas desde otros endpoints (por ejemplo create-appointment).
module.exports.createAppointment = createAppointment;
module.exports.listAppointments = listAppointments;
module.exports.updateAppointment = updateAppointment;
module.exports.deleteAppointment = deleteAppointment;