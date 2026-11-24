const MONTHS = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
const MONTHS_NOM = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const WEEK = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

const CATEGORIES = [
  {
    id: "standard",
    name: "Стандарт",
    size: 22,
    capacity: 2,
    extraBed: false,
    beds: "1 двуспальная или 2 односпальные",
    desc: "Светлый номер во внутренний двор",
    amenities: ["Wi‑Fi", "Кондиционер", "Сейф", "Душ"],
    photo: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
    price: 9200,
  },
  {
    id: "deluxe",
    name: "Делюкс",
    size: 31,
    capacity: 3,
    extraBed: true,
    beds: "King-size + диван",
    desc: "Больше пространства и рабочая зона",
    amenities: ["Wi‑Fi", "Ванна", "Халаты", "Мини-бар"],
    photo: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    price: 12800,
  },
  {
    id: "family",
    name: "Семейный",
    size: 38,
    capacity: 4,
    extraBed: true,
    beds: "King-size + 2 односпальные",
    desc: "Две зоны сна, удобно с детьми",
    amenities: ["Wi‑Fi", "Детский набор", "Чайная станция", "Диван"],
    photo: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    price: 15600,
  },
  {
    id: "suite",
    name: "Люкс",
    size: 48,
    capacity: 4,
    extraBed: false,
    beds: "Спальня + гостиная",
    desc: "Панорамный вид и отдельная гостиная",
    amenities: ["Wi‑Fi", "Гостиная", "Ванна", "Welcome-набор"],
    photo: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    price: 21400,
  },
];

const TARIFFS = [
  {
    id: "saver",
    name: "Выгодный",
    modifier: 0.85,
    breakfast: false,
    refundable: false,
    badge: "−15%",
    note: "Оплата сейчас · без возврата",
  },
  {
    id: "flex",
    name: "Гибкий",
    modifier: 1,
    breakfast: false,
    refundable: true,
    extra: 0,
    note: "Бесплатная отмена за 24 часа",
  },
  {
    id: "breakfast",
    name: "С завтраком",
    modifier: 1,
    breakfast: true,
    refundable: true,
    perPerson: 1900,
    note: "Шведский стол 07:00–11:00",
  },
];

const EXTRAS = {
  booking: [
    { id: "transfer", name: "Трансфер из аэропорта", note: "На весь заказ, 1 авто до 4 гостей", price: 4500, type: "once" },
    { id: "transfer2", name: "Трансфер в аэропорт", note: "В день выезда", price: 4500, type: "once" },
    { id: "parking", name: "Парковка", note: "Подземная, за ночь", price: 1200, type: "night" },
    { id: "spa", name: "SPA на двоих", note: "60 минут, бронируется к заезду", price: 6800, type: "once" },
  ],
  room: [
    { id: "breakfast", name: "Завтрак", note: "За человека за ночь", price: 1900, type: "person-night", perPerson: true },
    { id: "late", name: "Поздний выезд до 16:00", note: "Если номер свободен", price: 3000, type: "once" },
    { id: "champagne", name: "Шампанское в номер", note: "К заезду", price: 4200, type: "once" },
    { id: "romance", name: "Романтическое оформление", note: "Цветы и лепестки", price: 3500, type: "once" },
  ],
};

const PRESETS = [
  { id: "couple", label: "Пара · 1 номер", adults: 2, children: 0, roomsCount: 1 },
  { id: "friends", label: "Компания · 2 номера", adults: 4, children: 0, roomsCount: 2 },
  { id: "family", label: "Семья 2+2", adults: 2, children: 2, roomsCount: 1 },
];

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return startOfDay(x);
}
function sameDay(a, b) {
  return a && b && startOfDay(a).getTime() === startOfDay(b).getTime();
}
function nightsBetween(a, b) {
  if (!a || !b) return 0;
  return Math.max(0, Math.round((startOfDay(b) - startOfDay(a)) / 86400000));
}
function plural(n, one, few, many) {
  const abs = Math.abs(n) % 100;
  const n1 = abs % 10;
  if (abs > 10 && abs < 20) return many;
  if (n1 > 1 && n1 < 5) return few;
  if (n1 === 1) return one;
  return many;
}
function money(n) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(n)) + " ₽";
}
function fmtDay(d) {
  return d.getDate() + " " + MONTHS[d.getMonth()];
}
function fmtRange(a, b) {
  if (!a || !b) return "Выберите даты";
  if (a.getMonth() === b.getMonth()) return a.getDate() + "–" + fmtDay(b);
  return fmtDay(a) + " – " + fmtDay(b);
}
function cat(id) { return CATEGORIES.find((c) => c.id === id); }
function tar(id) { return TARIFFS.find((t) => t.id === id); }
function occTotal(o) { return o.adults + o.children; }

function defaultDates() {
  const today = startOfDay(new Date());
  const checkIn = addDays(today, 14);
  while (checkIn.getDay() !== 5) checkIn.setDate(checkIn.getDate() + 1);
  return { checkIn: startOfDay(checkIn), checkOut: addDays(checkIn, 3) };
}

