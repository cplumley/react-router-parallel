function getCsrfToken(): string {
  const meta = document.querySelector('meta[name="csrf-token"]')
  return meta?.getAttribute("content") ?? ""
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": getCsrfToken(),
      ...options.headers,
    },
  })
  return response
}
