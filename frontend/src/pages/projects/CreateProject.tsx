import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import { ProjectForm } from '../../components/projects/ProjectForm';

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // IDOR protection
  if (user?.role !== 'MD' && user?.role !== 'CHANNEL_PARTNER_MANAGER') {
    return <div className="p-8 text-center text-red-500">Access Denied</div>;
  }

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/projects', data);
      navigate(`/projects/${res.data.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create project');
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/projects')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-primary-navy">Create Project</h1>
          <p className="text-sm text-gray-500">Premium Multi-Section Project Registration</p>
        </div>
      </div>

      <ProjectForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default CreateProject;
