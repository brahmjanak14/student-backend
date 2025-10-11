import { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, TrendingDown, ArrowRight, RefreshCw } from "lucide-react";

export default function Result() {
  // Mock result data - in real app this would come from form submission
  const [resultData] = useState({
    isEligible: true,
    probabilityScore: 85,
    strengths: [
      "Excellent academic performance (85% in 12th)",
      "Strong IELTS scores (Overall 7.5)",
      "Good work experience (2 years)",
      "Sufficient financial capacity"
    ],
    weaknesses: [
      "Bachelor's CGPA could be higher",
      "Writing score slightly low (6.5)"
    ],
    suggestion: "You have a strong profile for Canada study visa. Consider improving your writing score to increase chances further."
  });

  const handleUnlockReport = () => {
    console.log("Navigating to download share");
    // Pass the result data via URL parameters
    const params = new URLSearchParams({
      score: resultData.probabilityScore.toString(),
      eligible: resultData.isEligible.toString()
    });
    window.location.href = `/download-share?${params.toString()}`;
  };

  const handleRetakeAssessment = () => {
    console.log("Retaking assessment");
    window.location.href = '/eligibility';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
              Your Eligibility Assessment Results
            </h1>
            <p className="text-xl text-gray-600">
              Based on the information you provided, here's your detailed assessment
            </p>
          </div>

          {/* Main Result Card */}
          <Card className="text-center mb-8" padding="lg">
            <div className="mb-6">
              {resultData.isEligible ? (
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              ) : (
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                  <XCircle className="w-10 h-10 text-red-600" />
                </div>
              )}
              
              <h2 className={`text-3xl font-bold mb-2 ${resultData.isEligible ? 'text-green-700' : 'text-red-700'}`} data-testid="text-eligibility-status">
                {resultData.isEligible ? "Congratulations! You're Eligible" : "Not Eligible at This Time"}
              </h2>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-gray-600">Probability Score:</span>
                <span className={`text-2xl font-bold ${
                  resultData.probabilityScore >= 70 ? 'text-green-600' : 
                  resultData.probabilityScore >= 50 ? 'text-yellow-600' : 'text-red-600'
                }`} data-testid="text-probability-score">
                  {resultData.probabilityScore}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    resultData.probabilityScore >= 70 ? 'bg-green-500' : 
                    resultData.probabilityScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${resultData.probabilityScore}%` }}
                ></div>
              </div>
            </div>

            <p className="text-gray-600 text-lg mb-6" data-testid="text-suggestion">
              {resultData.suggestion}
            </p>

            <Button 
              variant="gradient" 
              size="lg"
              onClick={handleUnlockReport}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              data-testid="button-unlock-report"
            >
              Unlock Full Report
            </Button>
          </Card>

          {/* Strengths and Weaknesses */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Strengths */}
            <Card title="Your Strengths" className="border-green-200 bg-green-50">
              <div className="space-y-3">
                {resultData.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-green-800" data-testid={`text-strength-${index}`}>
                      {strength}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Weaknesses */}
            <Card title="Areas for Improvement" className="border-red-200 bg-red-50">
              <div className="space-y-3">
                {resultData.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <TrendingDown className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-800" data-testid={`text-weakness-${index}`}>
                      {weakness}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Next Steps */}
          <Card title="What's Next?" className="border-blue-200 bg-blue-50">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800">
                  Get your detailed eligibility report with step-by-step guidance
                </span>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800">
                  Receive personalized recommendations from our experts
                </span>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800">
                  Access university shortlisting based on your profile
                </span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleUnlockReport}
              data-testid="button-get-full-report"
            >
              Get Full Report
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleRetakeAssessment}
              icon={<RefreshCw className="w-4 h-4" />}
              data-testid="button-retake-assessment"
            >
              Retake Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}