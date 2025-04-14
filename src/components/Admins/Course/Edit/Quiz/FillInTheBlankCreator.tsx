import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { QuizItem } from './quiz.types';

interface FillInTheBlankCreatorProps {
    items: QuizItem[];
    setItems: (items: QuizItem[]) => void;
  }

const FillInTheBlankCreator: React.FC<FillInTheBlankCreatorProps> = ({ items, setItems }) => {
  const [quizItems, setQuizItems] = useState<QuizItem[]>([]);

  const handleAddBlank = () => {
    setQuizItems(prev => [
      ...prev,
      {
        id: uuidv4(),
        type: 'blank',
        correctOption: '',
        options: [''],
      },
    ]);
  };

  const handleAddPhrase = () => {
    setQuizItems(prev => [
      ...prev,
      {
        id: uuidv4(),
        type: 'phrase',
        text: '',
      },
    ]);
  };

  const updateItem = (id: string, updatedItem: Partial<QuizItem>) => {
    setQuizItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updatedItem } as QuizItem : item
      )
    );
  };

  const updateOption = (id: string, optionIndex: number, value: string) => {
    setQuizItems(prev =>
      prev.map(item =>
        item.id === id && item.type === 'blank'
          ? {
              ...item,
              options: item.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : item
      )
    );
  };

  const addOption = (id: string) => {
    setQuizItems(prev =>
      prev.map(item =>
        item.id === id && item.type === 'blank'
          ? {
              ...item,
              options: [...item.options, ''],
            }
          : item
      )
    );
  };
  return (
    <div style={{ padding: 20 }}>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: 20 }}>
        <button
          onClick={handleAddBlank}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#45a049')}
          onFocus={e => (e.currentTarget.style.backgroundColor = '#45a049')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#4CAF50')}
          onBlur={e => (e.currentTarget.style.backgroundColor = '#4CAF50')}
        >
          ➕ Add Blank
        </button>

        <button
          onClick={handleAddPhrase}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#1e88e5')}
          onFocus={e => (e.currentTarget.style.backgroundColor = '#1e88e5')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2196F3')}
          onBlur={e => (e.currentTarget.style.backgroundColor = '#2196F3')}
        >
          ✏️ Add Phrase
        </button>
      </div>

      <div>
        {quizItems.map(item => (
          <div key={item.id} style={{ marginBottom: 20, padding: 10, border: '1px solid #ccc', borderRadius: '6px' }}>
            {item.type === 'phrase' ? (
              <input
                type="text"
                value={item.text}
                onChange={e => updateItem(item.id, { text: e.target.value })}
                placeholder="Enter phrase..."
                style={{ width: '100%', padding: 8 }}
              />
            ) : (
              <>
                <input
                  type="text"
                  value={item.correctOption}
                  onChange={e => updateItem(item.id, {  correctOption: e.target.value })}
                  placeholder="Correct Option..."
                  style={{ width: '100%', padding: 8 }}
                />
                <div style={{ marginTop: 10 }}>
                  <strong>Options:</strong>
                  {item.options.map((opt, idx) => (
                    <div key={`${item.id}-option-${idx}`} style={{ marginTop: 5 }}>
                      <input
                        type="text"
                        value={opt}
                        onChange={e => updateOption(item.id, idx, e.target.value)}
                        placeholder={`Option ${idx + 1}`}
                        style={{ width: '80%', padding: 6 }}
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => addOption(item.id)}
                    style={{
                      marginTop: 10,
                      padding: '6px 12px',
                      backgroundColor: '#f0ad4e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    ➕ Add Option
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default FillInTheBlankCreator;