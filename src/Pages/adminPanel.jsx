import React, { useState } from 'react';
import { Search, Users, Building2, MapPin, ToggleLeft, ToggleRight } from 'lucide-react';
import backgroundImage from '../assets/junta_de_trabajo.jpeg';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('companies');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado inicial para companies y authors
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Blue Team',
      website: 'www.blueteam.com',
      authors: 'blue',
      isActive: true
    },
    {
      id: 2,
      name: 'Red Team',
      website: 'www.redteam.com',
      authors: 'red',
      isActive: true
    },
    {
      id: 3,
      name: 'Orange Team',
      website: 'www.orangeteam.com',
      authors: 'orange',
      isActive: true
    },
    {
      id: 4,
      name: 'Purple Team',
      website: 'www.purpleteam.com',
      authors: 'purple',
      isActive: false
    }
  ]);

  const [authors, setAuthors] = useState([
    {
      id: 1,
      name: 'Lucas Ezequiel Silva',
      date: '16/02/1987',
      location: 'Caseros',
      avatar: '👨‍💻',
      isActive: true
    },
    {
      id: 2,
      name: 'Alejo Villafañe',
      date: '11/06/1981',
      location: 'CABA',
      avatar: '👨‍💼',
      isActive: true
    },
    {
      id: 3,
      name: 'Ignacio Borraz',
      date: '25/04/1990',
      location: 'Cordoba',
      avatar: '👨‍🚀',
      isActive: false
    },
    {
      id: 4,
      name: 'Eric Rodriguez',
      date: '04/01/1991',
      location: 'Corrientes',
      avatar: '😎',
      isActive: true
    }
  ]);

  const toggleStatus = (id) => {
    if (activeTab === 'companies') {
      setCompanies(companies.map(company => 
        company.id === id ? { ...company, isActive: !company.isActive } : company
      ));
    } else {
      setAuthors(authors.map(author => 
        author.id === id ? { ...author, isActive: !author.isActive } : author
      ));
    }
  };

  // Filtrar resultados según el término de búsqueda
  const filteredData = () => {
    if (activeTab === 'companies') {
      return companies.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return authors.filter(author => 
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  const getAuthorColor = (authors) => {
    switch (authors) {
      case 'blue':
        return 'bg-blue-500';
      case 'red':
        return 'bg-red-500';
      case 'orange':
        return 'bg-orange-500';
      case 'purple':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div 
        className="h-[60vh] bg-cover relative px-8"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center'
        }}
      >
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
                <button
                  onClick={() => {
                    setActiveTab('companies');
                    setSearchTerm('');
                  }}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'companies'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Companies
                </button>
                <button
                  onClick={() => {
                    setActiveTab('authors');
                    setSearchTerm('');
                  }}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'authors'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider bg-violet-400">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider bg-violet-400">
                        Website
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider bg-violet-400">
                        Authors
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider bg-violet-400">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider bg-violet-400">
                        Birth Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider bg-violet-400">
                        Location
                      </th>
                    </>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider bg-violet-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activeTab === 'companies' ? (
                  filteredData().map((company) => (
                    <tr key={company.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-sm text-gray-900">{company.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500">{company.website}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`h-2.5 w-2.5 rounded-full ${getAuthorColor(company.authors)} mr-2`}></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => toggleStatus(company.id)}
                          className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                        >
                          {company.isActive ? (
                            <ToggleRight className="h-6 w-6 text-green-500" />
                          ) : (
                            <ToggleLeft className="h-6 w-6" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredData().map((author) => (
                    <tr key={author.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{author.avatar}</span>
                          <span className="text-sm text-gray-900">{author.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500">{author.date}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{author.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => toggleStatus(author.id)}
                          className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                        >
                          {author.isActive ? (
                            <ToggleRight className="h-6 w-6 text-green-500" />
                          ) : (
                            <ToggleLeft className="h-6 w-6" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {filteredData().length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No {activeTab === 'companies' ? 'companies' : 'authors'} found matching your search
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;