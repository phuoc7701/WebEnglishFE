import { useState } from 'react';
import { Link } from 'react-router-dom';
import { writingPractices, speakingPractices, tests } from '../mockData';

const Practice = () => {
  const [activeTab, setActiveTab] = useState('writing');

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">Practice Your English Skills</h1>
        <p className="text-muted mx-auto" style={{ maxWidth: "800px" }}>
          Enhance your English proficiency through targeted practice exercises across different skill areas.
        </p>
      </div>

      {/* Practice Type Tabs */}
      <ul className="nav nav-pills nav-fill mb-5">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'writing' ? 'active' : ''}`}
            onClick={() => setActiveTab('writing')}
          >
            <i className="bi bi-pen me-2"></i>
            Writing Practice
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'speaking' ? 'active' : ''}`}
            onClick={() => setActiveTab('speaking')}
          >
            <i className="bi bi-mic me-2"></i>
            Speaking Practice
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            <i className="bi bi-clipboard-check me-2"></i>
            Tests
          </button>
        </li>
      </ul>

      {/* Writing Practice */}
      {activeTab === 'writing' && (
        <div>
          <div className="alert alert-info d-flex align-items-center mb-4" role="alert">
            <i className="bi bi-info-circle-fill me-2"></i>
            <div>
              Writing practice helps you improve your grammar, vocabulary, and communication skills. Try to complete at least one exercise daily.
            </div>
          </div>

          <div className="row g-4">
            {writingPractices.map(practice => (
              <div className="col-md-6 col-lg-4" key={practice.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">{practice.level}</span>
                      <span className="text-muted small">
                        <i className="bi bi-clock me-1"></i>
                        {practice.duration}
                      </span>
                    </div>
                    <h3 className="h5 fw-bold mb-3">{practice.title}</h3>
                    <p className="text-muted mb-4">{practice.description}</p>
                    <button className="btn btn-primary w-100">Start Practice</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Speaking Practice */}
      {activeTab === 'speaking' && (
        <div>
          <div className="alert alert-warning d-flex align-items-center mb-4" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <div>
              Speaking practice requires a microphone. Please ensure your device has microphone access enabled.
            </div>
          </div>

          <div className="row g-4">
            {speakingPractices.map(practice => (
              <div className="col-md-6 col-lg-4" key={practice.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">{practice.level}</span>
                      <span className="text-muted small">
                        <i className="bi bi-clock me-1"></i>
                        {practice.duration}
                      </span>
                    </div>
                    <h3 className="h5 fw-bold mb-3">{practice.title}</h3>
                    <p className="text-muted mb-4">{practice.description}</p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-primary flex-grow-1">
                        <i className="bi bi-play-circle me-2"></i>
                        Sample
                      </button>
                      <button className="btn btn-primary flex-grow-1">
                        <i className="bi bi-mic me-2"></i>
                        Practice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tests */}
      {activeTab === 'tests' && (
        <div>
          <div className="alert alert-secondary d-flex align-items-center mb-4" role="alert">
            <i className="bi bi-lightbulb-fill me-2"></i>
            <div>
              Tests help assess your progress and identify areas for improvement. Complete these tests to track your learning journey.
            </div>
          </div>

          <div className="row g-4">
            {tests.map(test => (
              <div className="col-md-6" key={test.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="h5 fw-bold mb-3">{test.title}</h3>
                    <p className="text-muted mb-4">{test.description}</p>
                    
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <span className="badge bg-light text-dark">
                        <i className="bi bi-question-circle me-1"></i>
                        {test.questions.length} questions
                      </span>
                      <span className="badge bg-light text-dark">
                        <i className="bi bi-clock me-1"></i>
                        {test.duration}
                      </span>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to={`/courses/${test.courseId}`} className="btn btn-link text-decoration-none px-0">
                        View Course
                      </Link>
                      <button className="btn btn-primary">
                        Start Test
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Practice;
