import type { Submission } from './schema';

interface EligibilityResult {
  score: number;
  isEligible: boolean;
  strengths: string[];
  weaknesses: string[];
  suggestion: string;
}

export function calculateEligibilityScore(submission: Partial<Submission>): EligibilityResult {
  let score = 0;
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  const educationScore = calculateEducationScore(submission, strengths, weaknesses);
  const languageScore = calculateLanguageScore(submission, strengths, weaknesses);
  const workScore = calculateWorkExperienceScore(submission, strengths, weaknesses);
  const financialScore = calculateFinancialScore(submission, strengths, weaknesses);

  score = educationScore + languageScore + workScore + financialScore;

  score = Math.min(Math.max(score, 0), 100);

  const isEligible = score >= 60;
  const suggestion = generateSuggestion(score, weaknesses);

  return {
    score,
    isEligible,
    strengths,
    weaknesses,
    suggestion,
  };
}

function calculateEducationScore(
  submission: Partial<Submission>,
  strengths: string[],
  weaknesses: string[]
): number {
  let score = 0;
  const { education, educationGrade, gradeType } = submission;

  if (education === 'phd') {
    score += 35;
    strengths.push('Exceptional academic credentials (PhD)');
  } else if (education === 'master') {
    score += 30;
    strengths.push('Strong academic background (Master\'s degree)');
  } else if (education === 'bachelor') {
    score += 25;
    
    if (educationGrade && gradeType) {
      const grade = parseFloat(educationGrade);
      if (gradeType === 'cgpa') {
        if (grade >= 8.5) {
          score += 5;
          strengths.push(`Excellent Bachelor's CGPA (${grade})`);
        } else if (grade >= 7.0) {
          score += 3;
          strengths.push(`Good Bachelor's CGPA (${grade})`);
        } else if (grade >= 6.0) {
          score += 1;
          weaknesses.push(`Bachelor's CGPA could be higher (${grade}/10)`);
        } else {
          weaknesses.push(`Low Bachelor's CGPA (${grade}/10) - consider academic improvement`);
        }
      } else {
        if (grade >= 75) {
          score += 5;
          strengths.push(`Excellent Bachelor's performance (${grade}%)`);
        } else if (grade >= 60) {
          score += 3;
          strengths.push(`Good Bachelor's performance (${grade}%)`);
        } else {
          weaknesses.push(`Bachelor's grade could be higher (${grade}%)`);
        }
      }
    }
  } else if (education === '12th') {
    score += 20;
    
    if (educationGrade) {
      const grade = parseFloat(educationGrade);
      if (grade >= 85) {
        score += 5;
        strengths.push(`Excellent academic performance (${grade}% in 12th)`);
      } else if (grade >= 70) {
        score += 3;
        strengths.push(`Good academic performance (${grade}% in 12th)`);
      } else if (grade >= 60) {
        score += 1;
        weaknesses.push(`12th grade could be stronger (${grade}%)`);
      } else {
        weaknesses.push(`Low 12th grade (${grade}%) - may need foundation programs`);
      }
    }
  } else if (education === '10th') {
    score += 15;
    weaknesses.push('Minimum education qualification - consider completing 12th');
  }

  return score;
}

