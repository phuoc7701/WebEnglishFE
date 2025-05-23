import { useState } from 'react';
import CourseCard from '../components/CourseCard';
import { courses } from '../mockData';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  // Filter courses based on search term and level filter
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || course.level.toLowerCase() === levelFilter.toLowerCase();
    
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">Ngữ pháp</h1>
        <p className="text-muted mx-auto" style={{ maxWidth: "800px" }}>
          Browse our comprehensive range of English courses designed to help you improve your language skills at any level.
        </p>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <select 
            className="form-select" 
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Course listings */}
      <div className="row g-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div className="col-md-6 col-lg-4" key={course.id}>
              <CourseCard course={course} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <i className="bi bi-search fs-1 text-muted mb-3 d-block"></i>
            <h3>No courses found</h3>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