const dates0 = defaultDates();

const state = {
  checkIn: dates0.checkIn,
  checkOut: dates0.checkOut,
  picking: null,
  calMonth: new Date(dates0.checkIn.getFullYear(), dates0.checkIn.getMonth(), 1),
  adults: 2,
  children: 0,
  childAges: [],
  roomsCount: 1,
  occupancy: [
    { adults: 2, children: 0 },
    { adults: 0, children: 0 },
  ],
  selections: [
    { categoryId: null, tariffId: null },
    { categoryId: null, tariffId: null },
  ],
  activeRoom: 0,
  extrasBooking: {},
  extrasRooms: [{}, {}],
  calendarOpen: false,
  guestsOpen: false,
  guest: { name: "", email: "", phone: "", comment: "" },
  pay: "hotel",
  booked: false,
  preset: "couple",
};

function nights() { return nightsBetween(state.checkIn, state.checkOut); }
function totalGuests() { return state.adults + state.children; }

function redistribute() {
  if (state.roomsCount === 1) {
    state.occupancy = [
      { adults: state.adults, children: state.children },
      { adults: 0, children: 0 },
    ];
    state.selections[1] = { categoryId: null, tariffId: null };
    state.extrasRooms[1] = {};
    state.activeRoom = 0;
    return;
  }
  if (state.adults < 2) state.adults = 2;
  const a1 = Math.ceil(state.adults / 2);
  const a2 = state.adults - a1;
  const c1 = Math.ceil(state.children / 2);
  state.occupancy = [
    { adults: a1, children: c1 },
    { adults: a2, children: state.children - c1 },
  ];
}

function fitCategory(category, occ) {
  return occTotal(occ) <= category.capacity;
}

function nightPrice(category, tariff, occ) {
  const base = category.price * tariff.modifier;
  const breakfast = tariff.breakfast ? (tariff.perPerson || 0) * occTotal(occ) : 0;
  return base + breakfast;
}

function extraAmount(extra, qty, occ) {
  if (!qty) return 0;
  const n = nights() || 1;
  const ppl = occTotal(occ) || 1;
  if (extra.type === "night") return extra.price * n * qty;
  if (extra.type === "person-night") return extra.price * n * qty;
  return extra.price * qty;
}

function roomStay(i) {
  const sel = state.selections[i];
  if (!sel.categoryId || !sel.tariffId) return 0;
  const c = cat(sel.categoryId);
  const t = tar(sel.tariffId);
  return nightPrice(c, t, state.occupancy[i]) * nights();
}

function extrasTotal() {
  let sum = 0;
  for (const extra of EXTRAS.booking) {
    sum += extraAmount(extra, state.extrasBooking[extra.id] || 0, { adults: state.adults, children: state.children });
  }
  const count = state.roomsCount;
  for (let i = 0; i < count; i++) {
    const occ = state.occupancy[i];
    const sel = state.selections[i];
    const hasBreakfast = sel.tariffId && tar(sel.tariffId)?.breakfast;
    for (const extra of EXTRAS.room) {
      if (extra.id === "breakfast" && hasBreakfast) continue;
      sum += extraAmount(extra, state.extrasRooms[i][extra.id] || 0, occ);
    }
  }
  return sum;
}

function grandTotal() {
  let sum = 0;
  for (let i = 0; i < state.roomsCount; i++) sum += roomStay(i);
  return sum + extrasTotal();
}

function roomsReady() {
  return Array.from({ length: state.roomsCount }).every((_, i) => {
    const s = state.selections[i];
    return s.categoryId && s.tariffId;
  });
}

function suggestedRooms() {
  const maxCap = Math.max(...CATEGORIES.map((c) => c.capacity));
  if (totalGuests() > maxCap) return 2;
  if (state.adults >= 4) return 2;
  if (totalGuests() >= 4) return 2;
  return 1;
}

function occupancyLabel(occ) {
  const parts = [];
  parts.push(occ.adults + " " + plural(occ.adults, "взрослый", "взрослых", "взрослых"));
  if (occ.children) parts.push(occ.children + " " + plural(occ.children, "ребёнок", "ребёнка", "детей"));
  return parts.join(", ");
}

function pulse(n) {
  const el = document.querySelector(`.widget[data-screen="${n}"]`);
  if (!el) return;
  el.classList.remove("pulse");
  void el.offsetWidth;
  el.classList.add("pulse");
}

function applyPreset(id) {
  const p = PRESETS.find((x) => x.id === id);
  if (!p) return;
  state.preset = id;
  state.adults = p.adults;
  state.children = p.children;
  state.childAges = Array.from({ length: p.children }, () => 6);
  state.roomsCount = p.roomsCount;
  state.selections = [
    { categoryId: null, tariffId: null },
    { categoryId: null, tariffId: null },
  ];
  state.extrasBooking = {};
  state.extrasRooms = [{}, {}];
  state.booked = false;
  redistribute();
  render();
  pulse(2); pulse(3);
}

