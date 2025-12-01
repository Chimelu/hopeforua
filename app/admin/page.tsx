'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  targetAmount: number;
  currentAmount: number;
  status: 'active' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

interface Donation {
  _id: string;
  projectId: string | null;
  name: string;
  email: string;
  phone: string;
  amount: number;
  paymentMethod: string;
  message: string;
  createdAt: string;
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [showDonations, setShowDonations] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    imageUrl: '',
    targetAmount: '',
    currentAmount: '',
    status: 'active' as 'active' | 'completed',
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
        toast.success('Image uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProject
        ? `/api/projects/${editingProject._id}`
        : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          targetAmount: Number(formData.targetAmount),
          currentAmount: Number(formData.currentAmount || 0),
        }),
      });

      if (response.ok) {
        await fetchProjects();
        resetForm();
        toast.success(editingProject ? 'Project updated successfully!' : 'Project created successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      imageUrl: project.imageUrl,
      targetAmount: project.targetAmount.toString(),
      currentAmount: project.currentAmount.toString(),
      status: project.status,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchProjects();
        toast.success('Project deleted successfully!');
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleViewDonations = async (project: Project) => {
    setSelectedProject(project);
    try {
      const response = await fetch(`/api/projects/${project._id}/donations`);
      const data = await response.json();
      setDonations(data.donations || []);
      setShowDonations(true);
    } catch (error) {
      console.error('Error fetching donations:', error);
      toast.error('Failed to fetch donations');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      imageUrl: '',
      targetAmount: '',
      currentAmount: '',
      status: 'active',
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (showDonations && selectedProject) {
    return (
      <div className="min-h-screen bg-blue-900 relative overflow-hidden py-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => {
              setShowDonations(false);
              setSelectedProject(null);
            }}
            className="mb-8 text-white hover:text-yellow-400 font-semibold inline-flex items-center text-lg bg-blue-800/60 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Donations for: {selectedProject.title}
          </h1>

          <div className="bg-blue-800/60 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-blue-700/50">
            {donations.length === 0 ? (
              <p className="text-blue-100 text-center py-8">No donations yet for this project.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-blue-700">
                      <th className="pb-4 text-white font-semibold">Name</th>
                      <th className="pb-4 text-white font-semibold">Email</th>
                      <th className="pb-4 text-white font-semibold">Phone</th>
                      <th className="pb-4 text-white font-semibold">Amount</th>
                      <th className="pb-4 text-white font-semibold">Payment Method</th>
                      <th className="pb-4 text-white font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation) => (
                      <tr key={donation._id} className="border-b border-blue-700/50">
                        <td className="py-4 text-blue-100">{donation.name}</td>
                        <td className="py-4 text-blue-100">{donation.email}</td>
                        <td className="py-4 text-blue-100">{donation.phone}</td>
                        <td className="py-4 text-yellow-400 font-semibold">{formatCurrency(donation.amount)}</td>
                        <td className="py-4 text-blue-100 capitalize">{donation.paymentMethod}</td>
                        <td className="py-4 text-blue-100">
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-6 pt-6 border-t border-blue-700">
                  <p className="text-white text-lg">
                    <span className="font-semibold">Total Donations:</span>{' '}
                    <span className="text-yellow-400">
                      {formatCurrency(donations.reduce((sum, d) => sum + d.amount, 0))}
                    </span>
                  </p>
                  <p className="text-blue-100 mt-2">
                    <span className="font-semibold">Total Donors:</span> {donations.length}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-blue-900 relative overflow-hidden py-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={resetForm}
            className="mb-8 text-white hover:text-yellow-400 font-semibold inline-flex items-center text-lg bg-blue-800/60 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>

          <div className="bg-blue-800/60 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-blue-700/50">
            <h1 className="text-3xl font-bold text-white mb-8">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-white/90 border-2 border-blue-600 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-white/90 border-2 border-blue-600 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-900"
                >
                  <option value="">Select a category</option>
                  <option value="Emergency Relief">Emergency Relief</option>
                  <option value="Medical Aid">Medical Aid</option>
                  <option value="Community Development">Community Development</option>
                  <option value="Education & Training">Education & Training</option>
                  <option value="Infrastructure Rebuild">Infrastructure Rebuild</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-white/90 border-2 border-blue-600 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Image URL *
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="Enter image URL or upload image"
                    className="w-full px-4 py-2 bg-white/90 border-2 border-blue-600 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-900"
                  />
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Or Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file);
                        }
                      }}
                      className="w-full px-4 py-2 bg-white/90 border-2 border-blue-600 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-900"
                      disabled={uploading}
                    />
                    {uploading && <p className="text-yellow-400 mt-2">Uploading...</p>}
                  </div>
                  {formData.imageUrl && (
                    <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden border-2 border-blue-600">
                      <Image
                        src={formData.imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Target Amount (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.targetAmount}
                    onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                    className="w-full px-4 py-2 bg-white/90 border-2 border-blue-600 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Current Amount (USD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.currentAmount}
                    onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                    className="w-full px-4 py-2 bg-white/90 border-2 border-blue-600 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'completed' })}
                  className="w-full px-4 py-2 bg-white/90 border-2 border-blue-600 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-900"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 rounded-lg font-bold text-lg transition-colors"
                >
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 bg-blue-700 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-900 relative overflow-hidden py-12">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Admin Dashboard
            </h1>
            <p className="text-blue-100 text-lg">
              Manage donation projects and view donor information
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg"
          >
            + Create Project
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const progress = calculateProgress(project.currentAmount, project.targetAmount);
            return (
              <div
                key={project._id}
                className="bg-blue-800/60 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-blue-700/50 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg ${
                        project.status === 'active'
                          ? 'bg-yellow-400 text-gray-900'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {project.status === 'active' ? 'Active' : 'Completed'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white text-sm font-medium mb-2 opacity-90">
                      {project.category}
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-blue-800/60 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-blue-100 mb-5 line-clamp-3 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mb-5">
                    <div className="flex justify-between text-xs font-semibold text-blue-100 mb-2">
                      <span>Raised: {formatCurrency(project.currentAmount)}</span>
                      <span>Goal: {formatCurrency(project.targetAmount)}</span>
                    </div>
                    <div className="w-full bg-blue-900/50 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          project.status === 'completed'
                            ? 'bg-green-500'
                            : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs font-medium text-blue-200 mt-2">
                      {progress.toFixed(0)}% funded
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDonations(project)}
                      className="flex-1 bg-blue-700 hover:bg-blue-600 text-white text-center py-2 rounded-lg font-semibold text-sm transition-all"
                    >
                      View Donors
                    </button>
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-center py-2 rounded-lg font-semibold text-sm transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="px-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-blue-100 text-xl mb-4">No projects yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold text-lg transition-colors"
            >
              Create Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

