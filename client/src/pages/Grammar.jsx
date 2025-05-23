// File: GrammarTopics.jsx
import React, { useState } from 'react';

const topics = [
  { id: 1, title: 'Liệt kê và tương phản', link: '/nguphap/1' },
  { id: 2, title: 'Cấu trúc thời gian', link: '/nguphap/2' },
  { id: 3, title: 'Năng lực và khả năng', link: '/nguphap/3' },
  { id: 4, title: 'Yêu cầu và bổn phận', link: '/nguphap/4' },
  { id: 5, title: 'Hy vọng và ước muốn', link: '/nguphap/5' },
  { id: 6, title: 'Nguyên nhân và kết quả', link: '/nguphap/6' },
  { id: 7, title: 'Mạo từ', link: '/nguphap/7' },
  { id: 8, title: 'Từ quan hệ', link: '/nguphap/8' },
  { id: 9, title: 'Phân từ và động từ', link: '/nguphap/9' },
  { id: 10, title: 'Câu điều kiện', link: '/nguphap/10' },
  { id: 11, title: 'Câu gián tiếp', link: '/nguphap/11' },
  { id: 12, title: 'Động từ khuyết thiếu', link: '/nguphap/12' },
  // ... thêm bao nhiêu chủ đề tuỳ bạn
];

const PAGE_SIZE = 6;

const GrammarTopics = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(topics.length / PAGE_SIZE);

  const startIdx = (page - 1) * PAGE_SIZE;
  const currentTopics = topics.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">NGỮ PHÁP LÝ THUYẾT</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTopics.map(topic => (
          <a
            key={topic.id}
            href={topic.link}
            className="block bg-white rounded-xl overflow-hidden border hover:shadow-lg transition"
          >
            {/* Thẻ hình ảnh có thể thay bằng background-image */}
            <div className="h-40 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
              <span className="text-lg font-semibold text-gray-800">ÔN TẬP NGỮ PHÁP</span>
            </div>
            <div className="p-4">
              <p className="text-xl font-bold text-gray-900">{topic.id}, {topic.title}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-white border disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`
              px-4 py-2 rounded border
              ${page === num
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 hover:bg-blue-50'}
            `}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded bg-white border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GrammarTopics;