function calculateLanguageScore(
  submission: Partial<Submission>,
  strengths: string[],
  weaknesses: string[]
): number {
  let score = 0;
  const { hasLanguageTest, languageTest, ieltsScore } = submission;

  if (hasLanguageTest === 'yes' && languageTest && ieltsScore) {
    const overallScore = parseFloat(ieltsScore);
    
    if (languageTest === 'ielts') {
      if (overallScore >= 7.5) {
        score += 30;
        strengths.push(`Excellent IELTS score (Overall ${overallScore})`);
      } else if (overallScore >= 6.5) {
        score += 25;
        strengths.push(`Strong IELTS score (Overall ${overallScore})`);
      } else if (overallScore >= 6.0) {
        score += 20;
        strengths.push(`Good IELTS score (Overall ${overallScore})`);
      } else if (overallScore >= 5.5) {
        score += 15;
        weaknesses.push(`IELTS score acceptable but could be higher (${overallScore})`);
      } else {
        score += 10;
        weaknesses.push(`Low IELTS score (${overallScore}) - retake recommended`);
      }
    } else if (languageTest === 'toefl') {
      if (overallScore >= 100) {
        score += 30;
        strengths.push(`Excellent TOEFL score (${overallScore})`);
      } else if (overallScore >= 90) {
        score += 25;
        strengths.push(`Strong TOEFL score (${overallScore})`);
      } else if (overallScore >= 80) {
        score += 20;
        strengths.push(`Good TOEFL score (${overallScore})`);
      } else {
        score += 15;
        weaknesses.push(`TOEFL score could be improved (${overallScore})`);
      }
    } else if (languageTest === 'pte') {
      if (overallScore >= 70) {
        score += 30;
        strengths.push(`Excellent PTE score (${overallScore})`);
      } else if (overallScore >= 60) {
        score += 25;
        strengths.push(`Strong PTE score (${overallScore})`);
      } else if (overallScore >= 50) {
        score += 20;
        strengths.push(`Good PTE score (${overallScore})`);
      } else {
        score += 15;
        weaknesses.push(`PTE score needs improvement (${overallScore})`);
      }
    }
  } else {
    // No language test provided - this is a critical requirement
    score += 0;
    weaknesses.push('No English language test provided - IELTS/TOEFL/PTE required for admission');
  }

  return score;
}

function calculateWorkExperienceScore(
  submission: Partial<Submission>,
  strengths: string[],
  weaknesses: string[]
): number {
  let score = 0;
  const { hasWorkExperience, workExperienceYears } = submission;

  if (hasWorkExperience === 'yes' && workExperienceYears) {
    const years = parseInt(workExperienceYears);
    
    if (years >= 5) {
      score += 15;
      strengths.push(`Extensive work experience (${years} years)`);
    } else if (years >= 3) {
      score += 12;
      strengths.push(`Good work experience (${years} years)`);
    } else if (years >= 1) {
      score += 10;
      strengths.push(`Relevant work experience (${years} year${years > 1 ? 's' : ''})`);
    } else {
      score += 5;
      strengths.push('Some work experience');
    }
  } else {
    score += 5;
  }

  return score;
}

function calculateFinancialScore(
  submission: Partial<Submission>,
  strengths: string[],
  weaknesses: string[]
): number {
  let score = 0;
  const { financialCapacity } = submission;

  if (financialCapacity === 'above-60') {
    score += 20;
    strengths.push('Excellent financial capacity (Above 60 Lakhs)');
  } else if (financialCapacity === '40-60') {
    score += 17;
    strengths.push('Strong financial capacity (40-60 Lakhs)');
  } else if (financialCapacity === '20-40') {
    score += 14;
    strengths.push('Adequate financial capacity (20-40 Lakhs)');
  } else if (financialCapacity === 'below-20') {
    score += 10;
    weaknesses.push('Limited financial capacity - consider education loans');
  } else {
    score += 10;
  }

  return score;
}

function generateSuggestion(score: number, weaknesses: string[]): string {
  if (score >= 85) {
    return 'Excellent! You have a very strong profile for Canada study visa. Your application is highly competitive.';
  } else if (score >= 75) {
    return 'Great! You have a strong profile for Canada study visa. Focus on the minor improvements mentioned to maximize your chances.';
  } else if (score >= 65) {
    return 'Good! You have a solid profile for Canada study visa. Consider addressing the areas for improvement to strengthen your application.';
  } else if (score >= 55) {
    return 'You have potential for Canada study visa. We strongly recommend working on the areas mentioned to improve your chances significantly.';
  } else {
    return 'Your profile needs improvement before applying. Our counselors can provide personalized guidance to strengthen your application.';
  }
}
