// api/create-appointment.js
// Endpoint PÚBLICO que recibe los datos del formulario de agendamiento,
// crea la cita en Supabase y envía un correo de notificación a tu Gmail.

const nodemailer = require('nodemailer');
const { createAppointment } = require('./appointment-admin');

// --- Configuración de correo (Gmail mediante SMTP) ---
// Necesitas definir estas variables de entorno en Vercel:
// - SMTP_HOST (por ejemplo: smtp.gmail.com)
// - SMTP_PORT (por ejemplo: 465 o 587)
// - SMTP_USER (tu correo Gmail)
// - SMTP_PASS (contraseña de aplicación de Gmail)
// - APPOINTMENT_TARGET_EMAIL (correo donde quieres recibir las notificaciones; puede ser el mismo que SMTP_USER)

function createTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('Faltan variables de entorno SMTP (HOST, PORT, USER o PASS)');
  }

  const port = Number(SMTP_PORT);

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // true para 465, false usualmente para 587
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

async function sendNotificationEmail(appointment) {
  const transporter = createTransport();

  const targetEmail = process.env.APPOINTMENT_TARGET_EMAIL || process.env.SMTP_USER;

  const { date, time, requester_name, company_name, company_location, phone, email, reason } = appointment;

  const subject = 'Nueva cita agendada desde Cruiserex';

  const text = `Se ha creado una nueva cita:\n\n` +
    `Fecha: ${date}\n` +
    `Hora: ${time}\n` +
    `Nombre del solicitante: ${requester_name}\n` +
    `Empresa: ${company_name}\n` +
    `Ubicación: ${company_location}\n` +
    `Teléfono: ${phone}\n` +
    `Correo: ${email}\n` +
    `Motivo: ${reason}\n`;

  const html = `
    <h2>Nueva cita agendada</h2>
    <p><strong>Fecha:</strong> ${date}</p>
    <p><strong>Hora:</strong> ${time}</p>
    <p><strong>Nombre del solicitante:</strong> ${requester_name}</p>
    <p><strong>Empresa:</strong> ${company_name}</p>
    <p><strong>Ubicación:</strong> ${company_location}</p>
    <p><strong>Teléfono:</strong> ${phone}</p>
    <p><strong>Correo:</strong> ${email}</p>
    <p><strong>Motivo:</strong> ${reason}</p>
  `;

  await transporter.sendMail({
    from: `Cruiserex Citas <${process.env.SMTP_USER}>`,
    to: targetEmail,
    subject,
    text,
    html,
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    // Solo aceptamos POST desde el formulario.
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // En Vercel, si mandas JSON con fetch y header Content-Type: application/json,
  // req.body ya vendrá parseado como objeto.
  const payload = req.body || {};

  try {
    // 1) Crear cita en Supabase usando la lógica compartida de appointment-admin.
    const appointment = await createAppointment(payload);

    // 2) Enviar correo de notificación.
    await sendNotificationEmail(appointment);

    // 3) Responder al frontend.
    return res.status(201).json({
      message: 'Cita creada correctamente',
      appointment,
    });
  } catch (err) {
    console.error('Error en /api/create-appointment:', err);

    // Si la validación falla u otra cosa sale mal, devolvemos 400 o 500 según el caso.
    const statusCode = err.message && err.message.startsWith('El campo') ? 400 : 500;

    return res.status(statusCode).json({
      error: err.message || 'No se pudo crear la cita',
    });
  }
};