function moveGuest(from, to, kind) {
  const src = state.occupancy[from];
  const dst = state.occupancy[to];
  if (src[kind] < 1) return;
  if (kind === "adults" && src.adults <= 1) return;
  src[kind] -= 1;
  dst[kind] += 1;
  state.adults = state.occupancy[0].adults + state.occupancy[1].adults;
  state.children = state.occupancy[0].children + state.occupancy[1].children;
  state.childAges = Array.from({ length: state.children }, (_, i) => state.childAges[i] || 6);
  render();
  pulse(2); pulse(3);
}

function setGuests(kind, delta) {
  if (kind === "adults") state.adults = Math.min(6, Math.max(1, state.adults + delta));
  if (kind === "children") {
    state.children = Math.min(4, Math.max(0, state.children + delta));
    state.childAges = Array.from({ length: state.children }, (_, i) => state.childAges[i] || 6);
  }
  const need = suggestedRooms();
  if (need === 2 && state.roomsCount === 1 && totalGuests() > 3) {
    /* keep user choice, only suggest */
  }
  if (state.roomsCount === 2 && totalGuests() === 1) {
    state.roomsCount = 1;
  }
  redistribute();
  for (let i = 0; i < 2; i++) {
    const sel = state.selections[i];
    if (sel.categoryId && !fitCategory(cat(sel.categoryId), state.occupancy[i])) {
      state.selections[i] = { categoryId: null, tariffId: null };
    }
  }
  state.preset = "";
  render();
  pulse(2); pulse(3);
}

function setRoomsCount(n) {
  state.roomsCount = n;
  if (n === 2 && state.adults < 2) state.adults = 2;
  redistribute();
  state.preset = "";
  render();
  pulse(2); pulse(3);
}

function pickTariff(roomIndex, categoryId, tariffId) {
  const occ = state.occupancy[roomIndex];
  const category = cat(categoryId);
  if (!fitCategory(category, occ)) return;
  state.selections[roomIndex] = { categoryId, tariffId };
  if (state.roomsCount === 2 && roomIndex === 0 && !state.selections[1].tariffId) {
    state.activeRoom = 1;
  }
  const t = tar(tariffId);
  if (t.breakfast) state.extrasRooms[roomIndex].breakfast = 0;
  state.booked = false;
  render();
  pulse(2); pulse(3);
}

function toggleExtra(scope, id, roomIndex) {
  if (scope === "booking") {
    state.extrasBooking[id] = state.extrasBooking[id] ? 0 : 1;
  } else {
    const bag = state.extrasRooms[roomIndex];
    const extra = EXTRAS.room.find((e) => e.id === id);
    if (extra.perPerson) {
      const max = occTotal(state.occupancy[roomIndex]);
      const cur = bag[id] || 0;
      bag[id] = cur >= max ? 0 : cur + 1;
    } else {
      bag[id] = bag[id] ? 0 : 1;
    }
  }
  state.booked = false;
  render();
  pulse(3);
}

function renderPresets() {
  document.getElementById("presets").innerHTML = PRESETS.map((p) =>
    `<button class="chip ${state.preset === p.id ? "is-on" : ""}" data-act="preset" data-id="${p.id}">${p.label}</button>`
  ).join("");
}

function renderCalendar() {
  const month = state.calMonth;
  const y = month.getFullYear();
  const m = month.getMonth();
  const first = new Date(y, m, 1);
  const startIdx = (first.getDay() + 6) % 7;
  const daysIn = new Date(y, m + 1, 0).getDate();
  const today = startOfDay(new Date());
  let cells = WEEK.map((w) => `<span>${w}</span>`).join("");
  for (let i = 0; i < startIdx; i++) cells += `<span></span>`;
  for (let d = 1; d <= daysIn; d++) {
    const date = new Date(y, m, d);
    const t = startOfDay(date).getTime();
    const disabled = t < today.getTime();
    const start = state.checkIn && sameDay(date, state.checkIn);
    const end = state.checkOut && sameDay(date, state.checkOut);
    const inRange = state.checkIn && state.checkOut && t > state.checkIn && t < state.checkOut;
    const cls = [
      "day",
      start ? "start" : "",
      end ? "end" : "",
      inRange ? "in" : "",
      sameDay(date, today) ? "today" : "",
    ].filter(Boolean).join(" ");
    cells += `<button class="${cls}" data-act="day" data-t="${t}" ${disabled ? "disabled" : ""}>${d}</button>`;
  }
  const n = nights();
  return `
    <div class="panel">
      <div class="cal-nav">
        <button class="icon-btn" data-act="cal-prev">‹</button>
        <b>${MONTHS_NOM[m]} ${y}</b>
        <button class="icon-btn" data-act="cal-next">›</button>
      </div>
      <div class="cal-grid">${cells}</div>
      <p class="cal-note">${state.checkIn && state.checkOut
        ? fmtRange(state.checkIn, state.checkOut) + " · " + n + " " + plural(n, "ночь", "ночи", "ночей")
        : "Сначала заезд, затем выезд"}</p>
    </div>`;
}

