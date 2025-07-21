'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      setSubmitStatus('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    // Validate message length
    if (formData.message.length > 500) {
      setSubmitStatus('Message must be 500 characters or less.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Format data for submission
      const submissionData = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        message: formData.message
      });

      const response = await fetch('https://readdy.ai/api/form-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submissionData.toString()
      });

      if (response.ok) {
        setSubmitStatus('Thank you for your reservation request! We will contact you shortly to confirm your booking.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: '2',
          message: ''
        });
      } else {
        setSubmitStatus('There was an error submitting your request. Please try again or call us directly.');
      }
    } catch (error) {
      setSubmitStatus('There was an error submitting your request. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://readdy.ai/api/search-image?query=elegant%20restaurant%20interior%2C%20warm%20lighting%2C%20dining%20tables%2C%20welcoming%20atmosphere%2C%20professional%20restaurant%20photography%2C%20inviting%20dining%20room%2C%20sophisticated%20restaurant%20ambiance&width=1920&height=600&seq=contact-hero&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-pacifico)' }}>
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              We'd love to hear from you. Make a reservation or get in touch!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-map-pin-fill text-2xl text-amber-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Visit Us</h3>
              <p className="text-gray-600">
                123 Main Street<br />
                Downtown, NY 10001<br />
                United States
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-phone-fill text-2xl text-amber-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Call Us</h3>
              <p className="text-gray-600">
                Phone: (555) 123-4567<br />
                Reservations: (555) 123-4568<br />
                Available 7 days a week
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-time-fill text-2xl text-amber-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Hours</h3>
              <p className="text-gray-600">
                Mon-Thu: 11:00 AM - 10:00 PM<br />
                Fri-Sat: 11:00 AM - 11:00 PM<br />
                Sunday: 12:00 PM - 9:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Form and Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Us</h2>
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9476519598093!2d-74.0060152846842!3d40.7589402793256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598f988156a9%3A0xd54629bdf9d61478!2sTimes%20Square%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1644951234567!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Captain Restaurant Location"
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-5 h-5 flex items-center justify-center mt-0.5 mr-3">
                      <i className="ri-parking-line text-amber-600"></i>
                    </div>
                    <span>Valet parking available ($15)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 flex items-center justify-center mt-0.5 mr-3">
                      <i className="ri-wheelchair-line text-amber-600"></i>
                    </div>
                    <span>Wheelchair accessible</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 flex items-center justify-center mt-0.5 mr-3">
                      <i className="ri-restaurant-line text-amber-600"></i>
                    </div>
                    <span>Private dining room available</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 flex items-center justify-center mt-0.5 mr-3">
                      <i className="ri-wifi-line text-amber-600"></i>
                    </div>
                    <span>Free WiFi for guests</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              We're here to help with any questions or special requests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-mail-line text-xl text-amber-600"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Email Us</h3>
                  <p className="text-gray-600">For general inquiries</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>General:</strong> info@bellavista.com
                </p>
                <p className="text-gray-700">
                  <strong>Reservations:</strong> reservations@bellavista.com
                </p>
                <p className="text-gray-700">
                  <strong>Private Events:</strong> events@bellavista.com
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-customer-service-line text-xl text-amber-600"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600">Speak directly with our team</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Main Line:</strong> (555) 123-4567
                </p>
                <p className="text-gray-700">
                  <strong>Reservations:</strong> (555) 123-4568
                </p>
                <p className="text-gray-700">
                  <strong>Best Time to Call:</strong> 10:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
