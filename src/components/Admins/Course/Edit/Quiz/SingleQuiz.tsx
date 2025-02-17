import { useParams } from 'react-router-dom';
import UseFetchSingleQuiz from '../../../../../hooks/api/Quiz/UseFetchSingleQuiz';
import { Spin, Card, Typography, Radio } from 'antd';

const { Title, Text } = Typography;

function SingleQuiz() {
  const { quizID, id: courseID } = useParams<{ quizID: string; id: string }>();
  const { isLoading, error, quizData } = UseFetchSingleQuiz(courseID as string, quizID as string);

  if (isLoading) {
    return <Spin tip="Loading Quiz..." style={{ marginTop: '20px' }} />;
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
        <Card key={index} title={`Question ${index + 1}`} style={{ marginBottom: '20px' }}>
          <Text strong>{question.question}</Text>
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