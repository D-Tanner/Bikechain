export const getRides = async () => {
  const response = await fetch('/api/rides/', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

export const getRideById = async (rideId) => {
  const response = await fetch(`/api/rides/${rideId}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

export const createNewRide = async (userId, title, content, date, latitude, longitude, isLocal, level) => {
  const response = await fetch('/api/rides/new-ride', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      title,
      content,
      date,
      latitude,
      longitude,
      isLocal,
      level
    })
  })
  return await response.json();
}


export const unFollowRider = async (follower_id, followed_id) => {
  const response = await fetch(`/api/rides/unfollow/${follower_id}/${followed_id}`, {
    method: "DELETE",
  })
  return await response.json()
}

export const unCommitToRide = async (user_id, ride_id) => {
  const response = await fetch(`/api/rides/uncommit/${user_id}/${ride_id}`, {
    method: "GET",
  })
  return await response.json()
}
export const followRider = async (follower_id, followed_id) => {
  const response = await fetch(`/api/rides/follow/${follower_id}/${followed_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return await response.json()
}
export const commitToRide = async (user_id, ride_id) => {
  const response = await fetch(`/api/rides/commit/${user_id}/${ride_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return await response.json()
}


export const createPost = async (userId, rideId, content, images) => {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('rideId', rideId);
  formData.append('content', content);

  if (images) {
    const num = images.length;
    for (let i = 0; i < num; i++) {
      const fileList = images[i];
      const innerNum = fileList.length;
      for (let j = 0; j < innerNum; j++) {
        formData.append('images', fileList[j]);
      }
    }
  }

  const response = await fetch('/api/rides/new-post', {
    method: "POST",
    body: formData,
  });

  return await response.json();
};
