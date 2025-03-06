// src/app/admin/manage/page.js
'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { fetchResources, fetchUsers, updateUser, deleteUser, createResource, updateResource, fetchRequests, decideRequest, deleteResource } from '@/components/api';
import UserCard from '@/components/UserCard';
import AdminResourceCard from '@/components/AdminResourceCard';
import RequestForm from '@/components/RequestForm';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';

const AdminManagePage = () => {
    const [resources, setResources] = useState([]);
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [setError] = useState(null);
    const [alert, setAlert] = useState(null);
    const [alertType, setAlertType] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [resourceToDelete, setResourceToDelete] = useState(null);
    const [newResource, setNewResource] = useState({
        name: '',
        description: '',
        type: '',
        image: ''
    });

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const [resourcesData, usersData, requestsData] = await Promise.all([
                    fetchResources(),
                    fetchUsers(),
                    fetchRequests()
                ]);
                setResources(resourcesData);
                setUsers(usersData);
                setRequests(requestsData);
            } catch (error) {
                setError('Failed to fetch data');
            }
        };

        fetchDataAsync();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewResource(prevResource => ({ ...prevResource, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resourceData = {
            ...newResource,
            availability: true,
        };

        try {
            const newResourceData = await createResource(resourceData);
            setResources(prevResources => [...prevResources, newResourceData]);
            setAlert('Resource successfully created!');
            setAlertType('success');
            setIsAddModalOpen(false);
        } catch (error) {
            setAlert('Error creating resource: ' + error.message);
            setAlertType('error');
        }
    };

    const handleUpdateResource = useCallback(async (resourceId, resourceData) => {
        try {
            const updatedResource = await updateResource(resourceId, resourceData);
            setResources(prevResources => prevResources.map(resource => resource.resourceId === resourceId ? updatedResource : resource));
        } catch (error) {
            setError('Failed to update resource');
        }
    }, []);

    const handleDeleteResource = useCallback(async (resourceId) => {
        try {
            await deleteResource(resourceId);
            setResources(prevResources => prevResources.filter(resource => resource.resourceId !== resourceId));
        } catch (error) {
            setError('Failed to delete resource');
        }
    }, []);

    const handleUpdateUser = useCallback(async (userId, userData) => {
        try {
            const updatedUser = await updateUser(userId, userData);
            setUsers(prevUsers => prevUsers.map(user => user.id === userId ? updatedUser : user));
        } catch (error) {
            setError('Failed to update user');
        }
    }, []);

    const handleDeleteUser = useCallback(async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
            setError('Failed to delete user');
        }
    }, []);

    const handleApproveRequest = useCallback(async (requestId) => {
        try {
            await decideRequest(requestId);
            setRequests(prevRequests => prevRequests.filter(request => request.userResourceId !== requestId));
        } catch (error) {
            setError('Failed to approve request');
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

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <h1 className="text-3xl font-bold mb-4">Admin Management</h1>
            {alert && (
                <div className={`alert alert-${alertType}`}>
                    {alert}
                </div>
            )}
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
                Add Resource
            </button>
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Create Resource</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newResource.name}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    value={newResource.description}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Type
                                </label>
                                <input
                                    type="text"
                                    name="type"
                                    value={newResource.type}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    value={newResource.image}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Resources</h2>
                {resources.map(resource => (
                    <AdminResourceCard
                        key={resource.resourceId}
                        resource={resource}
                        onEdit={handleUpdateResource}
                        onDelete={openDeleteModal}
                    />
                ))}
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Users</h2>
                {users.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onEdit={handleUpdateUser}
                        onDelete={handleDeleteUser}
                    />
                ))}
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Requests</h2>
                {requests.map(request => (
                    <RequestForm
                        key={request.userResourceId}
                        request={request}
                        onApprove={handleApproveRequest}
                    />
                ))}
            </div>
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