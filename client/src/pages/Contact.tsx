import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Our Office",
      details: [
        "123 Business District, Sector 12",
        "Gurgaon, Haryana 122001",
        "India"
      ]
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Phone Numbers",
      details: [
        "+91 9876543210",
        "+91 9876543211",
        "Toll Free: 1800-123-4567"
      ]
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email Address",
      details: [
        "info@prathaminternational.com",
        "support@prathaminternational.com",
        "admissions@prathaminternational.com"
      ]
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Office Hours",
      details: [
        "Monday - Friday: 9:00 AM - 7:00 PM",
        "Saturday: 9:00 AM - 5:00 PM",
        "Sunday: Emergency Support Only"
      ]
    }
  ];

  const offices = [
    {
      city: "Delhi",
      address: "456 Connaught Place, Central Delhi",
      phone: "+91 11-4567-8900",
      email: "delhi@prathaminternational.com"
    },
    {
      city: "Mumbai",
      address: "789 Andheri West, Mumbai",
      phone: "+91 22-9876-5432",
      email: "mumbai@prathaminternational.com"
    },
    {
      city: "Bangalore",
      address: "321 Koramangala, Bangalore",
      phone: "+91 80-1234-5678",
      email: "bangalore@prathaminternational.com"
    },
    {
      city: "Chandigarh",
      address: "654 Sector 17, Chandigarh",
      phone: "+91 172-987-6543",
      email: "chandigarh@prathaminternational.com"
    }
  ];

  const faqs = [
    {
      question: "How long does the visa process take?",
      answer: "The visa processing time typically ranges from 4-12 weeks, depending on the type of application and current processing times."
    },
    {
      question: "What documents do I need for my application?",
      answer: "Required documents include academic transcripts, language test scores, financial statements, passport, and letters of recommendation."
    },
    {
      question: "Do you provide accommodation assistance?",
      answer: "Yes, we help students find suitable accommodation including on-campus residences, homestays, and shared apartments."
    },
    {
      question: "What are your consultation fees?",
      answer: "We offer a free initial consultation. Our service packages start from ₹25,000 and vary based on the services included."
    }
  ];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    console.log("Contact form submitted:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    reset();
    
    // Reset success state after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12 overflow-x-hidden">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-blue-50 py-8 md:py-16">
          <div className="max-w-4xl mx-auto px-4 text-center overflow-x-hidden">
            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4 md:mb-6 break-words">
              Get In Touch With Us
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto break-words">
              Have questions about studying in Canada? Our expert team is here to help you every step of the way. 
              Contact us today for personalized guidance.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-8 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-poppins font-bold text-center text-gray-900 mb-8 md:mb-12">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center" padding="md" data-testid={`contact-info-${index}`}>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm break-words overflow-wrap-anywhere">
                        {detail}
                      </p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="py-8 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
              {/* Contact Form */}
              <div>
                {isSubmitted ? (
                  <Card title="Message Sent!" className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-gray-600">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </Card>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Card title="Send Us a Message">
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              {...register("name", { required: "Name is required" })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Enter your full name"
                              data-testid="input-name"
                            />
                            {errors.name && (
                              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address"
                                }
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Enter your email"
                              data-testid="input-email"
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              {...register("phone", { required: "Phone number is required" })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Enter your phone number"
                              data-testid="input-phone"
                            />
                            {errors.phone && (
                              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Subject *
                            </label>
                            <select
                              {...register("subject", { required: "Subject is required" })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              data-testid="select-subject"
                            >
                              <option value="">Select a subject</option>
                              <option value="visa-consultation">Visa Consultation</option>
                              <option value="university-selection">University Selection</option>
                              <option value="document-preparation">Document Preparation</option>
                              <option value="scholarship-guidance">Scholarship Guidance</option>
                              <option value="other">Other</option>
                            </select>
                            {errors.subject && (
                              <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message *
                          </label>
                          <textarea
                            {...register("message", { required: "Message is required" })}
                            rows={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            placeholder="Tell us about your requirements or questions..."
                            data-testid="textarea-message"
                          />
                          {errors.message && (
                            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full"
                          data-testid="button-submit-contact"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  </form>
                )}
              </div>

              {/* Map and Additional Info */}
              <div className="lg:mt-0 mt-8">
                <Card title="Visit Our Office">
                
                {/* Map Placeholder */}
                <div className="bg-gray-200 h-48 md:h-64 rounded-lg flex items-center justify-center mb-6 md:mb-8">
                  <div className="text-center px-4">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Interactive Map</p>
                    <p className="text-sm text-gray-400 break-words">123 Business District, Gurgaon</p>
                  </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                      Quick Contact
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-gray-600 break-words min-w-0">+91 9876543210</span>
                      </div>
                      <div className="flex items-center gap-3 min-w-0">
                        <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-gray-600 break-words min-w-0 overflow-wrap-anywhere">info@prathaminternational.com</span>
                      </div>
                      <div className="flex items-center gap-3 min-w-0">
                        <MessageSquare className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-gray-600 break-words min-w-0">WhatsApp: +91 9876543210</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => setLocation('/eligibility')}
                        data-testid="button-free-assessment"
                      >
                        Get Free Assessment
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Other Offices */}
        <section className="py-8 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-poppins font-bold text-center text-gray-900 mb-8 md:mb-12">
              Our Other Offices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {offices.map((office, index) => (
                <Card key={index} padding="md" data-testid={`office-${index}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {office.city}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 break-words">
                    {office.address}
                  </p>
                  <div className="space-y-1">
                    <p className="text-primary text-sm font-medium break-words">
                      {office.phone}
                    </p>
                    <p className="text-gray-500 text-sm break-words overflow-wrap-anywhere">
                      {office.email}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-poppins font-bold text-center text-gray-900 mb-8 md:mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 md:space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} padding="md" data-testid={`faq-${index}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 break-words">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 break-words">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}