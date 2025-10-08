import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  MessageSquare,
  Clock,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  LogOut,
  Shield,
  Edit3,
  Trash2,
  Plus,
  Package,
  Save,
  X
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const AdminDashboard: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'packages'>('analytics');

  // Package management state
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Basic Dignity',
      price: 'R8,500',
      description: 'Essential funeral services with dignity and respect',
      features: ['Basic casket', 'Transportation', 'Simple ceremony', 'Documentation'],
      category: 'essential'
    },
    {
      id: 2,
      name: 'Premium Memorial',
      price: 'R18,500',
      description: 'Comprehensive funeral services with enhanced memorial options',
      features: ['Premium casket', 'Transportation', 'Full ceremony', 'Memorial service', 'Reception', 'Documentation'],
      category: 'premium'
    },
    {
      id: 3,
      name: 'Complete Celebration',
      price: 'R35,000',
      description: 'Full celebration of life with all premium services',
      features: ['Luxury casket', 'Premium transportation', 'Full ceremony', 'Memorial service', 'Large reception', 'Photography', 'Complete documentation', 'Cultural considerations'],
      category: 'luxury'
    }
  ]);

  const [editingPackage, setEditingPackage] = useState<number | null>(null);
  const [newPackage, setNewPackage] = useState({
    name: '',
    price: '',
    description: '',
    features: [''],
    category: 'essential'
  });

  useEffect(() => {
    // Check authentication
    const authenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!authenticated) {
      navigate('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin');
  };

  // Package management functions
  const handleAddPackage = () => {
    if (newPackage.name && newPackage.price) {
      const packageToAdd = {
        ...newPackage,
        id: Date.now(),
        features: newPackage.features.filter(f => f.trim() !== '')
      };
      setPackages([...packages, packageToAdd]);
      setNewPackage({
        name: '',
        price: '',
        description: '',
        features: [''],
        category: 'essential'
      });
    }
  };

  const handleEditPackage = (id: number) => {
    const packageToEdit = packages.find(p => p.id === id);
    if (packageToEdit) {
      setEditingPackage(id);
      setNewPackage({
        ...packageToEdit,
        features: [...packageToEdit.features]
      });
    }
  };

  const handleSaveEdit = () => {
    if (editingPackage) {
      setPackages(packages.map(pkg =>
        pkg.id === editingPackage
          ? { ...newPackage, id: editingPackage, features: newPackage.features.filter(f => f.trim() !== '') }
          : pkg
      ));
      setEditingPackage(null);
      setNewPackage({
        name: '',
        price: '',
        description: '',
        features: [''],
        category: 'essential'
      });
    }
  };

  const handleDeletePackage = (id: number) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingPackage(null);
    setNewPackage({
      name: '',
      price: '',
      description: '',
      features: [''],
      category: 'essential'
    });
  };

  const addFeature = () => {
    setNewPackage(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setNewPackage(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index: number) => {
    setNewPackage(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // Mock analytics data
  const analyticsData = {
    totalCalls: 1247,
    monthlyBookings: [
      { month: 'Jan', bookings: 45 },
      { month: 'Feb', bookings: 52 },
      { month: 'Mar', bookings: 48 },
      { month: 'Apr', bookings: 61 },
      { month: 'May', bookings: 55 },
      { month: 'Jun', bookings: 67 }
    ],
    commonQueries: [
      { query: 'Funeral packages pricing', count: 234 },
      { query: 'Casket selection help', count: 189 },
      { query: 'Scheduling appointments', count: 156 },
      { query: 'Document requirements', count: 98 },
      { query: 'Cultural ceremonies', count: 87 }
    ],
    averageResponseTime: '2.3 minutes',
    responseTimeBreakdown: [
      { range: '< 1 min', percentage: 35 },
      { range: '1-3 min', percentage: 45 },
      { range: '3-5 min', percentage: 15 },
      { range: '> 5 min', percentage: 5 }
    ],
    recentActivity: [
      { time: '2 min ago', action: 'New booking request', type: 'booking' },
      { time: '5 min ago', action: 'AI query handled', type: 'ai' },
      { time: '12 min ago', action: 'Form submitted', type: 'form' },
      { time: '18 min ago', action: 'Memorial page created', type: 'memorial' }
    ]
  };

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      <header className={`border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200/60 bg-white/80 backdrop-blur-sm'}`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Shield className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <div>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  UbuntuGift Admin Dashboard
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Funeral Home Management System
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'analytics'
                  ? (isDark ? 'bg-green-600 text-white' : 'bg-green-500 text-white')
                  : (isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'packages'
                  ? (isDark ? 'bg-green-600 text-white' : 'bg-green-500 text-white')
                  : (isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
              }`}
            >
              <Package className="w-4 h-4 inline mr-2" />
              Package Management
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">

          {activeTab === 'analytics' ? (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`p-6 rounded-xl border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/60 backdrop-blur-sm border-gray-200/60'
                }`}>
                  <div className="flex items-center gap-3">
                    <Phone className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <div>
                      <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {analyticsData.totalCalls.toLocaleString()}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Calls Handled
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-xl border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/60 backdrop-blur-sm border-gray-200/60'
                }`}>
                  <div className="flex items-center gap-3">
                    <Calendar className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    <div>
                      <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {analyticsData.monthlyBookings[analyticsData.monthlyBookings.length - 1].bookings}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        This Month Bookings
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-xl border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/60 backdrop-blur-sm border-gray-200/60'
                }`}>
                  <div className="flex items-center gap-3">
                    <MessageSquare className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    <div>
                      <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {analyticsData.commonQueries[0].count}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Top Query Count
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-xl border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/60 backdrop-blur-sm border-gray-200/60'
                }`}>
                  <div className="flex items-center gap-3">
                    <Clock className={`w-8 h-8 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                    <div>
                      <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {analyticsData.averageResponseTime}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Avg Response Time
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts and Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Monthly Bookings Chart */}
                <div className={`p-6 rounded-xl border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/60 backdrop-blur-sm border-gray-200/60'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Monthly Bookings
                  </h3>
                  <div className="space-y-3">
                    {analyticsData.monthlyBookings.map((item, index) => (
                      <div key={item.month} className="flex items-center gap-3">
                        <span className={`text-sm font-medium w-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.month}
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(item.bookings / 70) * 100}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {item.bookings}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Response Time Breakdown */}
                <div className={`p-6 rounded-xl border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/60 backdrop-blur-sm border-gray-200/60'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Response Time Distribution
                  </h3>
                  <div className="space-y-4">
                    {analyticsData.responseTimeBreakdown.map((item, index) => (
                      <div key={item.range} className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.range}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                index === 0 ? 'bg-green-500' :
                                index === 1 ? 'bg-yellow-500' :
                                index === 2 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className={`text-sm font-medium w-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {item.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Queries */}
                <div className={`p-6 rounded-xl border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/60 backdrop-blur-sm border-gray-200/60'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Most Common Queries
                  </h3>
                  <div className="space-y-3">
                    {analyticsData.commonQueries.map((query, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                        isDark ? 'bg-gray-700/50 border border-gray-600/50' : 'bg-white/40 border border-gray-200/40'
                      }`}>
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {query.query}
                        </span>
                        <span className={`text-sm font-bold px-2 py-1 rounded ${
                          isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {query.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className={`p-6 rounded-xl border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/60 backdrop-blur-sm border-gray-200/60'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {analyticsData.recentActivity.map((activity, index) => (
                      <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                        isDark ? 'bg-gray-700/50 border border-gray-600/50' : 'bg-white/40 border border-gray-200/40'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'booking' ? 'bg-green-500' :
                          activity.type === 'ai' ? 'bg-blue-500' :
                          activity.type === 'form' ? 'bg-purple-500' : 'bg-orange-500'
                        }`} />
                        <div className="flex-1">
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {activity.action}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Package Management Section */
            <div className="space-y-6">
              <div className={`p-6 rounded-xl border ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/60 backdrop-blur-sm border-gray-200/60'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Package Management
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Create, edit, and manage your funeral service packages
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingPackage(editingPackage ? null : -1)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      editingPackage === -1
                        ? (isDark ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-red-500 text-white hover:bg-red-600')
                        : (isDark ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-green-500 text-white hover:bg-green-600')
                    }`}
                  >
                    {editingPackage === -1 ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {editingPackage === -1 ? 'Cancel' : 'Add Package'}
                  </button>
                </div>

                {/* Add/Edit Package Form */}
                {editingPackage !== null && (
                  <div className={`p-6 rounded-lg border mb-6 ${
                    isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-white/40 border-gray-300'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {editingPackage === -1 ? 'Add New Package' : 'Edit Package'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Package Name *
                        </label>
                        <input
                          type="text"
                          value={newPackage.name}
                          onChange={(e) => setNewPackage(prev => ({ ...prev, name: e.target.value }))}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder="e.g. Premium Memorial"
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Price *
                        </label>
                        <input
                          type="text"
                          value={newPackage.price}
                          onChange={(e) => setNewPackage(prev => ({ ...prev, price: e.target.value }))}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder="e.g. R18,500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Category
                      </label>
                      <select
                        value={newPackage.category}
                        onChange={(e) => setNewPackage(prev => ({ ...prev, category: e.target.value }))}
                        className={`px-3 py-2 rounded-lg border ${
                          isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="essential">Essential</option>
                        <option value="premium">Premium</option>
                        <option value="luxury">Luxury</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Description
                      </label>
                      <textarea
                        value={newPackage.description}
                        onChange={(e) => setNewPackage(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder="Describe what this package includes..."
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Features
                        </label>
                        <button
                          onClick={addFeature}
                          className={`text-xs px-2 py-1 rounded ${
                            isDark ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          + Add Feature
                        </button>
                      </div>
                      {newPackage.features.map((feature, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            className={`flex-1 px-3 py-2 rounded-lg border ${
                              isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder="e.g. Premium casket"
                          />
                          {newPackage.features.length > 1 && (
                            <button
                              onClick={() => removeFeature(index)}
                              className={`px-3 py-2 rounded-lg ${
                                isDark ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-red-500 text-white hover:bg-red-600'
                              }`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={editingPackage === -1 ? handleAddPackage : handleSaveEdit}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                          isDark ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        <Save className="w-4 h-4" />
                        {editingPackage === -1 ? 'Add Package' : 'Save Changes'}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          isDark ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Packages List */}
                <div className="grid gap-4">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className={`p-4 rounded-lg border ${
                      isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-white/40 border-gray-300'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {pkg.name}
                            </h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              pkg.category === 'essential' ? 'bg-blue-100 text-blue-800' :
                              pkg.category === 'premium' ? 'bg-purple-100 text-purple-800' :
                              'bg-gold-100 text-gold-800'
                            }`}>
                              {pkg.category}
                            </span>
                            <span className={`text-lg font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                              {pkg.price}
                            </span>
                          </div>
                          <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {pkg.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {pkg.features.map((feature, index) => (
                              <span
                                key={index}
                                className={`px-2 py-1 rounded text-xs ${
                                  isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditPackage(pkg.id)}
                            className={`p-2 rounded-lg ${
                              isDark ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePackage(pkg.id)}
                            className={`p-2 rounded-lg ${
                              isDark ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-red-500 text-white hover:bg-red-600'
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
