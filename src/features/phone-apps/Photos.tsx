import { useState } from "react";
import type { Locale } from "../../i18n";
import { AppTitle, words } from "./ui";

function AlbumArt({ index }: { index: number }) {
  if (index === 0)
    return (
      <img
        src={`${import.meta.env.BASE_URL}raphael-avatar.jpg`}
        alt="Raphael"
      />
    );
  return (
    <svg viewBox="0 0 160 180" aria-hidden="true">
      <rect
        width="160"
        height="180"
        fill={
          ["", "#efe6d6", "#dce6d7", "#20354b", "#efce9f", "#222b32"][index]
        }
      />
      {index === 1 ? (
        <>
          <path
            d="M40 35 65 22H95L122 37 141 94 111 105 104 71 111 169H49L55 71 44 104 20 93Z"
            fill="#faf9f4"
          />
          <path
            d="m65 22 22 82 8-60M95 22 71 106"
            stroke="#c8bfb2"
            strokeWidth="5"
            fill="none"
          />
          <path d="M47 104H113V120H47Z" fill="#694834" />
          <path d="m76 114-9 41 13-3 6-31 8 32 12 1-15-42" fill="#79573b" />
          <rect x="48" y="107" width="16" height="10" fill="#242629" />
        </>
      ) : index === 2 ? (
        <>
          <path d="M0 110 60 52 125 127 160 91V180H0Z" fill="#7b9f8f" />
          <path d="m0 152 87-73 73 65V180H0Z" fill="#3d6b64" />
          <circle cx="122" cy="35" r="16" fill="#f9d697" />
        </>
      ) : index === 3 ? (
        <>
          <rect x="19" y="40" width="124" height="84" rx="5" fill="#151e2b" />
          <g stroke="#8eb9c4" strokeWidth="4">
            <path d="M32 61H72M40 75H110M40 89H92" />
          </g>
          <path d="M9 128H151L144 137H16Z" fill="#98a7b2" />
          <path d="M0 139H160V180H0Z" fill="#b39278" />
        </>
      ) : index === 4 ? (
        <>
          <ellipse cx="79" cy="125" rx="53" ry="12" fill="#d6af7f" />
          <path
            d="M119 70h13q25 32-16 36"
            fill="none"
            stroke="#faf4e8"
            strokeWidth="9"
          />
          <path d="M34 69H121L115 118Q77 143 40 117Z" fill="#faf4e8" />
          <ellipse cx="77" cy="69" rx="43" ry="12" fill="#77503c" />
          <path
            d="M76 34Q87 24 76 12M92 41Q101 30 91 22"
            stroke="#fff8"
            strokeWidth="4"
            fill="none"
          />
        </>
      ) : (
        <>
          <path d="M38 95H123" stroke="#9ea9b0" strokeWidth="11" />
          <g fill="#4d5d6a" stroke="#83929b" strokeWidth="2">
            <rect x="20" y="65" width="18" height="60" rx="5" />
            <rect x="39" y="54" width="22" height="82" rx="5" />
            <rect x="102" y="54" width="22" height="82" rx="5" />
            <rect x="125" y="65" width="18" height="60" rx="5" />
          </g>
        </>
      )}
    </svg>
  );
}
export function Photos({ language }: { language: Locale }) {
  const w = (pt: string, en: string, es: string) => words(language, pt, en, es);
  const [photo, setPhoto] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filter, setFilter] = useState(false);
  const names = [
    "Raphael",
    "Jiu-jitsu",
    w("Ao ar livre", "Outdoors", "Al aire libre"),
    w("Criar", "Build", "Crear"),
    w("Uma pausa", "A break", "Una pausa"),
    w("Academia", "Gym", "Gimnasio"),
  ];
  const title = w("Fotos", "Photos", "Fotos");
  return (
    <div className="ios-photos">
      {photo === null ? (
        <>
          <AppTitle
            title={w("Biblioteca", "Library", "Biblioteca")}
            subtitle={w(
              "Um pouco do meu mundo",
              "A little of my world",
              "Un poco de mi mundo",
            )}
          />
          <div className="ios-segment">
            <button aria-pressed={!filter} onClick={() => setFilter(false)}>
              {w("Todas", "All", "Todas")}
            </button>
            <button aria-pressed={filter} onClick={() => setFilter(true)}>
              {w("Favoritas", "Favorites", "Favoritas")}{" "}
              {favorites.length || ""}
            </button>
          </div>
          <div className="mock-gallery">
            {names.map(
              (name, i) =>
                (!filter || favorites.includes(i)) && (
                  <button
                    key={i}
                    className={`mock-photo photo-${i}`}
                    aria-label={`${title} ${i + 1}`}
                    onClick={() => setPhoto(i)}
                  >
                    <AlbumArt index={i} />
                    <span>{name}</span>
                  </button>
                ),
            )}
          </div>
          {filter && favorites.length === 0 && (
            <p>
              {w(
                "Abra uma imagem e toque no coração.",
                "Open an image and tap the heart.",
                "Abre una imagen y toca el corazón.",
              )}
            </p>
          )}
        </>
      ) : (
        <>
          <div className="ios-actions">
            <button onClick={() => setPhoto(null)}>
              ‹ {w("Biblioteca", "Library", "Biblioteca")}
            </button>
            <button
              onClick={() =>
                setFavorites((old) =>
                  old.includes(photo)
                    ? old.filter((i) => i !== photo)
                    : [...old, photo],
                )
              }
              aria-label={w(
                "Favoritar imagem",
                "Favorite image",
                "Marcar como favorita",
              )}
              aria-pressed={favorites.includes(photo)}
            >
              {favorites.includes(photo) ? "♥" : "♡"}
            </button>
          </div>
          <div className={`mock-photo mock-photo-large photo-${photo}`}>
            <AlbumArt index={photo} />
          </div>
          <h5>{names[photo]}</h5>
        </>
      )}
      <p className="ios-caption">
        {w(
          "Retrato e ilustrações · coleção demonstrativa",
          "Portrait & illustrations · demo collection",
          "Retrato e ilustraciones · colección de ejemplo",
        )}
      </p>
    </div>
  );
}
