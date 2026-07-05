export function formatNumber(value, locale = 'id-ID') {
  return new Intl.NumberFormat(locale).format(value);
}
