import { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface FormData {
  // Academic Details
  education: string;
  educationGrade: string;
  gradeType: string;
  
  // Language Test
  hasLanguageTest: string;
  languageTest: string;
  ieltsScore: string;
  
  // Work Experience
  has_work_experience: string;
  work_experience_years: string;
  
  // Other Details
  financial_capacity: string;
  preferred_intake: string;
  preferred_province: string;
  
  // Personal Info
  full_name: string;
  email: string;
  phone: string;
  city: string;
}

export default function EligibilityForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const education = watch("education");
  const hasLanguageTest = watch("hasLanguageTest");
  const languageTest = watch("languageTest");

  const totalSteps = 4;
  const hasWorkExperience = watch("has_work_experience") === "yes";

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Form submitted:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to results page (simulated)
    window.location.href = '/result';
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Academic Background";
      case 2: return "Language Proficiency";
      case 3: return "Work Experience & Preferences";
      case 4: return "Contact Information";
      default: return "Assessment Form";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
              Fill in Your Details to Check Eligibility
            </h1>
            <p className="text-xl text-gray-600">
              Complete all sections to get your comprehensive eligibility assessment
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Card title={getStepTitle()} className="mb-8">
              
              {/* Step 1: Academic Background */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Education Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What is your last education? *
                    </label>
                    <select
                      {...register("education", {
                        required: "Education is required",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      data-testid="select-education"
                    >
                      <option value="">Select your education</option>
                      <option value="12th">12th Standard</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                    </select>
                    {errors.education && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.education.message}
                      </p>
                    )}
                  </div>

                  {/* Education Grade Section */}
                  {education && (
                    <div className="grid lg:grid-cols-2 gap-4">
                      {education === "12th" ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            12th Standard Percentage *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            {...register("educationGrade", {
                              required: "Percentage is required",
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter percentage (e.g., 85)"
                            data-testid="input-percentage"
                          />
                          {errors.educationGrade && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.educationGrade.message}
                            </p>
                          )}
                        </div>
                      ) : (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Grade Type *
                            </label>
                            <select
                              {...register("gradeType", {
                                required: "Grade type is required",
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              data-testid="select-grade-type"
                            >
                              <option value="">Select grade type</option>
                              <option value="cgpa">CGPA</option>
                              <option value="percentage">Percentage</option>
                            </select>
                            {errors.gradeType && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.gradeType.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {watch("gradeType") === "cgpa" ? "CGPA *" : "Percentage *"}
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              max={watch("gradeType") === "cgpa" ? "10" : "100"}
                              {...register("educationGrade", {
                                required: `${watch("gradeType") === "cgpa" ? "CGPA" : "Percentage"} is required`,
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder={
                                watch("gradeType") === "cgpa"
                                  ? "Enter CGPA (e.g., 8.5)"
                                  : "Enter percentage (e.g., 85)"
                              }
                              data-testid="input-grade"
                            />
                            {errors.educationGrade && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.educationGrade.message}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Language Test */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Step 2: Language Test
                    </h4>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Have you applied for language test? *
                    </label>
                    <select
                      {...register("hasLanguageTest", {
                        required: "This field is required",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      data-testid="select-language-test"
                    >
                      <option value="">Select option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {errors.hasLanguageTest && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.hasLanguageTest.message}
                      </p>
                    )}
                  </div>

                  {/* Language Test Type */}
                  {hasLanguageTest === "yes" && (
                    <div className="grid lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Which language test? *
                        </label>
                        <select
                          {...register("languageTest", {
                            required: "Language test is required",
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          data-testid="select-language-test-type"
                        >
                          <option value="">Select language test</option>
                          <option value="ielts">IELTS</option>
                          <option value="toefl">TOEFL</option>
                          <option value="gre">GRE</option>
                        </select>
                        {errors.languageTest && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.languageTest.message}
                          </p>
                        )}
                      </div>

                      {/* IELTS Score */}
                      {languageTest === "ielts" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            What's your IELTS bands? *
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            max="9"
                            {...register("ieltsScore", {
                              required: "IELTS score is required",
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter IELTS bands (e.g., 7.5)"
                            data-testid="input-ielts-score"
                          />
                          {errors.ieltsScore && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.ieltsScore.message}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Work Experience & Preferences */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you have work experience? *
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="yes"
                          {...register("has_work_experience", { required: "Please select an option" })}
                          className="mr-2"
                          data-testid="radio-work-experience-yes"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="no"
                          {...register("has_work_experience", { required: "Please select an option" })}
                          className="mr-2"
                          data-testid="radio-work-experience-no"
                        />
                        No
                      </label>
                    </div>
                    {errors.has_work_experience && (
                      <p className="text-red-500 text-sm mt-1">{errors.has_work_experience.message}</p>
                    )}
                  </div>

                  {hasWorkExperience && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Work Experience
                      </label>
                      <input
                        type="number"
                        {...register("work_experience_years")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter years (e.g., 2)"
                        data-testid="input-work-years"
                      />
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Intake *
                      </label>
                      <select
                        {...register("preferred_intake", { required: "Please select an intake" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        data-testid="select-intake"
                      >
                        <option value="">Select Intake</option>
                        <option value="january">January</option>
                        <option value="may">May</option>
                        <option value="september">September</option>
                      </select>
                      {errors.preferred_intake && (
                        <p className="text-red-500 text-sm mt-1">{errors.preferred_intake.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Province (Optional)
                      </label>
                      <select
                        {...register("preferred_province")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        data-testid="select-province"
                      >
                        <option value="">Select Province</option>
                        <option value="ontario">Ontario</option>
                        <option value="british-columbia">British Columbia</option>
                        <option value="alberta">Alberta</option>
                        <option value="quebec">Quebec</option>
                        <option value="manitoba">Manitoba</option>
                        <option value="saskatchewan">Saskatchewan</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Financial Capacity (Optional)
                    </label>
                    <select
                      {...register("financial_capacity")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      data-testid="select-financial-capacity"
                    >
                      <option value="">Select Range</option>
                      <option value="below-20">Below $20,000</option>
                      <option value="20-40">$20,000 - $40,000</option>
                      <option value="40-60">$40,000 - $60,000</option>
                      <option value="above-60">Above $60,000</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Contact Information */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register("full_name", { required: "This field is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter your full name"
                        data-testid="input-full-name"
                      />
                      {errors.full_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register("email", { 
                          required: "This field is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Please enter a valid email"
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

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register("phone", { required: "This field is required" })}
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
                        City *
                      </label>
                      <input
                        type="text"
                        {...register("city", { required: "This field is required" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter your city"
                        data-testid="input-city"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                icon={<ArrowLeft className="w-4 h-4" />}
                data-testid="button-previous"
              >
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  data-testid="button-next"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="gradient"
                  loading={isSubmitting}
                  icon={<CheckCircle className="w-4 h-4" />}
                  iconPosition="right"
                  data-testid="button-submit"
                >
                  {isSubmitting ? "Processing..." : "Check Eligibility"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}