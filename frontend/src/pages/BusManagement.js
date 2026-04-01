import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const BusManagement = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  
  const navigate = useNavigate();

  // Generate mock bus data
  useEffect(() => {
    setTimeout(() => {
      const mockBuses = [
        {
          id: 1,
          busNumber: 'BUS-1001',
          operator: 'Express Lines',
          type: 'Luxury',
          capacity: 45,
          route: 'New York → Los Angeles',
          departureTime: '08:00',
          arrivalTime: '16:00',
          status: 'active',
          amenities: ['WiFi', 'AC', 'Charging Ports', 'Restroom'],
          driver: 'Michael Johnson',
          contact: '+1 (555) 123-4567',
          lastMaintenance: '2024-02-15',
          nextMaintenance: '2024-05-15'
        },
        {
          id: 2,
          busNumber: 'BUS-2003',
          operator: 'Swift Transit',
          type: 'Standard',
          capacity: 40,
          route: 'Chicago → Houston',
          departureTime: '14:30',
          arrivalTime: '22:30',
          status: 'active',
          amenities: ['WiFi', 'AC'],
          driver: 'Sarah Williams',
          contact: '+1 (555) 234-5678',
          lastMaintenance: '2024-01-20',
          nextMaintenance: '2024-04-20'
        },
        {
          id: 3,
          busNumber: 'BUS-3007',
          operator: 'Comfort Coaches',
          type: 'Premium',
          capacity: 50,
          route: 'Boston → Washington DC',
          departureTime: '09:15',
          arrivalTime: '13:45',
          status: 'maintenance',
          amenities: ['WiFi', 'AC', 'Charging Ports', 'Entertainment'],
          driver: 'Robert Brown',
          contact: '+1 (555) 345-6789',
          lastMaintenance: '2024-03-01',
          nextMaintenance: '2024-06-01'
        }
      ];
      setBuses(mockBuses);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBuses = buses.filter(bus => {
    const matchesSearch = bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.route.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || bus.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleAddBus = () => {
    setEditingBus(null);
    setShowAddModal(true);
  };

  const handleEditBus = (bus) => {
    setEditingBus(bus);
    setShowAddModal(true);
  };

  const handleDeleteBus = (busId) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      setBuses(buses.filter(bus => bus.id !== busId));
    }
  };

  const handleViewDetails = (bus) => {
    navigate(`/manager/bus/${bus.id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading buses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/manager/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Bus Management</h1>
            </div>
            <button
              onClick={handleAddBus}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Bus
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search buses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FunnelIcon className="h-5 w-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Buses Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bus Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Driver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBuses.map((bus) => (
                  <tr key={bus.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{bus.busNumber}</div>
                        <div className="text-sm text-gray-500">{bus.operator}</div>
                        <div className="text-xs text-gray-400">{bus.type} • {bus.capacity} seats</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{bus.route}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{bus.departureTime} - {bus.arrivalTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{bus.driver}</div>
                        <div className="text-xs text-gray-500">{bus.contact}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(bus.status)}`}>
                        {bus.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(bus)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditBus(bus)}
                          className="text-green-600 hover:text-green-900"
                          title="Edit Bus"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBus(bus.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Bus"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredBuses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No buses found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Bus Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingBus ? 'Edit Bus' : 'Add New Bus'}
              </h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bus Number</label>
                  <input
                    type="text"
                    defaultValue={editingBus?.busNumber}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="BUS-1001"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Operator</label>
                  <input
                    type="text"
                    defaultValue={editingBus?.operator}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Express Lines"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    defaultValue={editingBus?.type}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacity</label>
                  <input
                    type="number"
                    defaultValue={editingBus?.capacity}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="45"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Route</label>
                  <input
                    type="text"
                    defaultValue={editingBus?.route}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="New York → Los Angeles"
                  />
                </div>
              </form>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingBus ? 'Update' : 'Add'} Bus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusManagement;
