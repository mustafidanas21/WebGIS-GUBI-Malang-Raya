export async function loadGeoJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  const fields = extractFields(data);

  if (import.meta.env.DEV) {
    // Debug only: membantu memastikan attribute table asli terbaca.
    console.log('Available Fields', fields);
    console.log('First Feature', data?.features?.[0]?.properties ?? {});
  }

  return { data, fields };
}

export function extractFields(geojson) {
  const fieldSet = new Set();

  geojson?.features?.forEach((feature) => {
    Object.keys(feature.properties ?? {}).forEach((field) => fieldSet.add(field));
  });

  return Array.from(fieldSet);
}

export function getDisplayFields(properties = {}) {
  return Object.keys(properties).filter((field) => !isTechnicalField(field));
}

export function formatPropertyValue(value) {
  if (value === null || value === undefined || value === '') return '-';
  if (typeof value === 'number') return Number.isInteger(value) ? String(value) : value.toFixed(4);
  return String(value);
}

function isTechnicalField(field) {
  const normalized = field.toLowerCase();
  return (
    normalized.includes('shape_leng') ||
    normalized.includes('shape_area') ||
    normalized.endsWith('.fid') ||
    normalized === 'fid' ||
    normalized.includes('objectid')
  );
}
