import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBus } from '../context/BusContext';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeftIcon,
  CreditCardIcon,
  BuildingOfficeIcon,
  QrCodeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';


const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errors, setErrors] = useState({});
 
  const [formData, setFormData] = useState({
    // UPI fields
    upiId: '',
    upiApp: 'gpay',
   
    // Credit Card fields
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
   
    // Net Banking fields
    selectedBank: '',
   
    // Common
    savePaymentMethod: false
  });


  const { selectedBus, selectedSeats, searchCriteria, setBooking, bookingDetails } = useBus();
  const { user } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (!selectedBus || selectedSeats.length === 0) {
      navigate('/booking-confirmation');
      return;
    }
  }, [selectedBus, selectedSeats, navigate]);


  const calculateTotalPrice = () => {
    const basePrice = selectedSeats.length * 299;
    const vipCharges = selectedSeats.length * 150;
    const serviceFee = selectedSeats.length > 0 ? 50 : 0;
    return basePrice + vipCharges + serviceFee;
  };


  const upiApps = [
    { id: 'gpay', name: 'Google Pay', icon: '📱' },
    { id: 'paytm', name: 'Paytm', icon: '💰' },
    { id: 'phonepe', name: 'PhonePe', icon: '📲' },
    { id: 'upi', name: 'BHIM UPI', icon: '🏛️' }
  ];


  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'IndusInd Bank',
    'Yes Bank'
  ];


  const validateForm = () => {
    const newErrors = {};
   
    if (paymentMethod === 'upi') {
      if (!formData.upiId.trim()) {
        newErrors.upiId = 'UPI ID is required';
      } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/.test(formData.upiId)) {
        newErrors.upiId = 'Please enter a valid UPI ID';
      }
    } else if (paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
     
      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required';
      }
     
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }
     
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
    } else if (paymentMethod === 'netbanking') {
      if (!formData.selectedBank) {
        newErrors.selectedBank = 'Please select a bank';
      }
    }
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
   
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };


  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
   
    if (formattedValue.length <= 19) { // 16 digits + 3 spaces
      setFormData({
        ...formData,
        cardNumber: formattedValue
      });
     
      if (errors.cardNumber) {
        setErrors({
          ...errors,
          cardNumber: ''
        });
      }
    }
  };


  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
   
    if (value.length <= 5) {
      setFormData({
        ...formData,
        expiryDate: value
      });
     
      if (errors.expiryDate) {
        setErrors({
          ...errors,
          expiryDate: ''
        });
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!validateForm()) {
      return;
    }
   
    setLoading(true);
   
    // Simulate payment processing
    setTimeout(() => {
      // Create booking after successful payment
      const newBookingId = 'BK' + Date.now().toString().slice(-8);
     
      const bookingData = {
        id: newBookingId,
        user: user,
        bus: selectedBus,
        seats: selectedSeats,
        searchCriteria: searchCriteria,
        totalPrice: calculateTotalPrice(),
        bookingDate: new Date().toISOString(),
        status: 'confirmed',
        paymentMethod: paymentMethod,
        paymentStatus: 'completed'
      };
     
      setBooking(bookingData);
      setPaymentSuccess(true);
      setLoading(false);
    }, 3000);
  };


  const handleBack = () => {
    navigate('/booking-confirmation');
  };


  const handleViewBooking = () => {
    navigate('/dashboard');
  };


  if (!selectedBus || selectedSeats.length === 0) {
    return null;
  }


  if (paymentSuccess) {
    const bookingId = bookingDetails?.id || 'BK' + Date.now().toString().slice(-8);
   
    return (
      <div className="page-container page-shell" style={{ minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif' }}>
        <div className="page-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
          <div className="card" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
            <div className="bg-green-50 px-6 py-8 text-center" style={{ backgroundColor: '#f0fdf4', padding: '2rem', textAlign: 'center' }}>
              <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" style={{ width: '4rem', height: '4rem', color: '#16a34a', margin: '0 auto 1rem auto' }} />
              <h1 className="text-3xl font-bold text-green-900 mb-2" style={{ fontSize: '1.875rem', fontWeight: '700', color: '#14532d', marginBottom: '0.5rem' }}>Payment Successful!</h1>
              <p className="text-green-700" style={{ color: '#15803d' }}>Your payment has been processed and booking confirmed</p>
            </div>
           
            <div className="p-8" style={{ padding: '2rem' }}>
              <div className="bg-gray-50 rounded-lg p-6 mb-6" style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="text-center mb-6" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div className="text-sm text-gray-600 mb-2" style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Booking ID</div>
                  <div className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>{bookingId}</div>
                  <div className="text-sm text-gray-500 mt-1" style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Please save this for future reference</div>
                </div>
               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', fontSize: '0.875rem' }}>
                  <div>
                    <div className="text-gray-600 mb-1" style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Journey</div>
                    <div className="font-medium" style={{ fontWeight: '500' }}>
                      {searchCriteria.source} → {searchCriteria.destination}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1" style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Date</div>
                    <div className="font-medium" style={{ fontWeight: '500' }}>{searchCriteria.date}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1" style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Bus Operator</div>
                    <div className="font-medium" style={{ fontWeight: '500' }}>{selectedBus.operator}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1" style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Departure Time</div>
                    <div className="font-medium" style={{ fontWeight: '500' }}>{selectedBus.departureTime}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1" style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Seats</div>
                    <div className="font-medium" style={{ fontWeight: '500' }}>{selectedSeats.join(', ')}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1" style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Total Amount</div>
                    <div className="font-medium text-green-600" style={{ fontWeight: '500', color: '#16a34a' }}>₹{calculateTotalPrice()}</div>
                  </div>
                </div>
              </div>
             
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
                <h3 className="font-semibold text-blue-900 mb-2" style={{ fontWeight: '600', color: '#1e3a8a', marginBottom: '0.5rem' }}>Important Information</h3>
                <ul className="text-sm text-blue-800 space-y-1" style={{ fontSize: '0.875rem', color: '#1e40af', listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '0.25rem' }}>• Please arrive at the boarding point 30 minutes before departure</li>
                  <li style={{ marginBottom: '0.25rem' }}>• Carry a valid ID proof for verification</li>
                  <li style={{ marginBottom: '0.25rem' }}>• Show your booking ID and ID proof at the boarding point</li>
                  <li style={{ marginBottom: '0.25rem' }}>• Cancellation policy applies as per operator terms</li>
                </ul>
              </div>
             
              <div className="flex flex-col sm:flex-row gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                  onClick={handleViewBooking}
                  className="btn btn-primary"
                  style={{
                    padding: '0.875rem 1.5rem',
                    borderRadius: '8px',
                    background: '#3b82f6',
                    color: 'white',
                    fontWeight: '500',
                    cursor: 'pointer',
                    border: 'none',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease-in-out'
                  }}
                >
                  View My Bookings
                </button>
                <button
                  onClick={() => navigate('/tracking', { state: { bookingId } })}
                  className="btn btn-secondary"
                  style={{
                    padding: '0.875rem 1.5rem',
                    borderRadius: '8px',
                    background: '#f3f4f6',
                    color: '#374151',
                    fontWeight: '500',
                    cursor: 'pointer',
                    border: '1px solid #d1d5db',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease-in-out'
                  }}
                >
                  Track Bus
                </button>
                <button
                  onClick={() => navigate('/search')}
                  className="btn btn-secondary"
                  style={{
                    padding: '0.875rem 1.5rem',
                    borderRadius: '8px',
                    background: '#f3f4f6',
                    color: '#374151',
                    fontWeight: '500',
                    cursor: 'pointer',
                    border: '1px solid #d1d5db',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease-in-out'
                  }}
                >
                  Book Another Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="page-container page-shell" style={{ minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif' }}>
      <div className="page-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Header */}
        <div className="card mb-6" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <div className="flex items-center space-x-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={handleBack}
              className="btn btn-secondary"
              style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', background: '#f9fafb', color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" style={{ marginRight: '0.5rem' }} />
              Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827', margin: '0 0 0.5rem 0' }}>Payment</h1>
              <p className="text-gray-600" style={{ color: '#6b7280', margin: '0' }}>Complete your booking payment</p>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Payment Form */}
          <div className="lg:col-span-2" style={{ gridColumn: 'span 2 / span 2' }}>
            <div className="card" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-6" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1.5rem' }}>Select Payment Method</h3>
             
              {/* Payment Method Tabs */}
              <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg" style={{ display: 'flex', gap: '0.25rem', backgroundColor: '#f3f4f6', padding: '0.25rem', borderRadius: '0.5rem' }}>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    paymentMethod === 'upi'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease-in-out'
                  }}
                >
                  <QrCodeIcon className="h-5 w-5 mr-2" style={{ marginRight: '0.5rem' }} />
                  UPI
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    paymentMethod === 'card'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease-in-out'
                  }}
                >
                  <CreditCardIcon className="h-5 w-5 mr-2" style={{ marginRight: '0.5rem' }} />
                  Card
                </button>
                <button
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    paymentMethod === 'netbanking'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease-in-out'
                  }}
                >
                  <BuildingOfficeIcon className="h-5 w-5 mr-2" style={{ marginRight: '0.5rem' }} />
                  Net Banking
                </button>
              </div>


              <form onSubmit={handleSubmit} className="space-y-6">
                {/* UPI Payment */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Select UPI App</label>
                      <div className="grid grid-cols-2 gap-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                        {upiApps.map((app) => (
                          <button
                            key={app.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, upiApp: app.id })}
                            className={`p-3 border rounded-lg text-left transition-colors ${
                              formData.upiApp === app.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            style={{
                              padding: '0.75rem',
                              borderRadius: '0.5rem',
                              border: '1px solid',
                              textAlign: 'left',
                              transition: 'all 0.15s ease-in-out',
                              borderColor: formData.upiApp === app.id ? '#3b82f6' : '#e5e7eb',
                              backgroundColor: formData.upiApp === app.id ? '#eff6ff' : 'white'
                            }}
                          >
                            <div className="flex items-center space-x-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span className="text-xl">{app.icon}</span>
                              <span className="text-sm font-medium">{app.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                   
                    <div className="form-group">
                      <label htmlFor="upiId" className="form-label">UPI ID</label>
                      <input
                        id="upiId"
                        name="upiId"
                        type="text"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        placeholder="your-upi-id@bank"
                        className={`form-input ${errors.upiId ? 'border-red-500' : ''}`}
                      />
                      {errors.upiId && (
                        <p className="mt-1 text-sm text-red-600">{errors.upiId}</p>
                      )}
                    </div>
                  </div>
                )}


                {/* Credit Card Payment */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="form-group">
                      <label htmlFor="cardNumber" className="form-label">Card Number</label>
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        className={`form-input ${errors.cardNumber ? 'border-red-500' : ''}`}
                      />
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                      )}
                    </div>
                   
                    <div className="form-group">
                      <label htmlFor="cardName" className="form-label">Cardholder Name</label>
                      <input
                        id="cardName"
                        name="cardName"
                        type="text"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`form-input ${errors.cardName ? 'border-red-500' : ''}`}
                      />
                      {errors.cardName && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                      )}
                    </div>
                   
                    <div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                      <div className="form-group">
                        <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                        <input
                          id="expiryDate"
                          name="expiryDate"
                          type="text"
                          value={formData.expiryDate}
                          onChange={handleExpiryDateChange}
                          placeholder="MM/YY"
                          className={`form-input ${errors.expiryDate ? 'border-red-500' : ''}`}
                        />
                        {errors.expiryDate && (
                          <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                        )}
                      </div>
                     
                      <div className="form-group">
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input
                          id="cvv"
                          name="cvv"
                          type="text"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className={`form-input ${errors.cvv ? 'border-red-500' : ''}`}
                        />
                        {errors.cvv && (
                          <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}


                {/* Net Banking Payment */}
                {paymentMethod === 'netbanking' && (
                  <div className="space-y-4">
                    <div className="form-group">
                      <label htmlFor="selectedBank" className="form-label">Select Your Bank</label>
                      <select
                        id="selectedBank"
                        name="selectedBank"
                        value={formData.selectedBank}
                        onChange={handleInputChange}
                        className={`form-input ${errors.selectedBank ? 'border-red-500' : ''}`}
                      >
                        <option value="">Choose a bank</option>
                        {banks.map((bank) => (
                          <option key={bank} value={bank}>{bank}</option>
                        ))}
                      </select>
                      {errors.selectedBank && (
                        <p className="mt-1 text-sm text-red-600">{errors.selectedBank}</p>
                      )}
                    </div>
                   
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '1rem' }}>
                      <div className="flex" style={{ display: 'flex' }}>
                        <ExclamationCircleIcon className="h-5 w-5 text-blue-600 mr-2" style={{ width: '1.25rem', height: '1.25rem', color: '#2563eb', marginRight: '0.5rem' }} />
                        <div className="text-sm text-blue-800" style={{ fontSize: '0.875rem', color: '#1e40af' }}>
                          <p className="font-medium mb-1" style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Net Banking Notice</p>
                          <p>You will be redirected to your bank's secure payment gateway to complete the transaction.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}


                {/* Save Payment Method */}
                <div className="flex items-center">
                  <input
                    id="savePaymentMethod"
                    name="savePaymentMethod"
                    type="checkbox"
                    checked={formData.savePaymentMethod}
                    onChange={(e) => setFormData({ ...formData, savePaymentMethod: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    style={{ height: '1rem', width: '1rem', color: '#2563eb', borderColor: '#d1d5db' }}
                  />
                  <label htmlFor="savePaymentMethod" className="ml-2 text-sm text-gray-700">
                    Save this payment method for future bookings
                  </label>
                </div>


                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-full"
                  style={{
                    width: '100%',
                    padding: '0.875rem 1.5rem',
                    borderRadius: '8px',
                    background: loading ? '#9ca3af' : '#3b82f6',
                    color: 'white',
                    fontWeight: '500',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    border: 'none',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease-in-out'
                  }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner" style={{ width: '1.25rem', height: '1.25rem', border: '2px solid #ffffff', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '0.5rem' }}></div>
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay ₹${calculateTotalPrice()}`
                  )}
                </button>
              </form>
            </div>
          </div>


          {/* Order Summary */}
          <div className="lg:col-span-1" style={{ gridColumn: 'span 1 / span 1' }}>
            <div className="card sticky top-6" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem', position: 'sticky', top: '1.5rem' }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Order Summary</h3>
             
              {/* Journey Details */}
              <div className="mb-6" style={{ marginBottom: '1.5rem' }}>
                <div className="flex justify-between items-center pb-3 border-b" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                  <div>
                    <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>From</div>
                    <div className="font-medium" style={{ fontWeight: '500' }}>{searchCriteria.source}</div>
                  </div>
                  <div className="text-gray-400" style={{ color: '#9ca3af' }}>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>To</div>
                    <div className="font-medium" style={{ fontWeight: '500' }}>{searchCriteria.destination}</div>
                  </div>
                </div>
               
                <div className="mt-3 space-y-2" style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div className="flex justify-between text-sm" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span className="text-gray-600" style={{ color: '#6b7280' }}>Date</span>
                    <span>{searchCriteria.date}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span className="text-gray-600" style={{ color: '#6b7280' }}>Amount Paid</span>
                    <span className="font-medium text-green-600" style={{ fontWeight: '500', color: '#16a34a' }}>₹{calculateTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span className="text-gray-600" style={{ color: '#6b7280' }}>Departure</span>
                    <span>{selectedBus.departureTime}</span>
                  </div>
                </div>
              </div>


              {/* Seat Details */}
              <div className="mb-6" style={{ marginBottom: '1.5rem' }}>
                <div className="text-sm text-gray-600 mb-2" style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Selected Seats</div>
                <div className="flex flex-wrap gap-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedSeats.map(seatNumber => (
                    <span
                      key={seatNumber}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      style={{ padding: '0.25rem 0.75rem', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500' }}
                    >
                      {seatNumber}
                    </span>
                  ))}
                </div>
              </div>


              {/* Price Breakdown */}
              <div className="space-y-2 mb-6" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div className="flex justify-between text-sm" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span className="text-gray-600" style={{ color: '#6b7280' }}>Base Fare ({selectedSeats.length} seats)</span>
                  <span>₹{selectedSeats.length * 299}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span className="text-gray-600" style={{ color: '#6b7280' }}>VIP Charges</span>
                  <span>₹{selectedSeats.length * 150}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span className="text-gray-600" style={{ color: '#6b7280' }}>Service Fee</span>
                  <span>₹50</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg" style={{ borderTop: '1px solid #e5e7eb', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '1.125rem' }}>
                  <span>Total</span>
                  <span className="text-green-600" style={{ color: '#16a34a' }}>₹{calculateTotalPrice()}</span>
                </div>
              </div>


              {/* Security Badge */}
              <div className="text-center text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'center' }}>
                <div className="flex items-center justify-center mb-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <svg className="h-4 w-4 text-green-600 mr-1" style={{ width: '1rem', height: '1rem', color: '#16a34a', marginRight: '0.25rem' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Payment</span>
                </div>
                <p>Your payment information is encrypted and secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Payment;
