const BASE_URL = 'https://dog.ceo/api';

export interface Breed {
  id: string,
  name: string
};

export async function getBreedList(): Promise<Breed[]> {
  const url = `${BASE_URL}/breeds/list/all`;
  const response = await fetch(url);
  const { status, message } = await response.json();
  if (status !== 'success')
    throw new Error(`Error getting breeds list: ${message}`);
  const breeds = parseBreeds(message);
  return breeds;
};

export async function getBreedPhotoList(breed: string): Promise<string[]> {
  const url = `${BASE_URL}/breed/${breed}/images`;
  const response = await fetch(url);
  const { status, message } = await response.json();
  if (status !== 'success')
    throw new Error(`Error getting breeds photo list: ${message}`);
  return message;
};

function parseBreeds(message: any) {
  return Object.keys(message).flatMap((breed) => {
    return message[breed].length
      ? message[breed].map((subbreed: string) => ({id: `${breed}/${subbreed}`, name: `${breed} (${subbreed})`}))
      : { id: breed, name: breed }
  });
};