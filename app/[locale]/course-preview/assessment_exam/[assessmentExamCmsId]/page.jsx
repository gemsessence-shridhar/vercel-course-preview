import { fetchAssessmentExamData } from './fetchAssessmentExamData';
import QuestionAnswers from '@components/AssessmentExamPreview/QuestionAnswers';
import styles from '@components/AssessmentExamPreview/assessment-question.module.scss';
import classNames from 'classnames';

export default async function ExamWrapper({ params }) {
  const { locale, assessmentExamCmsId } = await params;
  const assessmentExamDataHash = await fetchAssessmentExamData(locale, assessmentExamCmsId);
  const { exam, questions } = assessmentExamDataHash;
  return (
    <div className="pb-5">
      <h3 className="text-lg font-bold text-gray-700 d-flex flex-wrap justify-content-between my-4">
        <div>Display Title: {exam.title}</div>
        <div>CMS ID: {assessmentExamCmsId}</div>
      </h3>
      <hr 
        className="border-2 border-dark"
        style={{ margin: '3rem 0', borderStyle: 'solid' }}
      />
      {questions.map((question, index, array) => (
        <div key={question.id} className={classNames(styles['content-container'], 'pb-4')}>
           <QuestionAnswers
              questionData={question}
              answersStyle={styles['answer-block']}
              questionsStyle={styles['question-block']}
              
            />

          {index < array.length - 1 && (
            <hr 
              className="border-2 border-dark"
              style={{ margin: '4rem 0', borderStyle: 'dashed' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
