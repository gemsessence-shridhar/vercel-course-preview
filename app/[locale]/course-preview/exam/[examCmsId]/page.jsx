import { fetchExamData } from './fetchExamData';
import QuestionAnswer from '@components/ExamPreview/QuestionAnswer';

export default async function ExamWrapper({ params }) {
  const { locale, examCmsId } = await params;
  const examDataHash = await fetchExamData(locale, examCmsId);
  return (
    <div className="pb-5">
      <h3 className="text-lg font-bold text-gray-700 d-flex flex-wrap justify-content-between my-4">
        <div>Display Title: {examDataHash.displayTitle}</div>
        <div>CMS ID: {examCmsId}</div>
      </h3>
      <hr 
        className="border-2 border-dark"
        style={{ margin: '3rem 0', borderStyle: 'solid' }}
      />
      {examDataHash.questionsAnswersData.map((questionAnswerData, index, array) => (
        <div key={questionAnswerData.id}>
          <QuestionAnswer
            questionId={questionAnswerData.id}
            question={questionAnswerData.question}
            questionType={questionAnswerData.questionType}
            answers={questionAnswerData.answers}
            imageConnection={examDataHash.imageConnection}
            associatedContent={examDataHash.associatedContent}
          />

          {index < array.length - 1 && (
            <hr 
              className="border-2 border-dark"
              style={{ margin: '6rem 0', borderStyle: 'dashed' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
