const API_BASE_URL = 'http://localhost:5033';

export const checkAdminStatus = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_BASE_URL}/api/Admin/initialize-admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.warn('User is not authorized as admin');
                return false;
            }
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

export const fetchUserResources = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User is not logged in');
    }

    const response = await fetch(`${API_BASE_URL}/api/userresource/inventory`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const approveUserRequest = async (userId, resourceId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/Admin/request/approve/${userId}/${resourceId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Error approving request');
    }
};

export const rejectUserRequest = async (userId, resourceId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/Admin/request/reject/${userId}/${resourceId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Error rejecting request');
    }
};

export const fetchResources = async () => {
    const response = await fetch(`${API_BASE_URL}/api/Resource/resources`);
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
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/Admin/resource/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(resourceData),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json") && response.headers.get("content-length") !== "0") {
        return response.json();
    } else {
        return resourceData;
    }
};

export const deleteResource = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/Admin/resource/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
};

export const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/Admin/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
};

export const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/Admin/user/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
};

export const fetchRequests = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User is not logged in');
    }

    const response = await fetch(`${API_BASE_URL}/api/Admin/requests`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const requests = await response.json();

    const [users, resources] = await Promise.all([fetchUsers(), fetchResources()]);

    return requests.map(request => {
        const user = users.find(u => u.id === request.userId);
        const resource = resources.find(r => r.resourceId === request.resourceId);
        return {
            ...request,
            userName: `${user.name} ${user.surname}`,
            resourceImage: resource.image,
            rentalStartDate: request.rentalStartTime,
            rentalEndDate: request.rentalEndTime,
        };
    });
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

export const getCurrentUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User is not logged in');
    }

    const response = await fetch(`${API_BASE_URL}/api/User/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

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
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User is not logged in');
    }

    const response = await fetch(`${API_BASE_URL}/api/userresource/return/${userResourceId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};


export const fetchExpiredResources = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User is not logged in');
    }

    const response = await fetch(`${API_BASE_URL}/api/Admin/expired-resources`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const expiredResources = await response.json();

    const [users, resources] = await Promise.all([fetchUsers(), fetchResources()]);

    return expiredResources.map(resource => {
        const user = users.find(u => u.id === resource.userId);
        const resourceDetails = resources.find(r => r.resourceId === resource.resourceId);
        return {
            ...resource,
            userName: user ? `${user.name} ${user.surname}` : 'Unknown User',
            resourceName: resourceDetails ? resourceDetails.name : 'Unknown Resource',
            resourceImage: resourceDetails ? resourceDetails.image : '',
        };
    });
};

export const adminReturnResource = async (userResourceId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/Admin/return-resource/${userResourceId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};