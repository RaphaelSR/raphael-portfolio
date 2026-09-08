import { useState } from "react";
import type { Locale } from "../../i18n";
import { words } from "./ui";
const routes = [
  "M110 185V130H46V82",
  "M110 185H155V217",
  "M110 185V130H206V64",
];
export function Maps({ language }: { language: Locale }) {
  const w = (pt: string, en: string, es: string) => words(language, pt, en, es);
  const places = [
    w("Tatame", "Dojo", "Tatami"),
    w("Orla", "Waterfront", "Costanera"),
    w("Academia", "Gym", "Gimnasio"),
  ];
  const [place, setPlace] = useState(0);
  const [route, setRoute] = useState(false);
  const [search, setSearch] = useState("");
  const choose = (index: number) => {
    setPlace(index);
    setRoute(false);
  };
  return (
    <div className="ios-maps">
      <div className="ios-map-canvas">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 250 280"
          role="img"
          aria-label={w(
            "Mapa ilustrativo de um bairro",
            "Illustrated neighborhood map",
            "Mapa ilustrativo de un barrio",
          )}
        >
          <rect width="250" height="280" fill="#e7e5da" />
          <path
            d="M0 0H62L36 56H0ZM159 5H233V95H169ZM13 160H76V235H8Z"
            fill="#b6d7a5"
          />
          <path d="M250 144Q175 149 197 224T133 280H250Z" fill="#99cfe1" />
          <g fill="none" stroke="#d0ccbe" strokeWidth="11">
            <path d="M0 82H250M0 130H250M0 185H177M46 0V280M110 0V280M155 0V245M206 0V132" />
          </g>
          <g fill="none" stroke="#fffef9" strokeWidth="8">
            <path d="M0 82H250M0 130H250M0 185H177M46 0V280M110 0V280M155 0V245M206 0V132" />
          </g>
          <path
            d="M-10 257Q69 225 103 241T254 273"
            fill="none"
            stroke="#f6c976"
            strokeWidth="9"
          />
          <g fill="#c9c5b8">
            {[0, 1, 2, 3].flatMap((row) =>
              [0, 1, 2].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={58 + col * 50}
                  y={15 + row * 48}
                  width="35"
                  height="25"
                  rx="3"
                />
              )),
            )}
          </g>
          {route && (
            <path
              className="ios-map-route"
              d={routes[place]}
              fill="none"
              stroke="#2277e8"
              strokeWidth="6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          )}
          <circle cx="110" cy="185" r="14" fill="#297bf333" />
          <circle
            cx="110"
            cy="185"
            r="5"
            fill="#287bed"
            stroke="white"
            strokeWidth="2"
          />
          <text x="13" y="150" fontSize="7" fill="#647e56">
            {w("PARQUE", "PARK", "PARQUE")}
          </text>
        </svg>
        {places.map((name, i) => (
          <button
            key={i}
            className={`mock-map-pin ios-map-pin map-pin-${i}`}
            aria-label={name}
            aria-pressed={place === i}
            onClick={() => choose(i)}
          >
            ●
          </button>
        ))}
        <span className="ios-map-demo">
          {w("Mapa ilustrativo", "Illustrated map", "Mapa ilustrativo")}
        </span>
      </div>
      <div className="ios-map-sheet">
        <i className="ios-sheet-handle" aria-hidden="true" />
        <input
          type="search"
          aria-label={w("Buscar lugares", "Search places", "Buscar lugares")}
          placeholder={w("Buscar no mapa", "Search maps", "Buscar en el mapa")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="mock-place-list">
          {places.map(
            (name, i) =>
              name
                .toLocaleLowerCase(language)
                .includes(search.toLocaleLowerCase(language)) && (
                <button
                  key={i}
                  aria-pressed={place === i}
                  onClick={() => choose(i)}
                >
                  {name}
                </button>
              ),
          )}
        </div>
        <h5>{places[place]}</h5>
        <p>
          {w(
            "Lugares para uma pausa",
            "Places for a break",
            "Lugares para una pausa",
          )}
        </p>
        <button
          className="ios-primary"
          aria-pressed={route}
          onClick={() => setRoute((v) => !v)}
        >
          {route
            ? w("Encerrar trajeto", "End route", "Finalizar ruta")
            : w("Ver trajeto", "Show route", "Ver ruta")}{" "}
          ↗
        </button>
        {route && (
          <p className="ios-route-info" role="status">
            {w(
              "Rota demonstrativa · sem localização real",
              "Demo route · no real location",
              "Ruta de ejemplo · sin ubicación real",
            )}
          </p>
        )}
      </div>
    </div>
  );
}
