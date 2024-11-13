import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function OrderDataTable() {
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            setUserRole(decodedToken.role);
        }
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/getapplications`);
            setRows(response.data.map((application, index) => ({
                id: index + 1,
                _id: application._id,
                name: application.name,
                email: application.email,
                phone: application.phone,
                cvFile: application.cvUrl,
                status: application.status,
            })));
            setError(null);
        } catch (error) {
            console.error("Error fetching applications:", error);
            setError('Failed to fetch applications.');
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URI}/applications/${id}`, { status: newStatus });
            fetchApplications();
            setError(null);
        } catch (error) {
            console.error(`Error changing application status to ${newStatus}:`, error);
            setError(`Failed to change application status to ${newStatus}.`);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 120 },
        { field: 'cvFile', headerName: 'CV File', width: 150, renderCell: (params) => (
            <div>
                <a href={params.value} target="_blank" rel="noopener noreferrer">Link</a>
            </div>
        ) },
        {
            field: 'status', headerName: 'Status', width: 350, renderCell: (params) => (
                <div className="flex gap-2">
                    {params.value === 'pending' && (
                        <>
                            {userRole === 'approver' && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleStatusChange(params.row._id, 'review')}
                                    className="bg-blue-500 hover:bg-blue-600"
                                >
                                    Review
                                </Button>
                            )}
                            {userRole === 'reviewer' && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleStatusChange(params.row._id, 'review')}
                                    className="bg-blue-500 hover:bg-blue-600"
                                >
                                    Review
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => handleStatusChange(params.row._id, 'approved')}
                                className="bg-green-500 hover:bg-green-600"
                                disabled={userRole !== 'approver'}
                            >
                                Approve
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => handleStatusChange(params.row._id, 'rejected')}
                                className="bg-red-500 hover:bg-red-600"
                            >
                                Reject
                            </Button>
                        </>
                    )}
                    {params.value === 'review' && (
                        <>
                            {userRole === 'approver' && (
                                <>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        onClick={() => handleStatusChange(params.row._id, 'approved')}
                                        className="bg-green-500 hover:bg-green-600"
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleStatusChange(params.row._id, 'rejected')}
                                        className="bg-red-500 hover:bg-red-600"
                                    >
                                        Reject
                                    </Button>
                                </>
                            )}
                            {userRole === 'reviewer' && (
                                <span className="text-yellow-500 font-semibold">Under Review</span>
                            )}
                        </>
                    )}
                    {params.value === 'approved' && (
                        <span className="text-green-600 font-semibold">Approved</span>
                    )}
                    {params.value === 'rejected' && (
                        <span className="text-red-600 font-semibold">Rejected</span>
                    )}
                </div>
            )
        },
    ];

    return (
        <div className="h-[440px] w-full bg-white shadow-lg rounded-lg overflow-hidden">
            {error && <div className="text-red-500 font-bold mb-2">{error}</div>}
            <DataGrid
                rows={rows}
                columns={columns}
                // pageSize={10}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
                sx={{
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                        alignContent: 'center',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        fontWeight: 'bold',
                    },
                    '& .MuiDataGrid-row': {
                        '&:nth-of-type(odd)': {
                            backgroundColor: '#f9fafb',
                        },
                        '&:hover': {
                            backgroundColor: '#e5e7eb',
                        },
                    },
                }}
            />
        </div>
    );
}