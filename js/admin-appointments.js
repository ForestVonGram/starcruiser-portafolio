// js/admin-appointments.js
// Panel de administración de citas.
// Usa el endpoint protegido /api/appointment-admin con un token ADMIN_SECRET
// que tú mismo defines en las variables de entorno de Vercel.

const ADMIN_TOKEN_KEY = 'cruiserex_admin_token';
const ADMIN_ENDPOINT = '/api/appointment-admin';

function getStoredAdminToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

function storeAdminToken(token) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

async function fetchWithAdminAuth(path = '', options = {}) {
  const token = getStoredAdminToken();
  if (!token) throw new Error('No hay token de administrador');

  const headers = {
    ...(options.headers || {}),
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(`${ADMIN_ENDPOINT}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    throw new Error('No autorizado. Verifica la clave de administrador.');
  }

  return response;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  // dateStr esperado en formato YYYY-MM-DD
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function formatTime(timeStr) {
  if (!timeStr) return '';
  // timeStr esperado en formato HH:MM o HH:MM:SS
  return timeStr.slice(0, 5);
}

async function loadAppointments() {
  const messageEl = document.getElementById('admin-panel-message');
  const tbody = document.getElementById('appointments-body');

  if (!tbody) return;

  if (messageEl) {
    messageEl.textContent = 'Cargando citas...';
    messageEl.className = 'appointment-message';
  }

  try {
    const response = await fetchWithAdminAuth('');
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Respuesta inesperada del servidor');
    }

    tbody.innerHTML = '';

    if (data.length === 0) {
      if (messageEl) {
        messageEl.textContent = 'No hay citas registradas.';
        messageEl.className = 'appointment-message';
      }
      return;
    }

    data.forEach((appt) => {
      const tr = document.createElement('tr');

      const dateTd = document.createElement('td');
      dateTd.textContent = formatDate(appt.date);

      const timeTd = document.createElement('td');
      timeTd.textContent = formatTime(appt.time);

      const requesterTd = document.createElement('td');
      requesterTd.textContent = appt.requester_name || '';

      const companyTd = document.createElement('td');
      companyTd.textContent = appt.company_name || '';

      const locationTd = document.createElement('td');
      locationTd.textContent = appt.company_location || '';

      const phoneTd = document.createElement('td');
      phoneTd.textContent = appt.phone || '';

      const emailTd = document.createElement('td');
      emailTd.textContent = appt.email || '';

      const statusTd = document.createElement('td');
      statusTd.textContent = appt.status || 'pending';

      const actionsTd = document.createElement('td');
      const actionsContainer = document.createElement('div');
      actionsContainer.className = 'admin-actions';

      // Botón Confirmar
      const confirmBtn = document.createElement('button');
      confirmBtn.textContent = 'Confirmar';
      confirmBtn.className = 'btn btn-success btn-xs';
      confirmBtn.addEventListener('click', async () => {
        const ok = window.confirm('¿Marcar esta cita como CONFIRMADA?');
        if (!ok) return;
        try {
          const resp = await fetchWithAdminAuth('', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: appt.id, status: 'confirmed' }),
          });

          if (!resp.ok) {
            const errData = await resp.json().catch(() => ({}));
            const msg = errData.error || 'No se pudo actualizar la cita.';
            alert(msg);
            return;
          }

          const updated = await resp.json();
          appt.status = updated.status;
          statusTd.textContent = updated.status || 'confirmed';
        } catch (err) {
          console.error('Error al confirmar cita:', err);
          alert(err.message || 'Error al confirmar la cita.');
        }
      });

      // Botón Cancelar
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancelar';
      cancelBtn.className = 'btn btn-warning btn-xs';
      cancelBtn.addEventListener('click', async () => {
        const ok = window.confirm('¿Marcar esta cita como CANCELADA?');
        if (!ok) return;
        try {
          const resp = await fetchWithAdminAuth('', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: appt.id, status: 'cancelled' }),
          });

          if (!resp.ok) {
            const errData = await resp.json().catch(() => ({}));
            const msg = errData.error || 'No se pudo actualizar la cita.';
            alert(msg);
            return;
          }

          const updated = await resp.json();
          appt.status = updated.status;
          statusTd.textContent = updated.status || 'cancelled';
        } catch (err) {
          console.error('Error al cancelar cita:', err);
          alert(err.message || 'Error al cancelar la cita.');
        }
      });

      // Botón Eliminar
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.className = 'btn btn-danger btn-xs';
      deleteBtn.addEventListener('click', async () => {
        const confirmDelete = window.confirm('¿Seguro que deseas eliminar esta cita?');
        if (!confirmDelete) return;

        try {
          const resp = await fetchWithAdminAuth(`?id=${encodeURIComponent(appt.id)}`, {
            method: 'DELETE',
          });

          if (!resp.ok) {
            const errData = await resp.json().catch(() => ({}));
            const msg = errData.error || 'No se pudo eliminar la cita.';
            alert(msg);
            return;
          }

          tr.remove();
        } catch (err) {
          console.error('Error al eliminar cita:', err);
          alert(err.message || 'Error al eliminar la cita.');
        }
      });

      actionsContainer.appendChild(confirmBtn);
      actionsContainer.appendChild(cancelBtn);
      actionsContainer.appendChild(deleteBtn);
      actionsTd.appendChild(actionsContainer);

      tr.appendChild(dateTd);
      tr.appendChild(timeTd);
      tr.appendChild(requesterTd);
      tr.appendChild(companyTd);
      tr.appendChild(locationTd);
      tr.appendChild(phoneTd);
      tr.appendChild(emailTd);
      tr.appendChild(statusTd);
      tr.appendChild(actionsTd);

      tbody.appendChild(tr);
    });

    if (messageEl) {
      messageEl.textContent = '';
    }
  } catch (err) {
    console.error('Error al cargar citas:', err);
    if (messageEl) {
      messageEl.textContent = err.message || 'Error al cargar las citas.';
      messageEl.className = 'appointment-message error';
    }
  }
}

function showAdminPanel() {
  const loginBox = document.getElementById('admin-login');
  const panel = document.getElementById('admin-panel');

  if (loginBox) loginBox.style.display = 'none';
  if (panel) panel.style.display = 'block';
}

function showLogin() {
  const loginBox = document.getElementById('admin-login');
  const panel = document.getElementById('admin-panel');

  if (panel) panel.style.display = 'none';
  if (loginBox) loginBox.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('admin-login-form');
  const loginMessageEl = document.getElementById('admin-login-message');
  const logoutBtn = document.getElementById('admin-logout');

  // Si ya hay token guardado, intentamos cargar directamente el panel.
  const existingToken = getStoredAdminToken();
  if (existingToken) {
    showAdminPanel();
    loadAppointments();
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!loginMessageEl) return;

      const secretInput = document.getElementById('admin-secret');
      const secret = secretInput ? secretInput.value.trim() : '';
      if (!secret) {
        loginMessageEl.textContent = 'Debes ingresar la clave de administrador.';
        loginMessageEl.className = 'appointment-message error';
        return;
      }

      loginMessageEl.textContent = 'Verificando clave...';
      loginMessageEl.className = 'appointment-message';

      // Probamos la clave haciendo un GET al endpoint admin.
      try {
        const response = await fetch(ADMIN_ENDPOINT, {
          headers: {
            'Authorization': `Bearer ${secret}`,
          },
        });

        if (response.status === 401) {
          loginMessageEl.textContent = 'Clave de administrador incorrecta.';
          loginMessageEl.className = 'appointment-message error';
          return;
        }

        if (!response.ok) {
          loginMessageEl.textContent = 'Error al verificar la clave. Revisa el servidor.';
          loginMessageEl.className = 'appointment-message error';
          return;
        }

        // Clave correcta: guardamos el token y mostramos el panel.
        storeAdminToken(secret);
        loginMessageEl.textContent = '';
        showAdminPanel();
        loadAppointments();
      } catch (err) {
        console.error('Error en login admin:', err);
        loginMessageEl.textContent = err.message || 'Error al verificar la clave.';
        loginMessageEl.className = 'appointment-message error';
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearAdminToken();
      showLogin();
    });
  }
});
