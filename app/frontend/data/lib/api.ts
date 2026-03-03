function getCsrfToken(): string {
  const meta = document.querySelector('meta[name="csrf-token"]')
  if (meta) return meta.getAttribute("content") ?? ""
  // Fallback: read from cookie (for framework-mode SPA without Rails meta tags)
  const match = document.cookie.match(/csrf_token=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ""
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
