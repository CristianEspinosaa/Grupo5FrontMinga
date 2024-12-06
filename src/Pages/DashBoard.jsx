import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Search, Users, Building2, MapPin, ToggleLeft, ToggleRight } from 'lucide-react';
import backgroundImage from '../assets/junta_de_trabajo.jpeg';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('companies');
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filterBySearchTerm = (data) => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredCompanies = useMemo(() => filterBySearchTerm(companies), [companies, searchTerm]);
  const filteredAuthors = useMemo(() => filterBySearchTerm(authors), [authors, searchTerm]);

  const fetchDataForTab = async (tab) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const endpoint = tab === 'companies' ? '/api/dashboard/companies' : '/api/dashboard/authors';
      const { data } = await axios.get(`http://localhost:8080${endpoint}`, config);
      tab === 'companies' ? setCompanies(data.response.companies) : setAuthors(data.response.authors);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataForTab(activeTab);
  }, [activeTab]);

  const toggleStatus = async (id, type) => {
    const newStatus = type === 'companies' ? companies : authors;
    const updatedData = newStatus.map((item) =>
      item._id === id ? { ...item, active: !item.active } : item
    );
    type === 'companies' ? setCompanies(updatedData) : setAuthors(updatedData);

    const data = {
      id,
      active: !newStatus.find(item => item._id === id).active,
    };

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = type === 'companies'
        ? 'http://localhost:8080/api/dashboard/companies/toggle'
        : 'http://localhost:8080/api/dashboard/authors/toggle';

      await axios.put(url, data, config);
    } catch (err) {
      setError('Failed to update status. Please try again later.');
    }
  };

  const authorColors = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
  };

  const getAuthorColor = (color) => authorColors[color] || 'bg-gray-500';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const TableRow = ({ item, type }) => (
    <tr key={item._id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {type === 'companies' ? <Building2 className="h-5 w-5 text-gray-400 mr-3" /> : <Users className="h-5 w-5 text-gray-400 mr-3" />}
          <span className="text-sm text-gray-900">{item.name}</span>
        </div>
      </td>
      {type === 'companies' ? (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-500">{item.website}</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <img src={item.photo || '/default-avatar.png'} alt={item.name} className="w-10 h-10 rounded-full mr-3" />
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-500">{formatDate(item.date)}</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-900">{item.city}</span>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <img src={item.photo || '/default-avatar.png'} alt={item.name} className="w-10 h-10 rounded-full mr-3" />
            </div>
          </td>
        </>
      )}
      <td className="px-6 py-4 whitespace-nowrap">
        <button onClick={() => toggleStatus(item._id, type)} className="text-gray-400 hover:text-gray-500 transition-colors duration-200">
          {item.active ? <ToggleRight className="h-6 w-6 text-green-500" /> : <ToggleLeft className="h-6 w-6" />}
        </button>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="h-[60vh] bg-cover relative px-8" style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Panel</h1>
        </div>
      </div>

      {/* Panel Container */}
      <div className="mx-auto px-8 -mt-10 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6">
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <div className="border-b border-gray-200 w-full">
              <nav className="-mb-px flex space-x-8">
                <button onClick={() => { setActiveTab('companies'); setSearchTerm(''); }} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'companies' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  Companies
                </button>
                <button onClick={() => { setActiveTab('authors'); setSearchTerm(''); }} className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'authors' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  Authors
                </button>
              </nav>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'companies' ? 'companies' : 'authors'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {activeTab === 'companies' ? (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-indigo-600">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-indigo-600">Website</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-indigo-600">Authors</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-indigo-600">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-indigo-600">Birthdate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-indigo-600">City</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-indigo-600">Avatar</th>
                    </>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-indigo-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === 'companies' ? filteredCompanies : filteredAuthors).map((item) => (
                  <TableRow key={item._id} item={item} type={activeTab} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;