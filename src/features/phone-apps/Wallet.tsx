import { useState } from "react";
import type { Locale } from "../../i18n";
import { AppTitle, words } from "./ui";
export function Wallet({ language }: { language: Locale }) {
  const w = (pt: string, en: string, es: string) => words(language, pt, en, es);
  const [card, setCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [stamps, setStamps] = useState(3);
  const titles = [
    w("Passe do tatame", "Mat pass", "Pase del tatami"),
    w("Cartão de café", "Coffee card", "Tarjeta de café"),
  ];
  return (
    <div className="ios-wallet">
      <AppTitle
        title={w("Carteira", "Wallet", "Cartera")}
        subtitle={w("Pequenos rituais", "Little rituals", "Pequeños rituales")}
      />
      <div className="ios-wallet-stack">
        <div className="ios-wallet-peek" aria-hidden="true">
          {titles[1 - card]}
        </div>
        <button
          className={`mock-wallet ios-wallet-card card-${card}`}
          data-flipped={flipped}
          aria-label={w("Virar cartão", "Flip card", "Girar tarjeta")}
          onClick={() => setFlipped((v) => !v)}
        >
          {flipped ? (
            <>
              <span className="ios-card-brand">R / R</span>
              <h5>
                {w(
                  "Só para explorar",
                  "Just for exploring",
                  "Solo para explorar",
                )}
              </h5>
              <p>
                {w(
                  "Este passe é demonstrativo, sem pagamentos ou acesso real.",
                  "A demo pass, with no payments or real access.",
                  "Un pase de ejemplo, sin pagos ni acceso real.",
                )}
              </p>
              <span className="mock-wallet-code" />
            </>
          ) : (
            <>
              <span className="ios-card-brand">
                {card === 0 ? "ON THE MAT" : "COFFEE BREAK"}
                <span>◉</span>
              </span>
              <div className="ios-card-emblem" aria-hidden="true">
                {card === 0 ? <span className="ios-belt" /> : "☕"}
              </div>
              <h5>{titles[card]}</h5>
              <div className="ios-card-bottom">
                <span>Raphael Rocha</span>
                <small>
                  {card === 0
                    ? w("FAIXA MARROM", "BROWN BELT", "CINTURÓN MARRÓN")
                    : `${stamps} / 8`}
                </small>
              </div>
            </>
          )}
        </button>
      </div>
      <div className="mock-place-list">
        {titles.map((name, i) => (
          <button
            key={name}
            aria-pressed={card === i}
            onClick={() => {
              setCard(i);
              setFlipped(false);
            }}
          >
            {name}
          </button>
        ))}
      </div>
      {card === 1 && (
        <div className="ios-coffee-stamps">
          <div aria-label={`${stamps} / 8`}>
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} data-filled={i < stamps} aria-hidden="true">
                ✦
              </span>
            ))}
          </div>
          <button onClick={() => setStamps((v) => (v === 8 ? 0 : v + 1))}>
            {stamps === 8
              ? w("Recomeçar", "Start over", "Reiniciar")
              : w("Simular um café", "Simulate a coffee", "Simular un café")}
          </button>
        </div>
      )}
      <p className="ios-caption">
        {w(
          "Toque no cartão para ver o verso.",
          "Tap the card to see the back.",
          "Toca la tarjeta para ver el reverso.",
        )}
      </p>
    </div>
  );
}
