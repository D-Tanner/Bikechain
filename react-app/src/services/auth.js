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


export const signUp = async (username, email, password, city, state, level, profileImage) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("city", city);
  formData.append("state", state);
  formData.append("level", level);
  formData.append("profileImage", profileImage);

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: formData,
  });

  return await response.json();
}

export const editUser = async (userId, city, state, level, profileImage) => {
  const formData = new FormData();

  formData.append("city", city);
  formData.append("state", state);
  formData.append("level", level);
  formData.append("profileImage", profileImage);

  const response = await fetch(`/api/auth/edit-user/${userId}`, {
    method: "PUT",
    body: formData,
  });

  return await response.json();
}
