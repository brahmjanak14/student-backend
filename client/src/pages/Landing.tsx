import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { CheckCircle, Users, Award, Clock, ArrowRight } from "lucide-react";

export default function Landing() {
  const featuresRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = [featuresRef.current, stepsRef.current];
    elements.forEach((el) => {
      if (el) {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);
  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: "Instant Assessment",
      description: "Get your eligibility results in just 2 minutes with our advanced assessment tool."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Expert Guidance",
      description: "Receive personalized recommendations from our certified immigration experts."
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600" />,
      title: "95% Accuracy",
      description: "Our assessment tool has helped over 10,000+ students with 95% accuracy rate."
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: "24/7 Support",
      description: "Get round-the-clock support for all your study visa queries and concerns."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Fill Assessment Form",
      description: "Complete our comprehensive eligibility form with your academic and personal details."
    },
    {
      number: "02", 
      title: "Get Instant Results",
      description: "Receive your eligibility score with detailed analysis of strengths and areas for improvement."
    },
    {
      number: "03",
      title: "Download Report",
      description: "Get your detailed eligibility report with personalized recommendations and next steps."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
              Why Choose Our Eligibility Checker?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get accurate, instant results with our comprehensive assessment tool trusted by thousands of students.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} padding="md" hover className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2" data-testid={`text-feature-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm" data-testid={`text-feature-description-${index}`}>
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={stepsRef} className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple 3-step process to check your Canada study visa eligibility
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full text-xl font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4" data-testid={`text-step-title-${index}`}>
                  {step.title}
                </h3>
                <p className="text-gray-600" data-testid={`text-step-description-${index}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="gradient" 
              size="xl"
              onClick={() => window.location.href = '/eligibility'}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              data-testid="button-start-now"
            >
              Start Your Assessment Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}