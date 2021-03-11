export const getMapToken = async () => {
  const response = await fetch('/api/auth/map-token', {
    headers: {
      'Content-Type': '*/*',
      'Accept': '*/*'
    }
  });
  const data = await response.json()
  return data;

}


export const authenticate = async () => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  return await response.json();
}

export const logout = async () => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json();
};


export const signUp = async (username, email, password, city, state, level) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      city,
      state,
      level,
      // profileImage,
    }),
  });
  return await response.json();
}