function renderGuests() {
  const ages = state.childAges.map((age, i) =>
    `<select data-act="age" data-i="${i}">${Array.from({ length: 18 }, (_, a) =>
      `<option value="${a}" ${a === age ? "selected" : ""}>${a} ${plural(a, "год", "года", "лет")}</option>`
    ).join("")}</select>`
  ).join("");
  return `
    <div class="panel">
      <div class="stepper">
        <div><div class="who">Взрослые</div><div class="hint">от 18 лет</div></div>
        <div class="step-btns">
          <button class="round" data-act="guest" data-kind="adults" data-d="-1" ${state.adults <= 1 ? "disabled" : ""}>−</button>
          <span class="qty">${state.adults}</span>
          <button class="round" data-act="guest" data-kind="adults" data-d="1" ${state.adults >= 6 ? "disabled" : ""}>+</button>
        </div>
      </div>
      <div class="stepper">
        <div><div class="who">Дети</div><div class="hint">до 17 лет</div></div>
        <div class="step-btns">
          <button class="round" data-act="guest" data-kind="children" data-d="-1" ${state.children <= 0 ? "disabled" : ""}>−</button>
          <span class="qty">${state.children}</span>
          <button class="round" data-act="guest" data-kind="children" data-d="1" ${state.children >= 4 ? "disabled" : ""}>+</button>
        </div>
      </div>
      ${state.children ? `<div class="ages">${ages}</div>` : ""}
    </div>`;
}

function renderSplit() {
  if (state.roomsCount !== 2) return "";
  return `
    <div class="split">
      ${[0, 1].map((i) => {
        const sel = state.selections[i];
        const picked = sel.categoryId ? cat(sel.categoryId).name + " · " + tar(sel.tariffId).name : "тариф не выбран";
        return `
        <div class="split-card ${state.activeRoom === i ? "is-active" : ""} ${sel.categoryId ? "has-pick" : ""}" data-act="tab" data-i="${i}">
          <div class="ttl">Номер ${i + 1}</div>
          <div class="occ">${occupancyLabel(state.occupancy[i])}</div>
          <div class="picked-mini">${picked}</div>
          <div class="move">
            ${i === 0 ? `
              <button data-act="move" data-from="0" data-to="1" data-kind="adults">взр. →</button>
              <button data-act="move" data-from="0" data-to="1" data-kind="children" ${state.occupancy[0].children ? "" : "disabled"}>реб. →</button>
            ` : `
              <button data-act="move" data-from="1" data-to="0" data-kind="adults">← взр.</button>
              <button data-act="move" data-from="1" data-to="0" data-kind="children" ${state.occupancy[1].children ? "" : "disabled"}>← реб.</button>
            `}
          </div>
        </div>`;
      }).join("")}
    </div>`;
}

function isPicked(categoryId, tariffId, roomIndex) {
  const s = state.selections[roomIndex];
  return s.categoryId === categoryId && s.tariffId === tariffId;
}

function renderTariff(category, tariff) {
  const n = nights();
  if (state.roomsCount === 1) {
    const occ = state.occupancy[0];
    const ok = fitCategory(category, occ);
    const price = nightPrice(category, tariff, occ);
    const selected = isPicked(category.id, tariff.id, 0);
    return `
      <div class="tariff ${selected ? "is-on" : ""}">
        <div>
          <div class="t-name">${tariff.name}${tariff.badge ? `<span class="badge">${tariff.badge}</span>` : ""}</div>
          <div class="t-note">${tariff.note}${tariff.breakfast ? " · на " + occTotal(occ) + " " + plural(occTotal(occ), "гостя", "гостей", "гостей") : ""}</div>
        </div>
        <div>
          <div class="price"><b>${money(price)}</b><span>за ночь${n ? " · " + money(price * n) : ""}</span></div>
          <button class="pick-btn ${selected ? "is-on" : ""}" data-act="pick" data-room="0" data-cat="${category.id}" data-tar="${tariff.id}" ${ok ? "" : "disabled"}>
            ${ok ? (selected ? "Выбрано" : "Выбрать") : "Не вмещает"}
          </button>
        </div>
      </div>`;
  }
  const selected = isPicked(category.id, tariff.id, 0) || isPicked(category.id, tariff.id, 1);
  const buttons = [0, 1].map((i) => {
    const fits = fitCategory(category, state.occupancy[i]);
    const on = isPicked(category.id, tariff.id, i);
    const p = nightPrice(category, tariff, state.occupancy[i]);
    return `<button class="${on ? "is-on" : ""}" data-act="pick" data-room="${i}" data-cat="${category.id}" data-tar="${tariff.id}" ${fits ? "" : "disabled"} title="${fits ? money(p) + " / ночь для №" + (i + 1) : "Макс. " + category.capacity + " гостей, в №" + (i + 1) + " — " + occTotal(state.occupancy[i])}">${on ? "№" + (i + 1) + " ✓" : "№" + (i + 1) + " · " + money(p)}</button>`;
  }).join("");
  return `
    <div class="tariff ${selected ? "is-on" : ""}">
      <div>
        <div class="t-name">${tariff.name}${tariff.badge ? `<span class="badge">${tariff.badge}</span>` : ""}</div>
        <div class="t-note">${tariff.note} · цена считается по гостям каждого номера</div>
      </div>
      <div class="assign">${buttons}</div>
    </div>`;
}

