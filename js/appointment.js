// js/appointment.js
// Lógica del formulario de agendamiento de citas.
// Envía los datos al endpoint /api/create-appointment y muestra mensajes de éxito/error.

// Helper de traducción sencillo basado en window.translations definido en main.js
function t(key) {
  try {
    const lang = localStorage.getItem('lang') || 'es';
    const dict = (window.translations && window.translations[lang]) || {};
    return dict[key] || key;
  } catch (e) {
    return key;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointment-form');
  const messageEl = document.getElementById('appointment-message');

  if (!form) return;

  const dateInput = form.date;
  const timeInput = form.time;
  const phoneInput = form.phone;

  // === Restricción: fecha mínima = hoy, y hora mínima si la fecha es hoy ===
  function formatDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function formatTime(d) {
    const h = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${h}:${min}`;
  }

  function updateMinValues() {
    const now = new Date();
    const todayStr = formatDate(now);

    if (dateInput) {
      dateInput.min = todayStr;
      // Si no hay fecha o es anterior, forzamos hoy.
      if (!dateInput.value || dateInput.value < todayStr) {
        dateInput.value = todayStr;
      }
    }

    if (timeInput && dateInput) {
      if (dateInput.value === todayStr) {
        timeInput.min = formatTime(now);
      } else {
        timeInput.min = '';
      }
    }
  }

  if (dateInput && timeInput) {
    updateMinValues();
    dateInput.addEventListener('change', updateMinValues);
  }

  // === Solo permitir números en teléfono ===
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!messageEl) return;

    messageEl.textContent = t('appointment_sending');
    messageEl.className = 'appointment-message';

    const payload = {
      date: form.date.value,
      time: form.time.value,
      requester_name: form.requester_name.value,
      company_name: form.company_name.value,
      company_location: form.company_location.value,
      phone: form.phone.value,
      email: form.email.value,
      reason: form.reason.value,
    };

    // Validación extra: evitar fechas/horas en el pasado
    const now = new Date();
    const selectedDateTime = new Date(`${payload.date}T${payload.time || '00:00'}:00`);
    if (isNaN(selectedDateTime.getTime()) || selectedDateTime < now) {
      messageEl.textContent = t('appointment_past_datetime_error');
      messageEl.className = 'appointment-message error';
      return;
    }

    try {
      const response = await fetch('/api/create-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMsg = data && data.error ? data.error : t('appointment_backend_error');
        messageEl.textContent = errorMsg;
        messageEl.className = 'appointment-message error';
        return;
      }

      // Éxito: mostrar popup y volver al inicio
      alert(t('appointment_success_popup'));
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Error al enviar la cita:', error);
      messageEl.textContent = t('appointment_generic_error');
      messageEl.className = 'appointment-message error';
    }
  });
});
