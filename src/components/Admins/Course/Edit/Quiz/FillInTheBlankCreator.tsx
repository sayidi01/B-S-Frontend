import React from "react";
import { v4 as uuidv4 } from "uuid";
import { QuizItem } from "./quiz.types";

interface FillInTheBlankCreatorProps {
  items: QuizItem[];
  updateItems: (items: QuizItem[]) => void;
}

const FillInTheBlankCreator: React.FC<FillInTheBlankCreatorProps> = ({
  items,
  updateItems,
}) => {
  const handleAddBlank = () => {
    const updatedItems: QuizItem[] = [
      ...items,
      {
        id: uuidv4(),
        type: "blank",
        correctOption: "",
        options: [],
      },
    ];
    updateItems(updatedItems);
  };

  const handleRemoveBlank = (id: string) => {
    const updatedItems: QuizItem[] = items.filter((item) => item.id !== id);
    updateItems(updatedItems);
  };

  const handleRemovePhrase = (id: string) => {
    const updatedItems: QuizItem[] = items.filter((item) => item.id !== id);
    updateItems(updatedItems);
  };
  const handleRemoveOption = (id: string, optionIndex: number) => {
    const updatedItems: QuizItem[] = items.map((item) =>
      item.id === id && item.type === "blank"
        ? {
            ...item,
            options: item.options.filter((_, idx) => idx !== optionIndex),
          }
        : item
    );
    updateItems(updatedItems);
  };

  const handleAddPhrase = () => {
    const updatedItems: QuizItem[] = [
      ...items,
      {
        id: uuidv4(),
        type: "text",
        text: "",
      },
    ];
    updateItems(updatedItems);
  };

  const updateItem = (id: string, updatedItem: Partial<QuizItem>) => {
    const updatedItems: QuizItem[] = items.map((item) =>
      item.id === id ? ({ ...item, ...updatedItem } as QuizItem) : item
    );
    updateItems(updatedItems);
  };

  const updateOption = (id: string, optionIndex: number, value: string) => {
    const updatedItems: QuizItem[] = items.map((item) =>
      item.id === id && item.type === "blank"
        ? {
            ...item,
            options: item.options.map((opt, idx) =>
              idx === optionIndex ? value : opt
            ),
          }
        : item
    );
    updateItems(updatedItems);
  };

  const addOption = (id: string) => {
    const updatedItems: QuizItem[] = items.map((item) =>
      item.id === id && item.type === "blank"
        ? {
            ...item,
            options: [...item.options, ""],
          }
        : item
    );

    updateItems(updatedItems);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: 20 }}>
        <button
          onClick={handleAddBlank}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#45a049")
          }
          onFocus={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#4CAF50")
          }
          onBlur={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
        >
          ➕ Add Blank
        </button>

        <button
          onClick={handleAddPhrase}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#1e88e5")
          }
          onFocus={(e) => (e.currentTarget.style.backgroundColor = "#1e88e5")}
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#2196F3")
          }
          onBlur={(e) => (e.currentTarget.style.backgroundColor = "#2196F3")}
        >
          ✏️ Add Phrase
        </button>
      </div>

      <div>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              marginBottom: 20,
              padding: 10,
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            {item.type === "text" ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) =>
                    updateItem(item.id, { text: e.target.value })
                  }
                  placeholder="Enter phrase..."
                  style={{ width: "100%", padding: 8 }}
                />
                <button
                  onClick={() => handleRemovePhrase(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#d9534f",
                    marginLeft: 8,
                  }}
                  title="Remove phrase"
                >
                  🗑️
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 8 }}>
                  <label
                    style={{
                      fontWeight: "bold",
                      marginBottom: 4,
                      display: "block",
                    }}
                  >
                    Correct option:
                  </label>
                  <input
                    type="text"
                    value={item.correctOption}
                    onChange={(e) =>
                      updateItem(item.id, { correctOption: e.target.value })
                    }
                    placeholder="Enter the correct option"
                    style={{ width: "100%", padding: 6, marginBottom: 10 }}
                  />
                  <button
                    onClick={() => handleRemoveBlank(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                      color: "#d9534f",
                    }}
                    title="Remove blank"
                  >
                    🗑️ Remove Blank
                  </button>
                </div>

                <div style={{ marginTop: 10 }}>
                  {item.options.map((opt, idx) => (
                    <div
                      key={`${item.id}-option-${idx}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 5,
                      }}
                    >
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          updateOption(item.id, idx, e.target.value)
                        }
                        placeholder={`Option ${idx + 1}`}
                        style={{ width: "80%", padding: 6 }}
                      />
                      <button
                        onClick={() => handleRemoveOption(item.id, idx)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "18px",
                          color: "#d9534f",
                          marginLeft: 8,
                        }}
                        title="Remove option"
                      >
                        🗑
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => addOption(item.id)}
                    style={{
                      marginTop: 10,
                      padding: "6px 12px",
                      backgroundColor: "#f0ad4e",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
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
