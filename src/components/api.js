const API_BASE_URL = 'http://localhost:5033';

export const checkAdminStatus = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/initialize-admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status !== 403) {
                throw new Error('Error checking admin status');
            }
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error checking admin status', error);
        return false;
    }
};

export const fetchResources = async () => {
    const response = await fetch(`${API_BASE_URL}/api/resource/resources`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const fetchResourceById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/resource/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const createResource = async (resourceData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/api/Admin/resource`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(resourceData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error creating resource');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating resource', error);
        throw error;
    }
};

export const updateResource = async (id, resourceData) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/resource/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resourceData),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
};

export const deleteResource = async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/Admin/resource/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
};

export const fetchUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/users`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const updateUser = async (userId, userData) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const deleteUser = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/user/${userId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
};

export const fetchRequests = async () => {
    const response = await fetch(`${API_BASE_URL}/api/Admin/requests`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const decideRequest = async (requestId) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/request/${requestId}/accept`, {
        method: 'PUT',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
};

export const loginUser = async (loginData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error logging in');
            } else {
                throw new Error(await response.text());
            }
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        console.error('Error logging in', error);
        throw error;
    }
};

export const registerUser = async (registerData) => {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const getUserInfo = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/api/user/${userId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};


export const requestResource = async (requestDto) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_BASE_URL}/api/UserResource/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestDto)
        });

        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                const errorData = await response.json();
                if (errorData.message.includes('validation error')) {
                    throw new Error('Validation error occurred');
                } else {
                    throw new Error(errorData.message || 'Error requesting resource');
                }
            } else {
                throw new Error(await response.text());
            }
        }

        const responseText = await response.text();
        return responseText.includes("Resource requested") ? { message: "Resource requested" } : JSON.parse(responseText);
    } catch (error) {
        console.error('Error requesting resource', error);
        throw error;
    }
};

export const returnResource = async (userResourceId) => {
    const response = await fetch(`${API_BASE_URL}/api/userresource/return/${userResourceId}`, {
        method: 'PUT',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const deleteUserResource = async (userResourceId) => {
    const response = await fetch(`${API_BASE_URL}/api/userresource/${userResourceId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};