function renderRooms() {
  const list = CATEGORIES.map((category) => {
    const relevantOcc = state.roomsCount === 1 ? state.occupancy[0] : state.occupancy[state.activeRoom];
    const fitsSome = state.roomsCount === 1
      ? fitCategory(category, state.occupancy[0])
      : fitCategory(category, state.occupancy[0]) || fitCategory(category, state.occupancy[1]);
    const picked = Array.from({ length: state.roomsCount }).some((_, i) => state.selections[i].categoryId === category.id);
    const pickedRooms = Array.from({ length: state.roomsCount })
      .map((_, i) => state.selections[i].categoryId === category.id ? `№${i + 1} · ${tar(state.selections[i].tariffId).name}` : null)
      .filter(Boolean)
      .join("  ·  ");
    const capText = state.roomsCount === 1
      ? `до ${category.capacity} ${plural(category.capacity, "гостя", "гостей", "гостей")} · нужно ${occTotal(relevantOcc)}`
      : `до ${category.capacity} гостей · №1: ${occTotal(state.occupancy[0])} · №2: ${occTotal(state.occupancy[1])}`;
    return `
      <article class="room-card ${picked ? "is-picked" : ""} ${fitsSome ? "" : "fit-no"}">
        <div class="photo" style="background-image:url('${category.photo}')">
          <span class="cap-pill ${fitsSome ? "fit-ok" : ""}">${capText}</span>
        </div>
        <div class="room-body">
          <h3 class="room-name">${category.name}</h3>
          <p class="room-meta">${category.size} м² · ${category.beds}</p>
          <div class="amenity">${category.amenities.map((a) => `<span class="tag">${a}</span>`).join("")}</div>
          ${pickedRooms ? `<div class="picked-for">${pickedRooms}</div>` : ""}
          <div class="tariffs">${TARIFFS.map((t) => renderTariff(category, t)).join("")}</div>
        </div>
      </article>`;
  }).join("");

  const rec = suggestedRooms();
  const banner = rec !== state.roomsCount ? `
    <div class="banner">
      <p><b>${rec === 2 ? "Для этой компании удобнее 2 номера" : "Можно разместить в одном номере"}.</b>
      ${rec === 2
        ? "Реестр сразу показывает, какой категории хватает вместимости для каждого номера."
        : "Семейный и люкс вмещают всех гостей без разделения."}</p>
      <div class="banner-actions">
        <button class="btn btn-forest" data-act="rooms" data-n="${rec}">${rec === 2 ? "Разделить на 2 номера" : "Оставить 1 номер"}</button>
        <button class="btn btn-ghost" data-act="rooms" data-n="${rec === 2 ? 1 : 2}">${rec === 2 ? "Искать 1 большой" : "Всё равно 2 номера"}</button>
      </div>
    </div>` : "";

  return `
    ${banner}
    ${renderSplit()}
    <div class="section-ttl">
      <span>Категории и тарифы</span>
      <span>${state.roomsCount === 2 ? "назначьте тариф каждому номеру" : "выберите один тариф"}</span>
    </div>
    ${list}`;
}

function renderScreen1() {
  const n = nights();
  document.getElementById("screen-1").innerHTML = `
    <div class="hotel-head">
      <div>
        <b>Maison KEKHO</b>
        <div class="hotel-sub">центр города · завтрак · спа</div>
      </div>
      <div class="stars">★★★★</div>
    </div>
    <div class="control-row">
      <button class="control ${state.calendarOpen ? "is-open" : ""}" data-act="toggle-cal">
        <span class="lbl">Даты проживания</span>
        <span class="val">${fmtRange(state.checkIn, state.checkOut)}${n ? " · " + n + " " + plural(n, "ночь", "ночи", "ночей") : ""}</span>
      </button>
      <button class="control ${state.guestsOpen ? "is-open" : ""}" data-act="toggle-guests">
        <span class="lbl">Гости и номера</span>
        <span class="val">${totalGuests()} ${plural(totalGuests(), "гость", "гостя", "гостей")} · ${state.roomsCount} ${plural(state.roomsCount, "номер", "номера", "номеров")}</span>
      </button>
    </div>
    ${state.calendarOpen ? renderCalendar() : ""}
    ${state.guestsOpen ? renderGuests() : ""}
    <div class="rooms-switch">
      <button class="seg ${state.roomsCount === 1 ? "is-on" : ""}" data-act="rooms" data-n="1">
        1 номер<small>${suggestedRooms() === 1 ? "всем хватает вместимости" : "только семейный и люкс"}</small>
      </button>
      <button class="seg ${state.roomsCount === 2 ? "is-on" : ""}" data-act="rooms" data-n="2">
        2 номера<small>${suggestedRooms() === 2 ? "рекомендуем для этой компании" : "раздельное размещение"}</small>
      </button>
    </div>
    ${renderRooms()}
  `;

  const ready = roomsReady();
  const lines = Array.from({ length: state.roomsCount }).map((_, i) => {
    const s = state.selections[i];
    if (!s.categoryId) return `Номер ${i + 1}: выберите тариф`;
    return `${state.roomsCount === 2 ? "№" + (i + 1) + " · " : ""}${cat(s.categoryId).name} · ${tar(s.tariffId).name}`;
  });
  document.getElementById("dock-1").innerHTML = `
    <div class="dock-top">
      <span class="muted">Проживание</span>
      <b>${ready ? money(Array.from({ length: state.roomsCount }).reduce((s, _, i) => s + roomStay(i), 0)) : "—"}</b>
    </div>
    <div class="mini">${lines.join(" · ")}</div>
    <button class="btn btn-forest btn-wide" ${ready ? "" : "disabled"}>${ready ? "Далее — услуги уже на соседнем экране" : "Выберите тариф, чтобы продолжить"}</button>
  `;
}

