import React, { useState } from "react";

export default function PronunciationModal({ result, onClose }) {
  if (!result) return null;

  return (

    <div
      className="fixed inset-0 z-50 flex items-center justify-center text-gray-800"
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Kết quả đánh giá phát âm</h2>

        {typeof result === "object" ? (
          <>
            <div className="flex items-center justify-center mb-4">
              <span className="text-xl font-semibold mr-2 text-blue-600">Điểm:</span>
              <span className="text-3xl font-bold text-green-600">{result.score}</span>
              <span className="ml-2 text-gray-500">/ 100</span>
            </div>
            <div className="prose prose-sm mx-auto bg-gray-50 p-4 rounded overflow-auto max-h-[45vh]">
              <div dangerouslySetInnerHTML={{ __html: result.feedback }} />
            </div>
          </>
        ) : (
          <div className="text-center text-red-500 italic mt-6">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}