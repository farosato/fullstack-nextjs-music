export default function fetcher(path, data = undefined) {
  return fetch(`${window.location.origin}/api${path}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status >= 400) {
      throw new Error(`Error fetching /api${path}: ${res.status}`)
    }
    return res.json()
  })
}
