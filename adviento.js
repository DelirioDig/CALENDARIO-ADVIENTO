
/* Calendario de Adviento 2026 — zona horaria: Ciudad de México */

const TZ = 'America/Mexico_City';
const RECIPIENT_KEY = '200909';
const CREATOR_KEY = '3333';
const STORAGE_KEY = 'adviento2026-dias-abiertos';

// EDITA aquí el contenido y la ruta de imagen de cada día.
const surprises = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    title: `Día ${i + 1}`,
    text: `Esta sorpresa todavía está por escribirse.\n\nAquí puedes colocar el texto que corresponde al día ${i + 1}.`,
    image: `imagenes/dia-${String(i + 1).padStart(2, '0')}.jpg`
}));

/* ==========================
   FECHA DE MÉXICO
========================== */

function mexicoDateParts() {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: TZ,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).formatToParts(new Date());

    const get = t => parts.find(p => p.type === t)?.value;

    return {
        year: Number(get('year')),
        month: Number(get('month')),
        day: Number(get('day'))
    };
}

function dayIsAvailable(day) {
    const d = mexicoDateParts();

    return (
        d.year > 2026 ||
        (d.year === 2026 && d.month === 12 && d.day >= day)
    );
}

/* ==========================
   REGISTRO DE DÍAS ABIERTOS
========================== */

function openedDays() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

function saveOpened(day) {
    const days = openedDays();

    if (!days.includes(day)) {
        days.push(day);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
    }
}

/* ==========================
   SISTEMA DE MODALES
========================== */

function cerrarModal() {
    const modal = document.querySelector('.modal-overlay');

    if (modal) {
        modal.remove();
    }
}

function mostrarAviso(titulo, mensaje, alCerrar = null) {
    cerrarModal();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';

    modal.innerHTML = `
        <div class="modal-box">
            <h2 class="modal-titulo"></h2>
            <p class="modal-mensaje"></p>

            <div class="modal-buttons">
                <button
                    class="modal-btn modal-btn-primary"
                    id="modalAvisoAceptar"
                    type="button"
                >
                    ACEPTAR
                </button>
            </div>
        </div>
    `;

    modal.querySelector('.modal-titulo').textContent = titulo;
    modal.querySelector('.modal-mensaje').textContent = mensaje;

    document.body.appendChild(modal);

    const boton = modal.querySelector('#modalAvisoAceptar');

    boton.onclick = () => {
        cerrarModal();

        if (typeof alCerrar === 'function') {
            alCerrar();
        }
    };

    // Cerrar con Escape
    modal.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            cerrarModal();

            if (typeof alCerrar === 'function') {
                alCerrar();
            }
        }
    });
}

function pedirClave(titulo, mensaje, callback) {
    cerrarModal();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';

    modal.innerHTML = `
        <div class="modal-box">
            <h2 class="modal-titulo"></h2>
            <p class="modal-mensaje"></p>

            <input
                type="password"
                id="modalClave"
                placeholder="Escribe la clave"
                autocomplete="off"
                aria-label="Clave de acceso"
            >

            <div id="modalError" class="modal-error"></div>

            <div class="modal-buttons">
                <button
                    class="modal-btn modal-btn-primary"
                    id="modalAceptar"
                    type="button"
                >
                    ENTRAR
                </button>

                <button
                    class="modal-btn modal-btn-secondary"
                    id="modalCancelar"
                    type="button"
                >
                    CANCELAR
                </button>
            </div>
        </div>
    `;

    modal.querySelector('.modal-titulo').textContent = titulo;
    modal.querySelector('.modal-mensaje').textContent = mensaje;

    document.body.appendChild(modal);

    const input = modal.querySelector('#modalClave');
    const aceptar = modal.querySelector('#modalAceptar');
    const cancelar = modal.querySelector('#modalCancelar');
    const error = modal.querySelector('#modalError');

    input.focus();

    function comprobarClave() {
        const clave = input.value.trim();

        if (!clave) {
            error.textContent = 'ESCRIBE LA CLAVE PARA CONTINUAR.';
            input.focus();
            return;
        }

        cerrarModal();
        callback(clave);
    }

    aceptar.onclick = comprobarClave;

    cancelar.onclick = cerrarModal;

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            comprobarClave();
        }
    });
}

