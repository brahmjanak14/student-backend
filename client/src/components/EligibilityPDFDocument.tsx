import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 30,
    borderBottom: "3 solid #d32f2f",
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    color: "#d32f2f",
    marginBottom: 8,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  scoreSection: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    textAlign: "center",
  },
  scoreTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 5,
  },
  scoreLabel: {
    fontSize: 12,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderLeft: "4 solid #d32f2f",
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
    padding: 15,
    backgroundColor: "#f8f9fa",
  },
  summaryItem: {
    textAlign: "center",
    flex: 1,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 10,
    color: "#666",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
    paddingLeft: 10,
  },
  bullet: {
    width: 20,
    fontSize: 14,
  },
  listText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.5,
    color: "#444",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#999",
    fontSize: 9,
    borderTop: "1 solid #e0e0e0",
    paddingTop: 15,
  },
  footerBold: {
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 5,
  },
  statusBox: {
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  statusBoxEligible: {
    backgroundColor: "#d4edda",
    borderLeft: "4 solid #28a745",
  },
  statusBoxNotEligible: {
    backgroundColor: "#f8d7da",
    borderLeft: "4 solid #dc3545",
  },
  statusText: {
    fontSize: 14,
    lineHeight: 1.6,
  },
});

interface EligibilityPDFDocumentProps {
  score: number;
  isEligible: boolean;
  universities?: number;
  programs?: number;
}

export default function EligibilityPDFDocument({ 
  score, 
  isEligible,
  universities = 12,
  programs = 8
}: EligibilityPDFDocumentProps) {
  const scoreColor = score >= 70 ? "#28a745" : score >= 50 ? "#ffc107" : "#dc3545";
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Canada Study Visa Eligibility Report</Text>
          <Text style={styles.subtitle}>Pratham International</Text>
          <Text style={styles.subtitle}>
            Generated on {new Date().toLocaleDateString("en-US", { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>

        {/* Score Section */}
        <View style={styles.scoreSection}>
          <Text style={styles.scoreTitle}>Your Eligibility Score</Text>
          <Text style={[styles.scoreValue, { color: scoreColor }]}>
            {score}%
          </Text>
          <Text style={styles.scoreLabel}>
            {isEligible ? "You are eligible for Canada study visa!" : "Additional preparation needed"}
          </Text>
        </View>

        {/* Summary Grid */}
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: scoreColor }]}>{score}%</Text>
            <Text style={styles.summaryLabel}>Eligibility Score</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: "#007bff" }]}>{universities}</Text>
            <Text style={styles.summaryLabel}>Recommended Universities</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: "#6f42c1" }]}>{programs}</Text>
            <Text style={styles.summaryLabel}>Suitable Programs</Text>
          </View>
        </View>

        {/* Status Box */}
        <View style={[styles.statusBox, isEligible ? styles.statusBoxEligible : styles.statusBoxNotEligible]}>
          <Text style={styles.statusText}>
            {isEligible 
              ? "Congratulations! Based on your profile, you have a strong chance of obtaining a Canada study visa. Our team recommends proceeding with your application process."
              : "Your profile shows potential, but we recommend strengthening certain areas before applying. Our counselors can provide personalized guidance to improve your chances."}
          </Text>
        </View>

        {/* Key Strengths */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Key Strengths</Text>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>✓</Text>
            <Text style={styles.listText}>Strong academic performance and educational background</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>✓</Text>
            <Text style={styles.listText}>Demonstrated English language proficiency</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>✓</Text>
            <Text style={styles.listText}>Relevant work experience in your field</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>✓</Text>
            <Text style={styles.listText}>Financial capacity to support your studies</Text>
          </View>
        </View>

        {/* Recommended Next Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Next Steps</Text>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>1.</Text>
            <Text style={styles.listText}>Review the list of recommended universities that match your profile</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>2.</Text>
            <Text style={styles.listText}>Prepare all required documentation for your visa application</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>3.</Text>
            <Text style={styles.listText}>Schedule a free consultation with our certified immigration experts</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>4.</Text>
            <Text style={styles.listText}>Begin your university application process with our guided assistance</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>5.</Text>
            <Text style={styles.listText}>Attend our pre-departure orientation for Canada-bound students</Text>
          </View>
        </View>

        {/* Important Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Information</Text>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>
              This assessment is based on the information provided and serves as a preliminary evaluation
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>
              Final eligibility is determined by Canadian immigration authorities and universities
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>
              We recommend consulting with our experts for a comprehensive profile assessment
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBold}>Pratham International</Text>
          <Text>Expert Immigration & Education Consultancy</Text>
          <Text>Phone: +91-9876543210 | Email: info@prathaminternational.com</Text>
          <Text>www.prathaminternational.com</Text>
        </View>
      </Page>
    </Document>
  );
}
