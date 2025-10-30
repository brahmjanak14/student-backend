import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Download, Loader2 } from "lucide-react";

const contactSchema = z.object({
  fullName: z.string().min(1, "This field is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  city: z.string().min(1, "This field is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type OTPFormData = z.infer<typeof otpSchema>;

export default function CheckEligibility() {
  const [step, setStep] = useState<"contact" | "otp" | "result">("contact");
  const [submissionId, setSubmissionId] = useState<string>("");
  const [eligibilityData, setEligibilityData] = useState<any>(null);
  const { toast } = useToast();

  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
    },
  });

  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onSubmit",
    defaultValues: {
      otp: "",
    },
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch("/api/eligibility/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit");
      return response.json();
    },
    onSuccess: (data: { id: string; otpCode?: string }) => {
      setSubmissionId(data.id);
      setStep("otp");
      
      // In development, show the OTP in the toast for easy testing
      if (data.otpCode) {
        toast({
          title: "OTP Sent!",
          description: `Your OTP code is: ${data.otpCode}`,
        });
      } else {
        toast({
          title: "OTP Sent!",
          description: "Check your WhatsApp for the verification code",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (data: OTPFormData) => {
      const response = await fetch("/api/eligibility/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          otp: data.otp,
        }),
      });
      if (!response.ok) throw new Error("Invalid OTP");
      return response.json();
    },
    onSuccess: (data: { score: number; message: string }) => {
      setEligibilityData(data);
      setStep("result");
    },
    onError: () => {
      toast({
        title: "Invalid OTP",
        description: "The code you entered is incorrect. Please try again.",
        variant: "destructive",
      });
    },
  });

  const downloadPdfMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/eligibility/download-pdf/${submissionId}`);
      if (!response.ok) throw new Error("Failed to download");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `eligibility-report-${submissionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to download PDF. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onContactSubmit = (data: ContactFormData) => {
    submitContactMutation.mutate(data);
  };

  const onOtpSubmit = (data: OTPFormData) => {
    verifyOtpMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl">
        {step === "contact" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
              <CardDescription>
                Fill in your details to check your eligibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      {...contactForm.register("fullName")}
                      placeholder="Enter your full name"
                      data-testid="input-fullname"
                    />
                    {contactForm.formState.errors.fullName && (
                      <p className="text-sm text-destructive">
                        {contactForm.formState.errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...contactForm.register("email")}
                      placeholder="Enter your email"
                      data-testid="input-email"
                    />
                    {contactForm.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {contactForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...contactForm.register("phone")}
                      placeholder="Enter your phone number"
                      data-testid="input-phone"
                    />
                    {contactForm.formState.errors.phone && (
                      <p className="text-sm text-destructive">
                        {contactForm.formState.errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      {...contactForm.register("city")}
                      placeholder="Enter your city"
                      data-testid="input-city"
                    />
                    {contactForm.formState.errors.city && (
                      <p className="text-sm text-destructive">
                        {contactForm.formState.errors.city.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitContactMutation.isPending}
                  data-testid="button-check-eligibility"
                >
                  {submitContactMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Check Eligibility"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === "otp" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Verify Phone Number</CardTitle>
              <CardDescription>
                Check your WhatsApp - we sent you a verification code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter 6-Digit OTP</Label>
                  <Input
                    id="otp"
                    {...otpForm.register("otp")}
                    placeholder="000000"
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                    data-testid="input-otp"
                  />
                  {otpForm.formState.errors.otp && (
                    <p className="text-sm text-destructive">
                      {otpForm.formState.errors.otp.message}
                    </p>
                  )}
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  Check your WhatsApp for the OTP code
                </p>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={verifyOtpMutation.isPending}
                  data-testid="button-verify-otp"
                >
                  {verifyOtpMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Continue"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === "result" && eligibilityData && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-3xl text-green-600 dark:text-green-400">
                Congratulations! You're Eligible
              </CardTitle>
              <CardDescription className="text-lg">
                Probability Score: <span className="font-bold text-2xl">{eligibilityData.score}%</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Eligibility Score</span>
                  <span className="font-medium">{eligibilityData.score}%</span>
                </div>
                <Progress value={eligibilityData.score} className="h-3" />
              </div>

              <p className="text-center text-muted-foreground">
                {eligibilityData.message || "You have a strong profile for Canada study visa. Consider improving your writing score to increase chances further."}
              </p>

              <Button
                onClick={() => downloadPdfMutation.mutate()}
                className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                size="lg"
                disabled={downloadPdfMutation.isPending}
                data-testid="button-unlock-report"
              >
                {downloadPdfMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    Unlock Full Report
                    <Download className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
