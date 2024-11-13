import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JobApplicationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cvFile: '',
    });
    const [fileName, setFileName] = useState('No file chosen');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('token');
        if (userData) {
            const decodedToken = jwtDecode(userData);
            console.log("Decoded user data:", decodedToken);
            setFormData(prevState => ({
                ...prevState,
                name: decodedToken.name || '',
                email: decodedToken.email || '',
            }));
        }
    }, []);

    const uploadOnCloudinary = async () => {
        const data = new FormData();
        data.append('file', formData.cvFile);
        data.append('upload_preset', `${import.meta.env.VITE_UPLOAD_PRESENT}`);
        data.append('resource_type', 'raw'); // Specify resource type for PDFs

        try {
            const response = await axios.post(`${import.meta.env.VITE_CLOUDINARY_URI}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("uploadOnCloudinary: ", response);
            return response.data.secure_url;
        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            setError('Failed to upload CV file. Please try again.');
            return null;
        }
    }

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            setFormData(prevState => ({
                ...prevState,
                cvFile: selectedFile
            }));
        } else {
            setFileName('No file chosen');
            setFormData(prevState => ({
                ...prevState,
                cvFile: null
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.cvFile) {
            console.error("No CV file selected.");
            setError("Please upload a CV file.");
            return;
        }
    
        const cvUrl = await uploadOnCloudinary(); 

        console.log("cvUrl: ", cvUrl)
        if (!cvUrl) {
            return;
        }
    
        const applicationData = new FormData();
    
        applicationData.append('name', formData.name);
        applicationData.append('email', formData.email);
        applicationData.append('phone', formData.phone);
        applicationData.append('cvUrl', cvUrl); 
    
        console.log("applicationData:", applicationData);
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/applications`, applicationData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Response from server:", response);
            setSubmitted(true);
            navigate('/');
        } catch (error) {
            console.error("Error submitting application:", error.response ? error.response.data : error.message);
            setError('Failed to submit application. Please try again.');
        }
    };

    return (
        <section className="flex items-center justify-center h-[88vh]">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Job Application</h2>

                {submitted && (
                    <div className="mb-4 text-green-600">
                        Your application has been submitted successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mb-4 block w-full p-2 border border-gray-300 rounded-lg"
                    />

                    <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mb-4 block w-full p-2 border border-gray-300 rounded-lg"
                    />

                    <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mb-4 block w-full p-2 border border-gray-300 rounded-lg"
                    />

                    <label className="block mb-2 text-sm font-medium text-gray-700">Upload PDF file</label>
                    <div className="relative mb-4">
                        <input
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            id="cvFile"
                            name="cvFile"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            required
                        />
                        <div className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg py-2 px-3 bg-gray-50 transition duration-150 ease-in-out">
                            {fileName}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    >
                        Submit Application
                    </button>
                </form>
                
                {error && (
                    <div className="mt-4 text-red-600">{error}</div>
                )}
                
            </div>
        </section>
    );
};

export default JobApplicationForm;