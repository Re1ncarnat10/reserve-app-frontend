'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {fetchResources, fetchUsers, updateUser, deleteUser, createResource, updateResource, fetchRequests, deleteResource, checkAdminStatus, approveUserRequest, rejectUserRequest, fetchExpiredResources, adminReturnResource
} from '@/components/api';
import UserCard from '@/components/UserCard';
import AdminResourceCard from '@/components/AdminResourceCard';
import RequestCard from '@/components/RequestCard';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';

const AdminManagePage = () => {
    const [resources, setResources] = useState([]);
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [expiredResources, setExpiredResources] = useState([]);
    const [setError] = useState(null);
    const [alert, setAlert] = useState(null);
    const [alertType, setAlertType] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [resourceToDelete, setResourceToDelete] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const adminStatus = await checkAdminStatus();
                setIsAdmin(adminStatus);
                if (!adminStatus) {
                    navigate.push('/');
                }
            } catch (error) {
                console.error('Error checking admin status:', error);
                navigate.push('/');
            }
        })();
    }, [navigate]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const [resourcesData, usersData, requestsData, expiredData] = await Promise.all([
                    fetchResources(),
                    fetchUsers(),
                    fetchRequests(),
                    fetchExpiredResources()
                ]);
                setResources(resourcesData);
                setUsers(usersData);
                setRequests(requestsData);
                setExpiredResources(expiredData);
            } catch (error) {
                setError('Failed to fetch data');
            }
        };

        fetchDataAsync()
            .then(() => {
                console.log('Data fetched successfully');
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [setError]);

    const handleCreateResource = async (resourceData) => {
        try {
            const newResourceData = await createResource(resourceData);
            setResources(prevResources => [...prevResources, newResourceData]);
            setAlert('Resource successfully created!');
            setAlertType('success');
        } catch (error) {
            setAlert('Error creating resource: ' + error.message);
            setAlertType('error');
        }
    };

    const handleUpdateResource = useCallback(async (resourceId, resourceData) => {
        try {
            const updatedResource = await updateResource(resourceId, resourceData);
            setResources(prevResources => prevResources.map(resource =>
                resource.resourceId === resourceId ? updatedResource : resource
            ));
            setAlert('Resource successfully updated!');
            setAlertType('success');
        } catch (error) {
            setAlert('Error updating resource: ' + error.message);
            setAlertType('error');
        }
    }, []);

    const handleDeleteResource = useCallback(async (resourceId) => {
        try {
            await deleteResource(resourceId);
            setResources(prevResources => prevResources.filter(resource => resource.resourceId !== resourceId));
        } catch (error) {
            setError('Failed to delete resource');
        }
    }, [setError]);

    const handleDeleteUser = useCallback(async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
            setError('Failed to delete user');
        }
    }, [setError]);

    const handleApproveRequest = useCallback(async (requestId, request) => {
        try {
            await approveUserRequest(request.userId, request.resourceId);
            setRequests(prevRequests => prevRequests.filter(r => r.userResourceId !== requestId));
            setAlert('Request approved successfully');
            setAlertType('success');
        } catch (error) {
            setAlert('Failed to approve request: ' + error.message);
            setAlertType('error');
        }
    }, []);

    const handleRejectRequest = useCallback(async (requestId, request) => {
        try {
            await rejectUserRequest(request.userId, request.resourceId);
            setRequests(prevRequests => prevRequests.filter(r => r.userResourceId !== requestId));
            setAlert('Request rejected successfully');
            setAlertType('success');
        } catch (error) {
            setAlert('Failed to reject request: ' + error.message);
            setAlertType('error');
        }
    }, []);

    const handleReturnResource = useCallback(async (userResourceId) => {
        try {
            await adminReturnResource(userResourceId);
            setExpiredResources(prevExpired => prevExpired.filter(
                item => item.userResourceId !== userResourceId
            ));
            setAlert('Resource returned successfully');
            setAlertType('success');
        } catch (error) {
            setAlert('Failed to return resource: ' + error.message);
            setAlertType('error');
        }
    }, []);

    const openDeleteModal = (resourceId) => {
        setResourceToDelete(resourceId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setResourceToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const confirmDeleteResource = async () => {
        if (resourceToDelete) {
            await handleDeleteResource(resourceToDelete);
            closeDeleteModal();
        }
    };

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#8D6E63' }}>
            <h1 className="text-3xl font-bold mb-4 pt-4 text-center">Admin Management</h1>
            {alert && (
                <div className={`alert alert-${alertType}`}>
                    {alert}
                </div>
            )}
            <details className="mb-8">
                <summary className="text-center mb-4 bg-gray-200 text-black px-4 py-2 rounded cursor-pointer">Resources</summary>
                <div className="p-4 border rounded-lg">
                    <AdminResourceCard
                        resources={resources}
                        onCreate={handleCreateResource}
                        onEdit={handleUpdateResource}
                        onDelete={openDeleteModal}
                    />
                </div>
            </details>
            <details className="mb-8">
                <summary className="text-center mb-4 bg-gray-200 text-black px-4 py-2 rounded cursor-pointer">Users</summary>
                <div className="p-4 border rounded-lg">
                    {users.map(user => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onDelete={handleDeleteUser}
                        />
                    ))}
                </div>
            </details>
            <details className="mb-8">
                <summary className="text-center mb-4 bg-gray-200 text-black px-4 py-2 rounded cursor-pointer">Requests</summary>
                <div className="p-4 border rounded-lg">
                    {requests
                        .filter(request => request.status.toLowerCase() !== 'approved')
                        .map(request => (
                            <RequestCard
                                key={request.userResourceId}
                                request={request}
                                onApprove={handleApproveRequest}
                                onDelete={handleRejectRequest}
                            />
                        ))}
                </div>
            </details>
            <details className="mb-8">
                <summary className="text-center mb-4 bg-gray-200 text-black px-4 py-2 rounded cursor-pointer">Expired Resources</summary>
                <div className="p-4 border rounded-lg">
                    {expiredResources.map(item => (
                        <div key={item.userResourceId} className="flex items-center p-4 mb-4 border rounded-lg shadow-md w-full min-h-[180px]" style={{ backgroundColor: '#BCAAA4' }}>
                            <div className="w-48 flex justify-center">
                                <img
                                    src={item.resourceImage}
                                    alt={item.resourceName}
                                    className="w-40 h-40 object-cover rounded-lg"
                                />
                            </div>
                            <div className="flex-1 grid grid-cols-5 gap-4 items-center text-center">
                                <div className="p-4 rounded-lg" style={{ backgroundColor: '#D7CCC8' }}>
                                    <p className="text-sm text-gray-600">User</p>
                                    <p className="font-semibold text-black">{item.userName}</p>
                                </div>
                                <div className="p-4 rounded-lg" style={{ backgroundColor: '#D7CCC8' }}>
                                    <p className="text-sm text-gray-600">Resource</p>
                                    <p className="font-semibold text-black">{item.resourceName}</p>
                                </div>
                                <div className="p-4 rounded-lg" style={{ backgroundColor: '#D7CCC8' }}>
                                    <p className="text-sm text-gray-600">Rental Start</p>
                                    <p className="font-semibold text-black">{new Date(item.rentalStartTime).toLocaleDateString()}</p>
                                </div>
                                <div className="p-4 rounded-lg col-span-2" style={{ backgroundColor: '#ffcccc' }}>
                                    <p className="text-sm text-gray-600">Expired Since</p>
                                    <p className="font-semibold text-black">{new Date(item.rentalEndTime).toLocaleDateString()}</p>
                                    <p className="text-sm text-red-600 mt-1">{Math.floor((new Date() - new Date(item.rentalEndTime)) / (1000 * 60 * 60 * 24))} days overdue</p>
                                </div>
                            </div>
                            <div className="flex space-x-4 ml-8">
                                <button
                                    onClick={() => handleReturnResource(item.userResourceId)}
                                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow hover:bg-yellow-600 text-lg"
                                >
                                    Return
                                </button>
                            </div>
                        </div>
                    ))}
                    {expiredResources.length === 0 && (
                        <p className="text-center py-4">No expired resources found</p>
                    )}
                </div>
            </details>
            {isDeleteModalOpen && (
                <DeleteConfirmationModal
                    onConfirm={confirmDeleteResource}
                    onCancel={closeDeleteModal}
                />
            )}
        </div>
    );
};

export default AdminManagePage;