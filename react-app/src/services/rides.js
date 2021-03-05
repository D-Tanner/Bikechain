export const getRides = async () => {
  const response = await fetch('/api/rides/', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}
