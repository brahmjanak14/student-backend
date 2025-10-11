import { useLocation } from "wouter";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { Users, Award, Target, Globe, Star, CheckCircle } from "lucide-react";

export default function About() {
  const [, setLocation] = useLocation();
  const teamMembers = [
    {
      name: "Dr. Rajesh Sharma",
      role: "Founder & CEO",
      experience: "15+ years",
      image: "/api/placeholder/150/150",
      description: "Immigration law expert with extensive experience in Canadian visa policies."
    },
    {
      name: "Priya Patel",
      role: "Head of Operations",
      experience: "12+ years",
      image: "/api/placeholder/150/150",
      description: "Specialist in student visa applications and documentation."
    },
    {
      name: "Arjun Singh",
      role: "Senior Counselor",
      experience: "8+ years",
      image: "/api/placeholder/150/150",
      description: "Expert in university applications and scholarship guidance."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Helped" },
    { number: "95%", label: "Success Rate" },
    { number: "15+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Our Mission",
      description: "To make Canadian education accessible to every deserving student by providing expert guidance and personalized support throughout their journey."
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "Our Vision",
      description: "To be the most trusted immigration consultancy, helping students achieve their dreams of studying in Canada with confidence and ease."
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Our Values",
      description: "Integrity, transparency, and dedication guide our every action as we work tirelessly to ensure student success and satisfaction."
    }
  ];

  const achievements = [
    "Licensed Immigration Consultant (RCIC)",
    "Member of Immigration Consultants of Canada Regulatory Council",
    "Recognized by Government of Canada",
    "Award-winning student services",
    "Partnerships with 200+ Canadian institutions",
    "Multi-language support available"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-blue-50 py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4 md:mb-6">
              About Pratham International
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8">
              Your trusted partner in making Canadian education dreams come true. With over 15 years of experience, 
              we've helped thousands of students successfully navigate their journey to study in Canada.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 md:mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-primary mb-2" data-testid={`stat-number-${index}`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium" data-testid={`stat-label-${index}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-poppins font-bold text-center text-gray-900 mb-8 md:mb-12">
              What Drives Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center" padding="lg" data-testid={`value-card-${index}`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-8 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-poppins font-bold text-center text-gray-900 mb-8 md:mb-12">
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                Pratham International was founded in 2008 with a simple yet powerful vision: to bridge the gap between 
                ambitious students and world-class Canadian education. What started as a small consultancy has grown 
                into one of India's most trusted immigration and education consultancies.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our founder, Dr. Rajesh Sharma, experienced firsthand the challenges students face when navigating 
                the complex immigration process. After successfully completing his own studies in Canada and working 
                as an immigration lawyer, he decided to dedicate his career to helping others achieve their dreams.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we're proud to have helped over 10,000 students realize their dreams of studying in Canada. 
                Our team of certified immigration consultants, counselors, and support staff work tirelessly to 
                ensure every student receives personalized guidance tailored to their unique circumstances.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-poppins font-bold text-center text-gray-900 mb-8 md:mb-12">
              Meet Our Expert Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center" padding="lg" data-testid={`team-member-${index}`}>
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center">
                    <Users className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {member.experience} Experience
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements & Certifications */}
        <section className="py-8 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-poppins font-bold text-center text-gray-900 mb-8 md:mb-12">
              Our Achievements & Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3" data-testid={`achievement-${index}`}>
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 md:py-16 bg-gradient-to-r from-primary to-blue-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-poppins font-bold text-white mb-4 md:mb-6">
              Ready to Start Your Canadian Dream?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who trusted us with their Canadian education journey. 
              Let our expert team guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary"
                size="lg"
                onClick={() => setLocation('/eligibility')}
                data-testid="button-check-eligibility"
              >
                Check Your Eligibility
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="bg-white/10 border-white text-white hover:bg-white hover:text-primary"
                onClick={() => setLocation('/contact')}
                data-testid="button-contact-us"
              >
                Contact Our Experts
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}