import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type TestItem = {
  id: string;
  title: string;
  description: string;
  duration: number;
};

const TestList: React.FC = () => {
  const [tests, setTests] = useState<TestItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/engzone/tests`, {
        headers: { Authorization: `Bearer ${token}` 
      },
        });
        setTests(res.data);
      } catch (err) {
        setError('Không thể lấy dữ liệu bài test.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tests.map((test) => (
        <div key={test.id} className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold mb-1">
            <Link to={`/tests/${test.id}`}>
              {test.title}
            </Link>
          </h2>
          <p className="text-sm text-gray-600 mb-2">{test.description}</p>
          <p className="text-sm">🕒 Thời lượng: {test.duration} phút</p>
        </div>
      ))}
    </div>
  );
};

export default TestList;
