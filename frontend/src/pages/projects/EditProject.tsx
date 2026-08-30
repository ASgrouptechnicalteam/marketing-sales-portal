import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import { ProjectForm } from '../../components/projects/ProjectForm';

const EditProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [initialData, setInitialData] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // IDOR protection
  if (user?.role !== 'MD' && user?.role !== 'CHANNEL_PARTNER_MANAGER') {
    return <div className="p-8 text-center text-red-500">Access Denied</div>;
  }

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setInitialData(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch project details');
      } finally {
        setFetching(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError('');

    try {
      await api.patch(`/projects/${id}`, data);
      navigate(`/projects/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update project');
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/projects/${id}`);
  };

  if (fetching) {
    return (
      <div className="flex justify-center p-12">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-navy border-t-brand-gold"></div>
      </div>
    );
  }

  if (error && !initialData) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <button
          onClick={handleCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-primary-navy">Edit Project</h1>
          <p className="text-sm text-gray-500">Update project details and settings</p>
        </div>
      </div>

      <ProjectForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        error={error}
        isEdit={true}
      />
    </div>
  );
};

export default EditProject;