function extraRow(extra, qty, occ, scope, roomIndex) {
  const amount = extraAmount(extra, qty || (extra.perPerson ? 0 : 0), occ);
  const priceHint = extra.type === "person-night"
    ? money(extra.price) + " / чел. / ночь"
    : extra.type === "night" ? money(extra.price) + " / ночь" : money(extra.price);
  if (extra.perPerson) {
    const max = occTotal(occ);
    return `
      <div class="extra">
        <div>
          <div class="e-name">${extra.name}</div>
          <div class="e-note">${extra.note} · до ${max} порц.</div>
        </div>
        <div>
          <div class="e-price">${qty ? money(extraAmount(extra, qty, occ)) : priceHint}</div>
          <div class="step-btns" style="justify-content:flex-end;margin-top:6px">
            <button class="round" data-act="extra-qty" data-scope="${scope}" data-id="${extra.id}" data-room="${roomIndex}" data-d="-1" ${!qty ? "disabled" : ""}>−</button>
            <span class="qty">${qty || 0}</span>
            <button class="round" data-act="extra-qty" data-scope="${scope}" data-id="${extra.id}" data-room="${roomIndex}" data-d="1" ${(qty || 0) >= max ? "disabled" : ""}>+</button>
          </div>
        </div>
      </div>`;
  }
  return `
    <div class="extra">
      <div>
        <div class="e-name">${extra.name}</div>
        <div class="e-note">${extra.note}</div>
      </div>
      <div style="text-align:right">
        <div class="e-price">${qty ? money(extraAmount(extra, qty, occ)) : priceHint}</div>
        <button class="toggle ${qty ? "is-on" : ""}" data-act="extra" data-scope="${scope}" data-id="${extra.id}" data-room="${roomIndex}" style="margin-top:6px"></button>
      </div>
    </div>`;
}

function renderScreen2() {
  if (!roomsReady()) {
    document.getElementById("screen-2").innerHTML = `
      <div class="empty">
        <h3>Сначала номер</h3>
        <p>Когда на первом экране выбран тариф${state.roomsCount === 2 ? " для обоих номеров" : ""}, здесь откроются услуги.</p>
      </div>`;
    document.getElementById("dock-2").innerHTML = `<div class="mini">Ожидает выбор номера</div>`;
    return;
  }

  const bookingOcc = { adults: state.adults, children: state.children };
  const bookingBlock = `
    <div class="extra-group">
      <h3>На всю бронь</h3>
      <div class="room-extra-box">
        ${EXTRAS.booking.map((e) => extraRow(e, state.extrasBooking[e.id] || 0, bookingOcc, "booking", 0)).join("")}
      </div>
    </div>`;

  const roomBlocks = Array.from({ length: state.roomsCount }).map((_, i) => {
    const sel = state.selections[i];
    const hasBreakfast = tar(sel.tariffId).breakfast;
    const occ = state.occupancy[i];
    const rows = EXTRAS.room.map((e) => {
      if (e.id === "breakfast" && hasBreakfast) {
        return `<div class="extra"><div><div class="e-name">Завтрак</div><div class="e-note">Уже в тарифе «${tar(sel.tariffId).name}»</div></div><span class="included">включено × ${occTotal(occ)}</span></div>`;
      }
      return extraRow(e, state.extrasRooms[i][e.id] || 0, occ, "room", i);
    }).join("");
    const title = state.roomsCount === 2
      ? `Номер ${i + 1} · ${cat(sel.categoryId).name}`
      : cat(sel.categoryId).name;
    return `
      <div class="room-extra-box">
        <div class="room-extra-head">
          <b>${title}</b>
          <span>${occupancyLabel(occ)}</span>
        </div>
        ${rows}
      </div>`;
  }).join("");

  document.getElementById("screen-2").innerHTML = `
    <div class="hotel-head">
      <div>
        <b>${state.roomsCount === 2 ? "Услуги по номерам" : "Услуги к номеру"}</b>
        <div class="hotel-sub">${state.roomsCount === 2
          ? "Общее — на бронь, остальное — отдельно для каждого номера"
          : "Можно ничего не добавлять и сразу смотреть итог справа"}</div>
      </div>
    </div>
    ${bookingBlock}
    <div class="extra-group">
      <h3>${state.roomsCount === 2 ? "Для каждого номера" : "Комфорт в номере"}</h3>
      ${roomBlocks}
    </div>
  `;

  document.getElementById("dock-2").innerHTML = `
    <div class="dock-top">
      <span class="muted">Дополнительно</span>
      <b>${money(extrasTotal())}</b>
    </div>
    <div class="mini">${extrasTotal() ? "Услуги уже попали в подтверждение справа" : "Без допов — можно оформлять как есть"}</div>
    <button class="btn btn-forest btn-wide">К подтверждению →</button>
  `;
}

