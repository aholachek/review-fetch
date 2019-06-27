const baseRequest = async (url, options) => {
  let response
  try {
    response = await fetch(url, options)
  } catch (e) {
    return {
      error: {
        type: e.message
      }
    }
  }
  if (!response.ok) {
    let body
    try {
      body = await response.json()
    } catch (e) {}
    return {
      error: {
        type: "http",
        status: response.status,
        body
      }
    }
  }
  const data = await response.json()
  return { data }
}

export const get = async (url, { query } = {}) => {
  if (query) {
    const queryString = query
      ? Object.keys(query)
          .map(d => {
            return `${encodeURIComponent(d)}=${encodeURIComponent(query[d])}`
          })
          .join("&")
      : ""
    url = `${url}?${queryString}`
  }
  return baseRequest(url)
}

export const post = async (url, { json, form } = {}) => {
  const headers = {}
  if (json) headers["Content-Type"] = "application/json;charset=utf-8"
  else if (form) {
    headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8"
  }
  return baseRequest(url, {
    headers,
    method: "POST",
    body: json
      ? JSON.stringify(json)
      : form
      ? new URLSearchParams(new FormData(form))
      : undefined
  })
}
