const API_BASE_URL = 'http://localhost:5033';

export const fetchResources = async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/resources`);
    if (!response.ok) {
        throw new Error('Failed to fetch resources');
    }
    return response.json();
};

export const fetchResourceById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/resource/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch resource');
    }
    return response.json();
};

export const createResource = async (resourceData) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/resource`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resourceData),
    });
    if (!response.ok) {
        throw new Error('Failed to create resource');
    }
    return response.json();
};

export const updateResource = async (id, resourceData) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/resource/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resourceData),
    });
    if (!response.ok) {
        throw new Error('Failed to update resource');
    }
};

export const deleteResource = async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/resource/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete resource');
    }
};

export const loginUser = async (loginData) => {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }
    return response.json();
};

export const registerUser = async (registerData) => {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
    });
    if (!response.ok) {
        throw new Error('Registration failed');
    }
    return response.json();
};
export const getUserInfo = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/api/user/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user info');
    }
    return response.json();
};

export const updateUserInfo = async (userId, userData) => {
    const response = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to update user info');
    }
    return response.json();
};

export const requestResource = async (requestDto) => {
    const response = await fetch(`${API_BASE_URL}/api/inventory/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestDto),
    });
    if (!response.ok) {
        throw new Error('Failed to request resource');
    }
    return response.json();
};

export const returnResource = async (userResourceId) => {
    const response = await fetch(`${API_BASE_URL}/api/inventory/return/${userResourceId}`, {
        method: 'PUT',
    });
    if (!response.ok) {
        throw new Error('Failed to return resource');
    }
    return response.json();
};

export const deleteUserResource = async (userResourceId) => {
    const response = await fetch(`${API_BASE_URL}/api/inventory/${userResourceId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete resource');
    }
    return response.json();
};
