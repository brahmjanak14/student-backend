import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Submission } from "@shared/schema";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "2 solid #d32f2f",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    color: "#d32f2f",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
    padding: 8,
  },
  table: {
    width: "100%",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #e0e0e0",
    paddingVertical: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderBottom: "2 solid #d32f2f",
    paddingVertical: 8,
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 5,
    fontSize: 9,
  },
  tableCellHeader: {
    flex: 1,
    paddingHorizontal: 5,
    fontSize: 9,
    fontWeight: "bold",
  },
  statusApproved: {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: 4,
    borderRadius: 3,
  },
  statusPending: {
    backgroundColor: "#fff3cd",
    color: "#856404",
    padding: 4,
    borderRadius: 3,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#999",
    fontSize: 8,
    borderTop: "1 solid #e0e0e0",
    paddingTop: 10,
  },
});

interface UserPDFDocumentProps {
  submissions: Submission[];
}

export default function UserPDFDocument({ submissions }: UserPDFDocumentProps) {
  const totalSubmissions = submissions.length;
  const approvedCount = submissions.filter((s) => s.status === "approved").length;
  const pendingCount = submissions.filter((s) => s.status === "pending").length;

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Canada Study Visa - User Submissions</Text>
          <Text style={styles.subtitle}>
            Generated on {new Date().toLocaleDateString()} at{" "}
            {new Date().toLocaleTimeString()}
          </Text>
        </View>

        {/* Summary Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary Statistics</Text>
          <View style={{ flexDirection: "row", gap: 20, marginBottom: 10 }}>
            <Text>Total Submissions: {totalSubmissions}</Text>
            <Text>Approved: {approvedCount}</Text>
            <Text>Pending: {pendingCount}</Text>
          </View>
        </View>

        {/* Submissions Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Details</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCellHeader, { flex: 1.2 }]}>Name</Text>
              <Text style={[styles.tableCellHeader, { flex: 1.5 }]}>Email</Text>
              <Text style={[styles.tableCellHeader, { flex: 1 }]}>Country</Text>
              <Text style={[styles.tableCellHeader, { flex: 1.2 }]}>Education</Text>
              <Text style={[styles.tableCellHeader, { flex: 0.8 }]}>Test</Text>
              <Text style={[styles.tableCellHeader, { flex: 0.6 }]}>Score</Text>
              <Text style={[styles.tableCellHeader, { flex: 0.8 }]}>Status</Text>
              <Text style={[styles.tableCellHeader, { flex: 0.8 }]}>Date</Text>
            </View>

            {/* Table Rows */}
            {submissions.map((submission) => (
              <View key={submission.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1.2 }]}>
                  {submission.fullName}
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  {submission.email}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {submission.country}
                </Text>
                <Text style={[styles.tableCell, { flex: 1.2 }]}>
                  {submission.education}
                </Text>
                <Text style={[styles.tableCell, { flex: 0.8 }]}>
                  {submission.englishTest || "N/A"}
                </Text>
                <Text style={[styles.tableCell, { flex: 0.6 }]}>
                  {submission.eligibilityScore}%
                </Text>
                <Text style={[styles.tableCell, { flex: 0.8 }]}>
                  {submission.status}
                </Text>
                <Text style={[styles.tableCell, { flex: 0.8 }]}>
                  {submission.submittedAt
                    ? new Date(submission.submittedAt).toLocaleDateString()
                    : "N/A"}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © {new Date().getFullYear()} Canada Study Visa. All rights reserved. | Confidential
          Document
        </Text>
      </Page>
    </Document>
  );
}
