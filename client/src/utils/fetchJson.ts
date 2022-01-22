export async function fetchJson<T = any>(method: 'GET' | 'POST', url: string, body?: T): Promise<T | undefined> {
  const response = await fetch(url, {
    method,
    headers: {
      'content-type': 'application/json'
    },
    body: body ? JSON.stringify(body) : null
  });

  let data;
  try {
    data = (await response.json()).data as T;
  } catch (e) {
    data = undefined;
  }

  return data;
}
