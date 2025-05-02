import { useParams } from 'react-router-dom';
import UseFetchSingleQuiz from '../../../../../hooks/api/Quiz/UseFetchSingleQuiz';
import { Spin, Card, Typography, Radio } from 'antd';

const { Title, Text } = Typography;

function SingleQuiz() {
  const { quizID, id: courseID } = useParams<{ quizID: string; id: string }>();
  const { isLoading, error, quizData } = UseFetchSingleQuiz(courseID as string, quizID as string);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin tip="Loading Quiz...">
          <div style={{ height: '100px' }} /> 
        </Spin>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quizData) {
    return <div>No Quiz data Found.</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Quiz Details
      </Title>
      {quizData.questions.map((question, index) => (
        
        <Card key={index} title={`Question ${index + 1}`} style={{ marginBottom: '20px' }} >
         <Text strong style={{ display: 'block' }}> Type:  {question.type}</Text>
         <Text strong style={{ display: 'block' }}> Question : {question.question}</Text>
         <Text strong style={{ display: 'block' }}> <span style={{ color: 'green' }}>✅ (Correct Answer)</span> :  {question.correctAnswer}</Text>
         {question.type === "matching" ? (
            <div>
              {question.matchingPairs?.map((pair, pairIndex) => (
                <Text key={pairIndex} style={{ display: 'block' }}>
                  {pair.left} - {pair.right}
                </Text>
              ))}
            </div>
          ) : question.type === "fill_in_the_blank" ? (
            <div>
              {question.fillTheBlank?.map((blank, blankIndex) => (
                <div key={blankIndex} style={{ marginBottom: '10px' }}>
                  {blank.type === "phrase" ? (
                    <Text style={{ fontWeight: 'bold' }}>{blank.text}</Text>
                  ) : (
                    <Text>______ (Options: {blank.options.join(", ")})</Text>
                  )}
                  {blank.type === "blank" && (
                    <Text style={{ color: 'green', display: 'block' }}>
                      {' '}(Correct Answer: {blank.correctOption})
                    </Text>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Text strong style={{ display: 'block' }}>
              {/* <span style={{ color: 'green' }}>✅ (Correct Answer)</span>: {question.correctAnswer} */}
            </Text>
          )}

          <Radio.Group
            style={{ marginTop: '10px' }}
            disabled 
          >
            {question.options?.map((option, optionIndex) => (
              <Radio key={optionIndex} value={option.text}>
                {option.text}{' '}
                {option.isCorrect && <span style={{ color: 'green' }}>✅ (Correct Answer)</span>}
              </Radio>
            ))}
          </Radio.Group>
          
        </Card>
      ))}
    </div>
  );
}

export default SingleQuiz;