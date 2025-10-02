import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { Download, Search } from "lucide-react";
import { useState } from "react";
import type { Submission } from "@shared/schema";
import { PDFDownloadLink } from "@react-pdf/renderer";
import UserPDFDocument from "@/components/UserPDFDocument";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: submissions, isLoading } = useQuery<Submission[]>({
    queryKey: ["/api/submissions"],
  });

  const filteredSubmissions = submissions?.filter(
    (submission) =>
      submission.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-users-title">
            User Details
          </h1>
          <p className="text-gray-600">View and export user submissions</p>
        </div>

        {/* Search and Export */}
        <Card padding="md" className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                data-testid="input-search-users"
              />
            </div>
            {filteredSubmissions && filteredSubmissions.length > 0 && (
              <PDFDownloadLink
                document={<UserPDFDocument submissions={filteredSubmissions} />}
                fileName={`user-submissions-${new Date().toISOString().split("T")[0]}.pdf`}
                className="w-full md:w-auto"
              >
                {({ loading }) => (
                  <Button
                    variant="gradient"
                    size="lg"
                    icon={<Download className="w-5 h-5" />}
                    disabled={loading}
                    data-testid="button-export-pdf"
                    className="w-full md:w-auto"
                  >
                    {loading ? "Preparing PDF..." : "Export to PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            )}
          </div>
        </Card>

        {/* Users Table */}
        <Card padding="md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Phone
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Country
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Education
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Test
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Score
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Experience
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Eligibility
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions?.map((submission, index) => (
                  <tr
                    key={submission.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                    data-testid={`row-user-${index}`}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {submission.fullName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {submission.email}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {submission.phone}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {submission.country}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {submission.education}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {submission.englishTest || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {submission.testScore || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {submission.workExperience || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className="font-semibold text-gray-900">
                        {submission.eligibilityScore}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          submission.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {submission.submittedAt
                        ? new Date(submission.submittedAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredSubmissions?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No submissions found</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
