export const getRides = async () => {
  const response = await fetch('/api/rides/', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

export const createNewRide = async (userId, title, content, startTime, endTime, latitude, longitude, isLocal, level) => {
  const response = await fetch('/api/rides/new-ride', {
    methods: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      title,
      content,
      startTime,
      endTime,
      latitude,
      longitude,
      isLocal,
      level
    })
  })
  return await response.json();
}
