import type { Locale } from "../i18n";

export type PhonePreferences = {
  dark: boolean;
  airplane: boolean;
  wifi: boolean;
  brightness: number;
  hour24: boolean;
  reduceMotion: boolean;
  wallpaper: "ocean" | "dusk" | "forest";
};
export const defaultPhonePreferences: PhonePreferences = {
  dark: false,
  airplane: false,
  wifi: true,
  brightness: 100,
  hour24: true,
  reduceMotion: false,
  wallpaper: "ocean",
};
const copy = {
  pt: {
    connection: "Conexões",
    display: "Tela e aparência",
    general: "Preferências",
    dark: "Aparência escura",
    airplane: "Modo avião",
    wifi: "Wi-Fi",
    brightness: "Brilho",
    hour24: "Relógio de 24 horas",
    reduceMotion: "Reduzir movimento",
    wallpaper: "Papel de parede",
    ocean: "Oceano",
    dusk: "Entardecer",
    forest: "Floresta",
    hint: "Estes ajustes se aplicam somente a este telefone demonstrativo.",
    automatic: "Data e hora automáticas",
    local: "Relógio e fuso horário do seu dispositivo",
  },
  en: {
    connection: "Connections",
    display: "Display & appearance",
    general: "Preferences",
    dark: "Dark appearance",
    airplane: "Airplane mode",
    wifi: "Wi-Fi",
    brightness: "Brightness",
    hour24: "24-hour time",
    reduceMotion: "Reduce motion",
    wallpaper: "Wallpaper",
    ocean: "Ocean",
    dusk: "Dusk",
    forest: "Forest",
    hint: "These settings apply only to this demo phone.",
    automatic: "Automatic date & time",
    local: "Your device’s clock and time zone",
  },
  es: {
    connection: "Conexiones",
    display: "Pantalla y apariencia",
    general: "Preferencias",
    dark: "Apariencia oscura",
    airplane: "Modo avión",
    wifi: "Wi-Fi",
    brightness: "Brillo",
    hour24: "Reloj de 24 horas",
    reduceMotion: "Reducir movimiento",
    wallpaper: "Fondo de pantalla",
    ocean: "Océano",
    dusk: "Atardecer",
    forest: "Bosque",
    hint: "Estos ajustes solo se aplican a este teléfono de demostración.",
    automatic: "Fecha y hora automáticas",
    local: "Reloj y zona horaria de tu dispositivo",
  },
};
export function PhoneSettings({
  language,
  settings,
  change,
}: {
  language: Locale;
  settings: PhonePreferences;
  change: (patch: Partial<PhonePreferences>) => void;
}) {
  const t = copy[language];
  const toggle = (
    key: "dark" | "airplane" | "wifi" | "hour24" | "reduceMotion",
  ) => (
    <label className="phone-setting-row">
      <span>{t[key]}</span>
      <input
        type="checkbox"
        role="switch"
        checked={settings[key]}
        onChange={(e) => change({ [key]: e.target.checked })}
      />
    </label>
  );
  return (
    <div className="mock-settings">
      <p>{t.hint}</p>
      <fieldset>
        <legend>{t.connection}</legend>
        {toggle("airplane")}
        {toggle("wifi")}
      </fieldset>
      <fieldset>
        <legend>{t.display}</legend>
        {toggle("dark")}
        <label className="phone-setting-brightness">
          <span>
            {t.brightness} <output>{settings.brightness}%</output>
          </span>
          <input
            type="range"
            aria-label={t.brightness}
            min="45"
            max="100"
            value={settings.brightness}
            onChange={(e) => change({ brightness: Number(e.target.value) })}
          />
        </label>
        <div
          className="phone-wallpaper-options"
          role="group"
          aria-label={t.wallpaper}
        >
          {(["ocean", "dusk", "forest"] as const).map((wallpaper) => (
            <button
              key={wallpaper}
              aria-label={t[wallpaper]}
              aria-pressed={settings.wallpaper === wallpaper}
              data-wallpaper={wallpaper}
              onClick={() => change({ wallpaper })}
            >
              <span>{t[wallpaper]}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{t.general}</legend>
        {toggle("hour24")}
        {toggle("reduceMotion")}
        <div className="phone-setting-info">
          <strong>{t.automatic}</strong>
          <small>{t.local}</small>
        </div>
      </fieldset>
    </div>
  );
}
