import { useState } from "react";
import type { Locale } from "../../i18n";
import { AppTitle, words } from "./ui";

export function Health({ language }: { language: Locale }) {
  const w = (pt: string, en: string, es: string) => words(language, pt, en, es);
  const [steps, setSteps] = useState(4200);
  const [week, setWeek] = useState(false);
  const [workout, setWorkout] = useState<"bjj" | "gym">("bjj");
  const bars = week
    ? [48, 70, 36, 85, 62, 92, 42]
    : [8, 12, 7, 45, 67, 32, 25, 82, 60, 42, 22, 15];
  return (
    <div className="ios-health">
      <AppTitle
        title={w("Resumo", "Summary", "Resumen")}
        subtitle={w(
          "Movimento fora das telas",
          "Movement beyond the screen",
          "Movimiento fuera de las pantallas",
        )}
      />
      <div className="ios-health-profile">
        <span className="ios-belt" aria-hidden="true" />
        <div>
          <strong>Jiu-jitsu</strong>
          <span>{w("Faixa marrom", "Brown belt", "Cinturón marrón")}</span>
        </div>
        <span aria-hidden="true">♡</span>
      </div>
      <h5>{w("Atividade", "Activity", "Actividad")}</h5>
      <div className="ios-health-card">
        <div className="ios-card-heading">
          <strong>↗ {w("Passos", "Steps", "Pasos")}</strong>
          <span>{w("Exemplo", "Sample", "Ejemplo")}</span>
        </div>
        <div className="ios-segment">
          <button aria-pressed={!week} onClick={() => setWeek(false)}>
            {w("Dia", "Day", "Día")}
          </button>
          <button aria-pressed={week} onClick={() => setWeek(true)}>
            {w("Semana", "Week", "Semana")}
          </button>
        </div>
        <strong className="ios-metric">
          {(week ? 35700 + steps - 4200 : steps).toLocaleString(language)}
        </strong>
        <div className="ios-bars" aria-hidden="true">
          {bars.map((height, i) => (
            <i key={i} style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className="ios-chart-axis" aria-hidden="true">
          <span>{week ? w("SEG", "MON", "LUN") : "00:00"}</span>
          <span>{week ? w("DOM", "SUN", "DOM") : "23:59"}</span>
        </div>
        <button
          className="ios-link-button"
          onClick={() => setSteps((v) => Math.min(v + 500, 100000))}
        >
          {w("Simular caminhada", "Simulate a walk", "Simular caminata")} +500
        </button>
      </div>
      <h5>{w("Meus esportes", "My sports", "Mis deportes")}</h5>
      <div className="ios-segment">
        <button
          aria-pressed={workout === "bjj"}
          onClick={() => setWorkout("bjj")}
        >
          Jiu-jitsu
        </button>
        <button
          aria-pressed={workout === "gym"}
          onClick={() => setWorkout("gym")}
        >
          {w("Academia", "Gym", "Gimnasio")}
        </button>
      </div>
      <div className="ios-sport-detail">
        <strong>
          {workout === "bjj"
            ? w("No tatame", "On the mat", "En el tatami")
            : w(
                "Treino de força",
                "Strength training",
                "Entrenamiento de fuerza",
              )}
        </strong>
        <p>
          {workout === "bjj"
            ? w(
                "Técnica, estratégia e prática.",
                "Technique, strategy and practice.",
                "Técnica, estrategia y práctica.",
              )
            : w(
                "Um tempo para movimentar o corpo.",
                "Time to get moving.",
                "Un tiempo para mover el cuerpo.",
              )}
        </p>
      </div>
      <p className="ios-caption">
        {w(
          "Gráfico e passos demonstrativos. Nenhum dado de saúde é coletado.",
          "Sample chart and steps. No health data is collected.",
          "Gráfico y pasos de ejemplo. No se recopilan datos de salud.",
        )}
      </p>
    </div>
  );
}