function stepDates() {
  const n = nights();
  if (!n) return { done: false, body: "Выберите заезд и выезд", sub: "Календарь на первом экране" };
  return { done: true, body: fmtRange(state.checkIn, state.checkOut), sub: n + " " + plural(n, "ночь", "ночи", "ночей") };
}

function stepStay() {
  if (!roomsReady()) {
    return {
      done: false,
      body: state.roomsCount === 2 ? "Назначьте тариф двум номерам" : "Выберите категорию и тариф",
      sub: occupancyLabel({ adults: state.adults, children: state.children }) + " · " + state.roomsCount + " " + plural(state.roomsCount, "номер", "номера", "номеров"),
    };
  }
  const lines = Array.from({ length: state.roomsCount }).map((_, i) => {
    const s = state.selections[i];
    const c = cat(s.categoryId);
    const t = tar(s.tariffId);
    return `${state.roomsCount === 2 ? "№" + (i + 1) + " · " : ""}${c.name} · ${t.name} · ${occupancyLabel(state.occupancy[i])}`;
  });
  const stay = Array.from({ length: state.roomsCount }).reduce((s, _, i) => s + roomStay(i), 0);
  return { done: true, body: lines[0], sub: lines.slice(1).join("\n") || (tNote()), sum: stay };
}

function tNote() {
  const s = state.selections[0];
  if (!s.tariffId) return "";
  const t = tar(s.tariffId);
  return t.note;
}

function stepExtras() {
  const items = [];
  for (const extra of EXTRAS.booking) {
    if (state.extrasBooking[extra.id]) items.push(extra.name);
  }
  for (let i = 0; i < state.roomsCount; i++) {
    const prefix = state.roomsCount === 2 ? "№" + (i + 1) + ": " : "";
    for (const extra of EXTRAS.room) {
      const q = state.extrasRooms[i][extra.id];
      if (!q) continue;
      items.push(prefix + extra.name + (q > 1 ? " ×" + q : ""));
    }
    const sel = state.selections[i];
    if (sel.tariffId && tar(sel.tariffId).breakfast) items.push(prefix + "завтрак включён");
  }
  if (!roomsReady()) return { done: false, body: "Появится после выбора номера", sub: "" };
  if (!items.length) return { done: true, body: "Без дополнительных услуг", sub: "Можно добавить на втором экране" };
  return { done: true, body: items[0], sub: items.slice(1).join(" · "), sum: extrasTotal() };
}

