import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const [formUploaded, setFormUploaded] = useState(false);
  const [formDetails, setFormDetails] = useState([]);
  const [userRole, setUserRole] = useState('');

  // const resetForm = () => {
  //   setFormUploaded(false);
  //   setFormDetails([]);
  //   localStorage.removeItem('jobApplication');
  // };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUserRole(decodedToken.role);
    }
  }, []);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          const decodedToken = jwtDecode(storedToken);
          const userId = decodedToken.email;

          const response = await axios.get(`${import.meta.env.VITE_API_URI}/getUserApplications/${userId}`);
          setFormUploaded(true);
          setFormDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching application:", error);
      }
    };

    fetchApplication();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[89vh] bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Job Application Dashboard</h1>
        <p className="text-lg text-center text-gray-600 mb-6">Manage your job applications and track their status.</p>

        {!formUploaded && (
          <Link
            to={'/job-application-form'}
            className="block w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-200 text-center"
          >
            Upload Job Application Form
          </Link>
        )}

        {formUploaded && (
          <div className="mt-6">
            <h2 className="text-lg font-medium text-blue-800 mb-2">Application Status</h2>
            {formDetails.length > 0 ? (
              <div>
                {formDetails.map((application, index) => (
                  <div key={index} className="mt-2 border rounded-md p-3">
                    <p className="text-gray-700"><strong>Name:</strong> {application.name}</p>
                    <p className="text-gray-700"><strong>Email:</strong> {application.email}</p>
                    <p className="text-gray-700"><strong>Phone:</strong> {application.phone}</p>
                    <p className="text-gray-700">
                      <strong>Uploaded File:</strong>{' '}
                      <a href={application.cvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Link
                      </a>
                    </p>
                    <p className="text-gray-700 mt-2">
                      <strong>Status:</strong>{' '}
                      <span
                        className={`font-semibold px-2 py-1 rounded-md ${application.status === 'review'
                          ? 'bg-yellow-200 text-yellow-700'
                          : application.status === 'approved'
                            ? 'bg-green-200 text-green-700'
                            : application.status === 'rejected'
                              ? 'bg-red-200 text-red-700'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                      >
                        {application.status}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600">No applications found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;