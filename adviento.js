
/* Calendario de Adviento 2026 — zona horaria: Ciudad de México */

const TZ = 'America/Mexico_City';
const RECIPIENT_KEY = '200909';
const CREATOR_KEY = '3333';
const STORAGE_KEY = 'adviento2026-dias-abiertos';

/* =================================
   CONTENIDO DE LAS 31 SORPRESAS
   EDITA TÍTULO, TEXTO E IMAGEN
================================= */

const surprises = [
    {
        day: 1,
        title: "Deseo",
        text: "Para comenzar con este calendario, deseo que todos los días contigo sean bonitos. Y que, los que no sean bonitos, me sigas llamando amor",
        image: "imagenes/dia-01.jpg"
    },
    {
        day: 2,
        title: "Día 2",
        text: "Aquí va el texto de la segunda sorpresa.",
        image: "imagenes/dia-02.jpg"
    },
    {
        day: 3,
        title: "Día 3",
        text: "Aquí va el texto de la tercera sorpresa.",
        image: "imagenes/dia-03.jpg"
    },
    {
        day: 4,
        title: "Día 4",
        text: "Aquí va el texto de la cuarta sorpresa.",
        image: "imagenes/dia-04.jpg"
    },
    {
        day: 5,
        title: "Día 5",
        text: "Aquí va el texto de la quinta sorpresa.",
        image: "imagenes/dia-05.jpg"
    },
    {
        day: 6,
        title: "Día 6",
        text: "Aquí va el texto de la sexta sorpresa.",
        image: "imagenes/dia-06.jpg"
    },
    {
        day: 7,
        title: "Día 7",
        text: "Aquí va el texto de la séptima sorpresa.",
        image: "imagenes/dia-07.jpg"
    },
    {
        day: 8,
        title: "Día 8",
        text: "Aquí va el texto de la octava sorpresa.",
        image: "imagenes/dia-08.jpg"
    },
    {
        day: 9,
        title: "Día 9",
        text: "Aquí va el texto de la novena sorpresa.",
        image: "imagenes/dia-09.jpg"
    },
    {
        day: 10,
        title: "Día 10",
        text: "Aquí va el texto de la décima sorpresa.",
        image: "imagenes/dia-10.jpg"
    },
    {
        day: 11,
        title: "Día 11",
        text: "Aquí va el texto de la sorpresa del día 11.",
        image: "imagenes/dia-11.jpg"
    },
    {
        day: 12,
        title: "Día 12",
        text: "Aquí va el texto de la sorpresa del día 12.",
        image: "imagenes/dia-12.jpg"
    },
    {
        day: 13,
        title: "Día 13",
        text: "Aquí va el texto de la sorpresa del día 13.",
        image: "imagenes/dia-13.jpg"
    },
    {
        day: 14,
        title: "Día 14",
        text: "Aquí va el texto de la sorpresa del día 14.",
        image: "imagenes/dia-14.jpg"
    },
    {
        day: 15,
        title: "Día 15",
        text: "Aquí va el texto de la sorpresa del día 15.",
        image: "imagenes/dia-15.jpg"
    },
    {
        day: 16,
        title: "Primera de las que faltan",
        text: "Este día, se cumple un mes de nuestra primera salida, amor. No está de más hacerlo, ese comenzé a saber de ti y al mismo tiempo pude ver al amor a los ojos.",
        image: "imagenes/dia-16.jpg"
    },
    {
        day: 17,
        title: "Día 17",
        text: "Aquí va el texto de la sorpresa del día 17.",
        image: "imagenes/dia-17.jpg"
    },
    {
        day: 18,
        title: "Día 18",
        text: "Aquí va el texto de la sorpresa del día 18.",
        image: "imagenes/dia-18.jpg"
    },
    {
        day: 19,
        title: "Día 19",
        text: "Aquí va el texto de la sorpresa del día 19.",
        image: "imagenes/dia-19.jpg"
    },
    {
        day: 20,
        title: "Día 20",
        text: "Aquí va el texto de la sorpresa del día 20.",
        image: "imagenes/dia-20.jpg"
    },
    {
        day: 21,
        title: "Día 21",
        text: "Aquí va el texto de la sorpresa del día 21.",
        image: "imagenes/dia-21.jpg"
    },
    {
        day: 22,
        title: "Día 22",
        text: "Aquí va el texto de la sorpresa del día 22.",
        image: "imagenes/dia-22.jpg"
    },
    {
        day: 23,
        title: "Día 23",
        text: "Aquí va el texto de la sorpresa del día 23.",
        image: "imagenes/dia-23.jpg"
    },
    {
        day: 24,
        title: "Día 24",
        text: "Aquí va el texto de la sorpresa del día 24.",
        image: "imagenes/dia-24.jpg"
    },
    {
        day: 25,
        title: "Día 25",
        text: "Aquí va el texto de la sorpresa del día 25.",
        image: "imagenes/dia-25.jpg"
    },
    {
        day: 26,
        title: "Día 26",
        text: "Aquí va el texto de la sorpresa del día 26.",
        image: "imagenes/dia-26.jpg"
    },
    {
        day: 27,
        title: "Día 27",
        text: "Aquí va el texto de la sorpresa del día 27.",
        image: "imagenes/dia-27.jpg"
    },
    {
        day: 28,
        title: "Día 28",
        text: "Aquí va el texto de la sorpresa del día 28.",
        image: "imagenes/dia-28.jpg"
    },
    {
        day: 29,
        title: "Día 29",
        text: "Aquí va el texto de la sorpresa del día 29.",
        image: "imagenes/dia-29.jpg"
    },
    {
        day: 30,
        title: "Día 30",
        text: "Aquí va el texto de la sorpresa del día 30.",
        image: "imagenes/dia-30.jpg"
    },
    {
        day: 31,
        title: "Día 31",
        text: "Aquí va el texto de la sorpresa del día 31.",
        image: "imagenes/dia-31.jpg"
    }
];


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

            if (password === CREATOR_KEY) {
                location.href = `sorpresa.html?dia=${day}&creador=1`;
                return;
            }

            if (password !== RECIPIENT_KEY) {
                mostrarAviso(
                    'CLAVE INCORRECTA',
                    'La clave que ingresaste no es correcta. Inténtalo nuevamente.'
                );
                return;
            }

            if (!dayIsAvailable(day)) {
                mostrarAviso(
                    '¡UPS!',
                    `ESTA SORPRESA SE ABRE EL ${day} DE DICIEMBRE`
                );
                return;
            }

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

    const offset = (
        new Date(Date.UTC(2026, 11, 1)).getUTCDay() + 6
    ) % 7;

    for (let i = 0; i < offset; i++) {
        const blank = document.createElement('div');
        blank.className = 'empty-cell';
        grid.appendChild(blank);
    }

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

    if (!day || day < 1 || day > 31) {
        document.getElementById('surpriseTitle').textContent =
            'No se encontró este día';

        return;
    }

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

    if (creator) {
        document.getElementById('creatorNote').hidden = false;
    }
}


/* ==========================
   INICIALIZAR
========================== */

renderCalendar();
renderSurprise();
