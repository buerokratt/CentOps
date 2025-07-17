export async function auth() {
  const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/auth/login`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ login: 'EE30303039914', password: 'OK' }),
  });
  const data = await res.json();
  document.cookie = `customJwtCookie=${data.response}`;
  console.log(`[DEV] cookie settled`);
}
