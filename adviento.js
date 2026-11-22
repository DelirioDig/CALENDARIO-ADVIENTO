/* Calendario de Adviento 2026 — zona horaria: Ciudad de México */
const TZ = 'America/Mexico_City';
const RECIPIENT_KEY = '200909';
const CREATOR_KEY = '3333';
const STORAGE_KEY = 'adviento2026-dias-abiertos';

// EDITA aquí el contenido y la ruta de imagen de cada día.
const surprises = Array.from({length:31},(_,i)=>({
  day:i+1,
  title:`Día ${i+1}`,
  text:`Esta sorpresa todavía está por escribirse.\n\nAquí puedes colocar el texto que corresponde al día ${i+1}.`,
  image:`imagenes/dia-${String(i+1).padStart(2,'0')}.jpg`
}));

function mexicoDateParts(){
  const parts=new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const get=t=>parts.find(p=>p.type===t)?.value;
  return {year:Number(get('year')),month:Number(get('month')),day:Number(get('day'))};
}
function dayIsAvailable(day){const d=mexicoDateParts();return d.year>2026||(d.year===2026&&d.month===12&&d.day>=day);}
function openedDays(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')}catch{return []}}
function saveOpened(day){const days=openedDays();if(!days.includes(day)){days.push(day);localStorage.setItem(STORAGE_KEY,JSON.stringify(days));}}
function askPassword(){return window.prompt('Escribe la clave para abrir esta sorpresa:');}
function openDay(day){
  const password=askPassword();if(password===null)return;
  if(password===CREATOR_KEY){location.href=`sorpresa.html?dia=${day}&creador=1`;return;}
  if(password!==RECIPIENT_KEY){alert('CLAVE INCORRECTA. Inténtalo de nuevo.');return;}
  if(!dayIsAvailable(day)){alert(`¡UPS! ESTA SORPRESA SE ABRE EL ${day} DE DICIEMBRE`);return;}
  saveOpened(day);location.href=`sorpresa.html?dia=${day}`;
}
function renderCalendar(){
 const grid=document.getElementById('calendarGrid');if(!grid)return;
 // El 1 de diciembre de 2026 cae en martes. La cuadrícula empieza visualmente en lunes.
 const offset=(new Date(Date.UTC(2026,11,1)).getUTCDay()+6)%7;
 for(let i=0;i<offset;i++){const blank=document.createElement('div');blank.className='empty-cell';grid.appendChild(blank);}
 for(let day=1;day<=31;day++){
   const opened=openedDays().includes(day);
   const cell=document.createElement('button');cell.type='button';cell.className=`calendar-cell ${opened?'opened':'unopened'}`;
   cell.setAttribute('aria-label',`Día ${day}${opened?' abierto':' aún no abierto'}`);
   cell.innerHTML=`<span class="number">${day}</span><span class="dot ${opened?'opened':'unopened'}" aria-hidden="true"></span>`;
   cell.addEventListener('click',()=>openDay(day));grid.appendChild(cell);
 }
}
function renderSurprise(){
 const content=document.getElementById('surpriseContent');if(!content)return;
 const params=new URLSearchParams(location.search);const day=Number(params.get('dia'));const creator=params.get('creador')==='1';
 if(!day||day<1||day>31){document.getElementById('surpriseTitle').textContent='No se encontró este día';return;}
 if(!creator&&!dayIsAvailable(day)){alert(`¡UPS! ESTA SORPRESA SE ABRE EL ${day} DE DICIEMBRE`);location.replace('calendario.html');return;}
 const entry=surprises[day-1];document.title=`Día ${day} | Una sorpresa para ti`;
 document.getElementById('surpriseKicker').textContent=`DICIEMBRE 2026 · DÍA ${day}`;
 document.getElementById('surpriseTitle').textContent=entry.title;
 document.getElementById('surpriseText').textContent=entry.text;
 const img=document.getElementById('surpriseImage');const placeholder=document.getElementById('imagePlaceholder');
 if(entry.image){img.src=entry.image;img.onload=()=>{img.classList.add('visible');placeholder.style.display='none'};img.onerror=()=>{img.classList.remove('visible');placeholder.style.display='block'};}
 if(creator)document.getElementById('creatorNote').hidden=false;
}
renderCalendar();renderSurprise();

/* ==========================
   SISTEMA DE MODALES
========================== */

function cerrarModal() {
    const modal = document.querySelector(".modal-overlay");
    if (modal) modal.remove();
}

function mostrarAviso(titulo, mensaje) {
    cerrarModal();

    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
        <div class="modal-box">
            <h2>${titulo}</h2>
            <p>${mensaje}</p>

            <div class="modal-buttons">
                <button class="modal-btn modal-btn-primary"
                        onclick="cerrarModal()">
                    ACEPTAR
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function pedirClave(titulo, mensaje, callback) {
    cerrarModal();

    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
        <div class="modal-box">
            <h2>${titulo}</h2>
            <p>${mensaje}</p>

            <input
                type="password"
                id="modalClave"
                placeholder="Escribe la clave"
                autocomplete="off"
            >

            <div id="modalError"></div>

            <div class="modal-buttons">
                <button class="modal-btn modal-btn-primary"
                        id="modalAceptar">
                    ENTRAR
                </button>

                <button class="modal-btn modal-btn-secondary"
                        onclick="cerrarModal()">
                    CANCELAR
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const input = modal.querySelector("#modalClave");
    const aceptar = modal.querySelector("#modalAceptar");

    input.focus();

    aceptar.onclick = () => {
        const clave = input.value;

        cerrarModal();
        callback(clave);
    };

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") aceptar.click();
    });
}