/* ==========================
   APERTURA DE DÍAS
========================== */

function openDay(day) {
    pedirClave(
        'UNA PUERTA POR ABRIR',
        'Escribe la clave para descubrir tu sorpresa.',
        function (password) {

            // ACCESO DEL CREADOR
            if (password === CREATOR_KEY) {
                location.href = `sorpresa.html?dia=${day}&creador=1`;
                return;
            }

            // CLAVE INCORRECTA
            if (password !== RECIPIENT_KEY) {
                mostrarAviso(
                    'CLAVE INCORRECTA',
                    'La clave que ingresaste no es correcta. Inténtalo nuevamente.'
                );
                return;
            }

            // DÍA AÚN NO DISPONIBLE
            if (!dayIsAvailable(day)) {
                mostrarAviso(
                    '¡UPS!',
                    `ESTA SORPRESA SE ABRE EL ${day} DE DICIEMBRE`
                );
                return;
            }

            // DÍA DISPONIBLE PARA EL DESTINATARIO
            saveOpened(day);

            location.href = `sorpresa.html?dia=${day}`;
        }
    );
}

/* ==========================
   MOSTRAR CALENDARIO
========================== */

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');

    if (!grid) return;

    // El 1 de diciembre de 2026 cae en martes.
    // La cuadrícula comienza visualmente en lunes.
    const offset = (
        new Date(Date.UTC(2026, 11, 1)).getUTCDay() + 6
    ) % 7;

    // Espacios vacíos antes del día 1
    for (let i = 0; i < offset; i++) {
        const blank = document.createElement('div');
        blank.className = 'empty-cell';
        grid.appendChild(blank);
    }

    // Crear los 31 días
    for (let day = 1; day <= 31; day++) {
        const opened = openedDays().includes(day);

        const cell = document.createElement('button');

        cell.type = 'button';

        cell.className = `calendar-cell ${
            opened ? 'opened' : 'unopened'
        }`;

        cell.setAttribute(
            'aria-label',
            `Día ${day}${opened ? ' abierto' : ' aún no abierto'}`
        );

        cell.innerHTML = `
            <span class="number">${day}</span>
            <span
                class="dot ${opened ? 'opened' : 'unopened'}"
                aria-hidden="true"
            ></span>
        `;

        cell.addEventListener('click', () => openDay(day));

        grid.appendChild(cell);
    }
}

/* ==========================
   MOSTRAR SORPRESA
========================== */

function renderSurprise() {
    const content = document.getElementById('surpriseContent');

    if (!content) return;

    const params = new URLSearchParams(location.search);

    const day = Number(params.get('dia'));
    const creator = params.get('creador') === '1';

    // Verificar número del día
    if (!day || day < 1 || day > 31) {
        document.getElementById('surpriseTitle').textContent =
            'No se encontró este día';

        return;
    }

    // Bloquear acceso directo a días futuros,
    // excepto cuando se utiliza la vista previa del creador.
    if (!creator && !dayIsAvailable(day)) {
        mostrarAviso(
            '¡UPS!',
            `ESTA SORPRESA SE ABRE EL ${day} DE DICIEMBRE`,
            () => location.replace('calendario.html')
        );

        return;
    }

    const entry = surprises[day - 1];

    document.title = `Día ${day} | Una sorpresa para ti`;

    document.getElementById('surpriseKicker').textContent =
        `DICIEMBRE 2026 · DÍA ${day}`;

    document.getElementById('surpriseTitle').textContent =
        entry.title;

    document.getElementById('surpriseText').textContent =
        entry.text;

    const img = document.getElementById('surpriseImage');
    const placeholder = document.getElementById('imagePlaceholder');

    if (entry.image) {
        img.src = entry.image;

        img.onload = () => {
            img.classList.add('visible');
            placeholder.style.display = 'none';
        };

        img.onerror = () => {
            img.classList.remove('visible');
            placeholder.style.display = 'block';
        };
    }

    // Aviso de vista previa del creador
    if (creator) {
        document.getElementById('creatorNote').hidden = false;
    }
}

/* ==========================
   INICIALIZAR
========================== */

renderCalendar();
renderSurprise();
