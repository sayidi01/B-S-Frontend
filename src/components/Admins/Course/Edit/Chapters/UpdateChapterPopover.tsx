import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";

interface UpdateChapterPopoverProps {
  chapterId: string;
  currentTitle: string;
  onUpdate: (chapterId: string, title: string) => void;
  onClose: () => void;
}

export default function UpdateChapterPopover({
  chapterId,
  currentTitle,
  onUpdate,
  onClose,
}: UpdateChapterPopoverProps) {
  const [updatedTitle, setUpdatedTitle] = useState(currentTitle);

  const handleUpdateChapter = async () => {
    if (updatedTitle.trim()) {
      try {
       onUpdate(chapterId, updatedTitle);
        onClose();
      } catch (err) {
        console.error("Error updating chapter:", err);
        toast.error("Failed to update chapter");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <FaTimes
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer w-5 h-5"
          onClick={onClose}
        />

        <h2 className="text-xl font-semibold mb-4">Update chapter</h2>
        <input
          type="text"
          placeholder="Chapter Title"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 w-full"
          onClick={handleUpdateChapter}
        >
          Update
        </button>
      </div>
    </div>
  );
}