function renderScreen3() {
  if (state.booked) {
    document.getElementById("screen-3").innerHTML = `
      <div class="success">
        <div class="mark">✓</div>
        <h3>Бронь собрана</h3>
        <p>Это прототип: номер удерживается визуально, без реальной оплаты.</p>
        <p style="font-weight:800;margin-top:12px">${money(grandTotal())}</p>
        <button class="btn btn-ghost" data-act="reset" style="margin-top:16px">Собрать заново</button>
      </div>`;
    document.getElementById("dock-3").innerHTML = "";
    return;
  }

  const d = stepDates();
  const stay = stepStay();
  const extras = stepExtras();
  const ready = roomsReady() && nights() > 0;

  document.getElementById("screen-3").innerHTML = `
    <div class="hotel-head">
      <div>
        <b>Как складывается бронь</b>
        <div class="hotel-sub">Каждый шаг слева сразу становится блоком здесь</div>
      </div>
    </div>
    <div class="timeline">
      <article class="t-step ${d.done ? "done" : "wait"}">
        <h4>1 · Даты</h4>
        <div class="body">${d.body}</div>
        <div class="sub">${d.sub}</div>
      </article>
      <article class="t-step ${stay.done ? "done" : "wait"}">
        <h4>2 · Размещение</h4>
        <div class="body">${stay.body}</div>
        <div class="sub">${(stay.sub || "").replace(/\n/g, "<br>")}</div>
        ${stay.sum ? `<div class="sum">${money(stay.sum)}</div>` : ""}
      </article>
      <article class="t-step ${roomsReady() ? "done" : "wait"}">
        <h4>3 · Услуги</h4>
        <div class="body">${extras.body}</div>
        <div class="sub">${extras.sub || ""}</div>
        ${extras.sum ? `<div class="sum">${money(extras.sum)}</div>` : ""}
      </article>
      <article class="t-step ${ready ? "done" : "wait"}">
        <h4>4 · Гость и оплата</h4>
        ${ready ? `
          <div class="field"><label>Имя</label><input data-field="name" value="${state.guest.name}" placeholder="Как в паспорте" /></div>
          <div class="field"><label>Телефон</label><input data-field="phone" value="${state.guest.phone}" placeholder="+7" /></div>
          <div class="field"><label>Почта</label><input data-field="email" value="${state.guest.email}" placeholder="для ваучера" /></div>
          <div class="pay">
            <button type="button" class="${state.pay === "hotel" ? "is-on" : ""}" data-act="pay" data-id="hotel">Оплата в отеле</button>
            <button type="button" class="${state.pay === "now" ? "is-on" : ""}" data-act="pay" data-id="now">Картой сейчас</button>
          </div>
        ` : `<div class="body">Откроется, когда выбран номер</div>`}
      </article>
    </div>
    ${ready ? `
      <div class="total-box" style="margin-top:12px">
        <div class="lbl">Итого к оплате</div>
        <div class="num">${money(grandTotal())}</div>
        <div class="break">
          <div class="row-line"><span>Проживание</span><span>${money(Array.from({ length: state.roomsCount }).reduce((s, _, i) => s + roomStay(i), 0))}</span></div>
          <div class="row-line"><span>Услуги</span><span>${money(extrasTotal())}</span></div>
        </div>
      </div>` : ""}
  `;

  document.getElementById("dock-3").innerHTML = ready ? `
    <div class="mini">${state.pay === "hotel" ? "Гарантия картой не списывается в прототипе" : "Оплата картой — демонстрационный шаг"}</div>
    <button class="btn btn-gold btn-wide" data-act="book">Оформить бронь · ${money(grandTotal())}</button>
  ` : `<div class="mini">Соберите даты и тариф слева — итог появится сам</div>`;
}

function render() {
  renderPresets();
  renderScreen1();
  renderScreen2();
  renderScreen3();
}

function onDay(t) {
  const date = startOfDay(new Date(Number(t)));
  if (!state.checkIn || (state.checkIn && state.checkOut) || date <= state.checkIn) {
    state.checkIn = date;
    state.checkOut = null;
    state.picking = "out";
  } else {
    state.checkOut = date;
    state.picking = null;
  }
  state.booked = false;
  render();
  pulse(2); pulse(3);
}

document.body.addEventListener("click", (e) => {
  const el = e.target.closest("[data-act]");
  if (!el) return;
  const act = el.dataset.act;
  if (act === "preset") applyPreset(el.dataset.id);
  if (act === "toggle-cal") { state.calendarOpen = !state.calendarOpen; state.guestsOpen = false; render(); }
  if (act === "toggle-guests") { state.guestsOpen = !state.guestsOpen; state.calendarOpen = false; render(); }
  if (act === "cal-prev") { state.calMonth = new Date(state.calMonth.getFullYear(), state.calMonth.getMonth() - 1, 1); render(); }
  if (act === "cal-next") { state.calMonth = new Date(state.calMonth.getFullYear(), state.calMonth.getMonth() + 1, 1); render(); }
  if (act === "day") onDay(el.dataset.t);
  if (act === "guest") setGuests(el.dataset.kind, Number(el.dataset.d));
  if (act === "rooms") setRoomsCount(Number(el.dataset.n));
  if (act === "tab") { state.activeRoom = Number(el.dataset.i); render(); }
  if (act === "move") moveGuest(Number(el.dataset.from), Number(el.dataset.to), el.dataset.kind);
  if (act === "pick") pickTariff(Number(el.dataset.room), el.dataset.cat, el.dataset.tar);
  if (act === "extra") toggleExtra(el.dataset.scope, el.dataset.id, Number(el.dataset.room));
  if (act === "extra-qty") {
    const room = Number(el.dataset.room);
    const id = el.dataset.id;
    const bag = el.dataset.scope === "booking" ? state.extrasBooking : state.extrasRooms[room];
    const max = el.dataset.scope === "booking" ? 1 : occTotal(state.occupancy[room]);
    bag[id] = Math.min(max, Math.max(0, (bag[id] || 0) + Number(el.dataset.d)));
    state.booked = false;
    render();
    pulse(3);
  }
  if (act === "pay") { state.pay = el.dataset.id; render(); }
  if (act === "book") { state.booked = true; render(); }
  if (act === "reset") { state.booked = false; state.guest = { name: "", email: "", phone: "", comment: "" }; render(); }
});

document.body.addEventListener("change", (e) => {
  const el = e.target.closest("[data-act='age']");
  if (!el) return;
  state.childAges[Number(el.dataset.i)] = Number(el.value);
});

document.body.addEventListener("input", (e) => {
  const el = e.target.closest("[data-field]");
  if (!el) return;
  state.guest[el.dataset.field] = el.value;
});

render();
