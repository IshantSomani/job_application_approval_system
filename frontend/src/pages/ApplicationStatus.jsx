import { useEffect, useState } from 'react';

const ApplicationStatus = () => {
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const simulatedResponse = "Your application is under review.";
      setApplicationStatus(simulatedResponse);
      setLoading(false);
    };

    fetchApplicationStatus();
  }, []);

  return (
    <section className="flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Application Status</h2>

        {loading ? (
          <p className="text-gray-600">Loading your application status...</p>
        ) : (
          <div className={`p-4 rounded-lg ${applicationStatus.includes('under review') ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
            <p>{applicationStatus}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicationStatus;