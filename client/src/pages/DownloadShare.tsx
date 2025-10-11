import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import { Download, Mail, MessageCircle, Calendar, CheckCircle, Star, Phone } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import EligibilityPDFDocument from "../components/EligibilityPDFDocument";

export default function DownloadShare() {
  const [emailSending, setEmailSending] = useState(false);
  const [whatsappSharing, setWhatsappSharing] = useState(false);
  const [eligibilityScore, setEligibilityScore] = useState(85);
  const [isEligible, setIsEligible] = useState(true);
  const [universities] = useState(12);
  const [programs] = useState(8);

  // Get score from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scoreParam = params.get('score');
    const eligibleParam = params.get('eligible');
    
    if (scoreParam) {
      setEligibilityScore(parseInt(scoreParam));
    }
    if (eligibleParam) {
      setIsEligible(eligibleParam === 'true');
    }
  }, []);

  const handleEmailReport = async () => {
    // Prompt user for email address
    const email = prompt("Please enter your email address to receive the report:");
    
    if (!email) {
      return;
    }
    
    // Basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    setEmailSending(true);
    
    try {
      const response = await fetch("/api/send-report-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          score: eligibilityScore,
          isEligible: isEligible,
        }),
      });
      
      if (response.ok) {
        alert(`Report sent to ${email} successfully!`);
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Email error:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setEmailSending(false);
    }
  };

  const handleWhatsAppShare = async () => {
    setWhatsappSharing(true);
    console.log("Sharing via WhatsApp...");
    
    // Simulate WhatsApp share
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real app, this would open WhatsApp with pre-filled message
    const message = "I just checked my Canada study visa eligibility with Pratham International! Check yours too: [link]";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setWhatsappSharing(false);
  };

  const handleBookCounselling = () => {
    console.log("Booking free counselling...");
    // In real app, this would open booking form or redirect to scheduling page
    alert("Redirecting to booking page...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
              Your Eligibility Report is Ready!
            </h1>
            <p className="text-xl text-gray-600">
              Download, email, or share your comprehensive assessment report
            </p>
          </div>

          {/* Report Summary */}
          <Card className="mb-8 text-center" padding="lg">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className={`text-3xl font-bold mb-2 ${
                  eligibilityScore >= 70 ? 'text-green-600' : 
                  eligibilityScore >= 50 ? 'text-yellow-600' : 'text-red-600'
                }`} data-testid="text-eligibility-score">
                  {eligibilityScore}%
                </div>
                <div className="text-gray-600">Eligibility Score</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2" data-testid="text-universities">
                  {universities}
                </div>
                <div className="text-gray-600">Recommended Universities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2" data-testid="text-programs">
                  {programs}
                </div>
                <div className="text-gray-600">Suitable Programs</div>
              </div>
            </div>
          </Card>

          {/* Download & Share Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Download PDF */}
            <Card className="text-center" hover>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Download PDF</h3>
              <p className="text-gray-600 text-sm mb-6">
                Get your detailed report as a PDF file for offline access
              </p>
              <PDFDownloadLink
                document={
                  <EligibilityPDFDocument 
                    score={eligibilityScore} 
                    isEligible={isEligible}
                    universities={universities}
                    programs={programs}
                  />
                }
                fileName={`eligibility-report-${new Date().toISOString().split("T")[0]}.pdf`}
                className="w-full"
              >
                {({ loading }) => (
                  <Button 
                    variant="primary" 
                    fullWidth
                    loading={loading}
                    data-testid="button-download-pdf"
                  >
                    {loading ? "Preparing PDF..." : "Download PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            </Card>

            {/* Email Report */}
            <Card className="text-center" hover>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Send via Email</h3>
              <p className="text-gray-600 text-sm mb-6">
                Receive the report directly in your email inbox
              </p>
              <Button 
                variant="secondary" 
                fullWidth
                loading={emailSending}
                onClick={handleEmailReport}
                data-testid="button-email-report"
              >
                {emailSending ? "Sending..." : "Send Email"}
              </Button>
            </Card>

            {/* WhatsApp Share */}
            <Card className="text-center" hover>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Share on WhatsApp</h3>
              <p className="text-gray-600 text-sm mb-6">
                Share your success with friends and family
              </p>
              <Button 
                variant="outline" 
                fullWidth
                loading={whatsappSharing}
                onClick={handleWhatsAppShare}
                data-testid="button-whatsapp-share"
              >
                {whatsappSharing ? "Sharing..." : "Share on WhatsApp"}
              </Button>
            </Card>
          </div>

          {/* Next Steps */}
          <Card title="What's Next?" className="mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Immediate Actions:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Review your detailed assessment report</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Check recommended university list</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Start working on areas for improvement</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Long-term Planning:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Prepare application documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Apply to recommended universities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Plan for visa application process</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* CTA Section */}
          <Card className="text-center bg-gradient-to-r from-primary to-red-600 text-white border-0">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5" />
              <Star className="w-5 h-5" />
              <Star className="w-5 h-5" />
              <Star className="w-5 h-5" />
              <Star className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Book Your Free Counselling Session</h3>
            <p className="text-white/90 mb-6">
              Get personalized guidance from our certified immigration experts to maximize your chances of success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white text-primary border-white hover:bg-gray-50"
                onClick={handleBookCounselling}
                icon={<Calendar className="w-5 h-5" />}
                data-testid="button-book-counselling"
              >
                Book Free Counselling
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                className="text-white hover:bg-white/10"
                onClick={() => console.log('Call now clicked')}
                icon={<Phone className="w-5 h-5" />}
                data-testid="button-call-now"
              >
                Call Now: +91-9876543210
              </Button>
            </div>
          </Card>

          {/* Testimonial */}
          <div className="mt-8 text-center">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">
                "The eligibility assessment was spot-on! I followed their recommendations and got accepted to my dream university in Canada."
              </p>
              <div className="font-semibold text-gray-900">- Priya Singh, University of Toronto</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}