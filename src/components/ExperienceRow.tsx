import type { Experience } from "../content";
import { copy } from "../messages";
import { localize, type Locale } from "../i18n";
import { Icon } from "./Icon";
export function ExperienceRow({
  item,
  language,
  current = false,
}: {
  item: Experience;
  language: Locale;
  current?: boolean;
}) {
  const t = copy[language];
  return (
    <details className="experience-row" open={current ? true : undefined}>
      <summary>
        <span className="experience-date mono">
          {item.period} {current ? t.present : ""}
        </span>
        <span className="experience-name">
          <strong>{item.company}</strong>
          <span>{item.title[language]}</span>
        </span>
        <Icon name="plus" />
      </summary>
      <div className="experience-detail">
        <p>{item.description[language]}</p>
        <div className="tags">
          {item.tags.map((tag) => (
            <span key={localize(tag, language)}>{localize(tag, language)}</span>
          ))}
        </div>
      </div>
    </details>
  );
}
