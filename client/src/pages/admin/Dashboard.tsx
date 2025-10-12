import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import Card from "@/components/Card";
import { Users, CheckCircle, Clock, TrendingUp } from "lucide-react";
import type { Submission } from "@shared/schema";

export default function AdminDashboard() {
  const { data: submissions, isLoading } = useQuery<Submission[]>({
    queryKey: ["/api/submissions"],
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  const totalSubmissions = submissions?.length || 0;
  const approvedCount = submissions?.filter((s) => s.status === "approved").length || 0;
  const pendingCount = submissions?.filter((s) => s.status === "pending").length || 0;
  const avgScore =
    submissions && submissions.length > 0
      ? Math.round(
          submissions.reduce((acc, s) => acc + (s.eligibilityScore || 0), 0) /
            submissions.length
        )
      : 0;

  const stats = [
    {
      title: "Total Submissions",
      value: totalSubmissions,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Approved",
      value: approvedCount,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending",
      value: pendingCount,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Avg. Score",
      value: avgScore + "%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recentSubmissions = submissions?.slice(0, 5) || [];

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-dashboard-title">
            Dashboard
          </h1>
          <p className="text-gray-600">Welcome to your admin dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} padding="md" className="hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1" data-testid={`text-stat-title-${index}`}>
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900" data-testid={`text-stat-value-${index}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Submissions */}
        <Card padding="md">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900" data-testid="text-recent-title">
              Recent Submissions
            </h2>
            <p className="text-gray-600 text-sm">Latest 5 eligibility assessments</p>
          </div>

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
                    Country
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Score
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
                {recentSubmissions.map((submission, index) => (
                  <tr
                    key={submission.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                    data-testid={`row-submission-${index}`}
                  >
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {submission.fullName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {submission.email}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {submission.country}
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
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
