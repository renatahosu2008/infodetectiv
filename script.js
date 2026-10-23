
const intrebari = [
  {
    text: "Cum verificăm dacă o știre este adevărată?",
    variante: [
      "Credem titlul fără să citim articolul.",
      "Verificăm informația din mai multe surse de încredere.",
      "Distribuim știrea imediat."
    ],
    corect: 1
  },
  {
    text: "Ce faci dacă o știre nu indică sursa?",
    variante: [
      "O distribui imediat.",
      "Verific informația din surse de încredere.",
      "Presupun că este adevărată."
    ],
    corect: 1
  },
  {
    text: "Ce poate indica o știre înșelătoare?",
    variante: [
      "Prezintă surse verificabile.",
      "Este confirmată de publicații serioase.",
      "Are un titlu exagerat."
    ],
    corect: 2
  },
  {
    text: "Cum verifici o fotografie dintr-o știre?",
    variante: [
      "Verific originea și contextul.",
      "Cred automat legenda.",
      "Presupun că fotografia este recentă."
    ],
    corect: 0
  },
  {
    text: "Ce faci înainte să distribui o informație?",
    variante: [
      "O distribui dacă este populară.",
      "Verific autorul, data și sursele.",
      "Mă bazez pe comentarii."
    ],
    corect: 1
  }
];

let scor = 0;
let indexIntrebare = 0;
let raspunsDat = false;

const butonStart = document.getElementById("start");
const butonContinua = document.getElementById("continua");
const zonaScor = document.getElementById("scor");
const zonaProgres = document.getElementById("progres");
const zonaIntrebare = document.getElementById("intrebare");
const zonaRaspunsuri = document.getElementById("raspunsuri");
const zonaMesaj = document.getElementById("mesaj");

butonStart.addEventListener("click", function () {
  scor = 0;
  indexIntrebare = 0;
  raspunsDat = false;

  butonStart.hidden = true;
  afiseazaIntrebare();
});

function afiseazaIntrebare() {
  raspunsDat = false;
  zonaMesaj.textContent = "";
  zonaRaspunsuri.replaceChildren();
  butonContinua.hidden = true;

  const intrebare = intrebari[indexIntrebare];

  zonaIntrebare.textContent = intrebare.text;
  zonaProgres.textContent =
    "Întrebarea " + (indexIntrebare + 1) +
    " din " + intrebari.length;

  intrebare.variante.forEach(function (varianta, index) {
    const buton = document.createElement("button");

    buton.textContent = varianta;
    buton.addEventListener("click", function () {
      verifica(index);
    });

    zonaRaspunsuri.appendChild(buton);
  });

  zonaScor.textContent = "⭐ Scor: " + scor + " puncte";
}

function verifica(alegere) {
  if (raspunsDat) {
    return;
  }

  raspunsDat = true;

  const intrebare = intrebari[indexIntrebare];
  const butoane = zonaRaspunsuri.querySelectorAll("button");

  butoane.forEach(function (buton) {
    buton.disabled = true;
  });

  if (alegere === intrebare.corect) {
    scor += 10;
    zonaMesaj.textContent = "Corect! +10 puncte 🎉";
  } else {
    zonaMesaj.textContent =
      "Răspuns greșit. Varianta corectă: " +
      intrebare.variante[intrebare.corect];
  }

  zonaScor.textContent = "⭐ Scor: " + scor + " puncte";

  if (indexIntrebare < intrebari.length - 1) {
    butonContinua.textContent = "Următoarea întrebare";
  } else {
    butonContinua.textContent = "Vezi rezultatul final";
  }

  butonContinua.hidden = false;
}

butonContinua.addEventListener("click", function () {
  indexIntrebare++;

  if (indexIntrebare < intrebari.length) {
    afiseazaIntrebare();
  } else {
    afiseazaRezultatFinal();
  }
});

function afiseazaRezultatFinal() {
  zonaProgres.textContent = "Misiune încheiată!";
  zonaIntrebare.textContent =
    "Ai obținut " + scor + " din " +
    (intrebari.length * 10) + " puncte!";

  zonaRaspunsuri.replaceChildren();
  zonaMesaj.textContent =
    scor === 50
      ? "Excelent! Ești un detectiv al informațiilor! 🏆"
      : scor >= 30
        ? "Bravo! Continuă să verifici informațiile!"
        : "Mai exersează: verifică sursele înainte să distribui!";

  butonContinua.hidden = true;
  butonStart.textContent = "Joacă din nou";
  butonStart.hidden = false;
}
