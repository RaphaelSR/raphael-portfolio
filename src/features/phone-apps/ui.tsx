import type { Locale } from "../../i18n";

export function words(language: Locale, pt: string, en: string, es: string) {
  return { pt, en, es }[language];
}
export function AppTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="ios-title">
      <h5>{title}</h5>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}
export function ProfileRow({ subtitle }: { subtitle: string }) {
  return (
    <div className="ios-profile">
      <img src={`${import.meta.env.BASE_URL}raphael-avatar.jpg`} alt="" />
      <div>
        <strong>Raphael Rocha</strong>
        <small>{subtitle}</small>
      </div>
    </div>
  );
}
