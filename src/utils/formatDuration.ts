import { differenceInMonths, differenceInYears, parse } from "date-fns";
import { enUS, pt } from "date-fns/locale";

function getLocale(language: string): Locale {
  return language === "pt" ? pt : enUS;
}

function getDurationTranslations(language: string) {
  return {
    years: language === "pt" ? "anos" : "years",
    year: language === "pt" ? "ano" : "year",
    months: language === "pt" ? "meses" : "months",
    month: language === "pt" ? "mês" : "month",
    and: language === "pt" ? "e" : "and",
  };
}

export function formatDuration(
  start: string,
  end: string,
  language: string
): string {
  const startLocale = getLocale(language);
  const endLocale =
    end.toLowerCase() === "presente" || end.toLowerCase() === "present"
      ? pt
      : getLocale(language);
  const durationTranslations = getDurationTranslations(language);

  const startDate = parse(start, "MMMM yyyy", new Date(), {
    locale: startLocale,
  });
  const endDate =
    end.toLowerCase() === "presente" || end.toLowerCase() === "present"
      ? new Date()
      : parse(end, "MMMM yyyy", new Date(), { locale: endLocale });

  const totalMonths = Math.abs(differenceInMonths(endDate, startDate));
  const years = differenceInYears(endDate, startDate);
  const remainingMonths = totalMonths - years * 12;

  let duration = "";
  if (years > 0) {
    duration = `${years} ${
      years === 1 ? durationTranslations.year : durationTranslations.years
    }`;
  }
  if (remainingMonths > 0) {
    if (duration.length > 0) {
      duration += ` ${durationTranslations.and} `;
    }
    duration += `${remainingMonths} ${
      remainingMonths === 1
        ? durationTranslations.month
        : durationTranslations.months
    }`;
  }

  return duration;
}
