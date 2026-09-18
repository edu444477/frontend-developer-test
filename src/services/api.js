export const BASE_URL =
  'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus';

// The API uses snake_case and includes fields the UI never uses (email,
// age, country, height, a random string...). Normalizing here keeps that
// shape out of the rest of the app and out of localStorage.
function normalizeListItem(raw) {
  return {
    id: raw.id,
    firstName: raw.first_name,
    lastName: raw.last_name,
    gender: raw.gender,
    profession: raw.profession,
    image: raw.image,
  };
}

function normalizeDetail(raw, id) {
  return {
    id,
    firstName: raw.first_name,
    lastName: raw.last_name,
    gender: raw.gender,
    profession: raw.profession,
    image: raw.image,
    description: raw.description,
  };
}

export async function getOompaLoompas(page) {
  const response = await fetch(`${BASE_URL}/oompa-loompas?page=${page}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch page ${page}`);
  }
  const data = await response.json();

  return {
    current: data.current,
    total: data.total,
    results: data.results.map(normalizeListItem),
  };
}

export async function getOompaLoompaDetail(id) {
  const response = await fetch(`${BASE_URL}/oompa-loompas/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch detail for id ${id}`);
  }
  const data = await response.json();

  return normalizeDetail(data, id);
}
