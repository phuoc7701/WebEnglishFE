import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { courses, lessons as allLessons } from '../mockData';

const LessonView = () => {
  const { id } = useParams();
  const lessonId = parseInt(id);
  
  // Find the lesson and its course
  let foundLesson = null;
  let courseId = null;
  
  for (const [cId, courseLessons] of Object.entries(allLessons)) {
    const lesson = courseLessons.find(l => l.id === lessonId);
    if (lesson) {
      foundLesson = lesson;
      courseId = parseInt(cId);
      break;
    }
  }
  
  const course = courseId ? courses.find(c => c.id === courseId) : null;
  const courseLessons = courseId ? allLessons[courseId] || [] : [];
  
  // For navigation between lessons
  const currentLessonIndex = courseLessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentLessonIndex > 0 ? courseLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < courseLessons.length - 1 ? courseLessons[currentLessonIndex + 1] : null;
  
  const [activeTab, setActiveTab] = useState('video');
  const [lessonCompleted, setLessonCompleted] = useState(foundLesson?.completed || false);

  if (!foundLesson || !course) {
    return (
      <div className="container my-5 text-center">
        <i className="bi bi-exclamation-circle fs-1 text-muted mb-3 d-block"></i>
        <h2>Lesson Not Found</h2>
        <p className="text-muted mb-4">The lesson you're looking for does not exist or has been removed.</p>
        <Link to="/courses" className="btn btn-primary">Back to Courses</Link>
      </div>
    );
  }

  const handleMarkComplete = () => {
    setLessonCompleted(true);
    // Here you would typically update this in a database
    // But for this mock implementation, we'll just update the local state
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        {/* Sidebar with lesson list */}
        <div className="col-md-3 border-end" style={{ height: 'calc(100vh - 70px)', overflowY: 'auto' }}>
          <div className="p-3 border-bottom bg-light">
            <Link to={`/courses/${courseId}`} className="d-flex align-items-center text-decoration-none text-dark">
              <i className="bi bi-arrow-left me-2"></i>
              <h5 className="mb-0 fw-bold">{course.title}</h5>
            </Link>
          </div>
          <div className="list-group list-group-flush">
            {courseLessons.map((lesson, index) => (
              <Link 
                to={`/lessons/${lesson.id}`} 
                className={`list-group-item list-group-item-action ${lesson.id === lessonId ? 'active bg-primary' : ''}`}
                key={lesson.id}
              >
                <div className="d-flex align-items-center">
                  <div className={`rounded-circle ${lesson.id === lessonId ? 'bg-white text-primary' : 'bg-light text-dark'} d-flex justify-content-center align-items-center me-3`} style={{ width: "28px", height: "28px" }}>
                    <span className="small fw-medium">{index + 1}</span>
                  </div>
                  <div>
                    <h6 className="mb-0">{lesson.title}</h6>
                    <small className={lesson.id === lessonId ? 'text-white-50' : 'text-muted'}>{lesson.duration}</small>
                  </div>
                </div>
                {lesson.completed && (
                  <i className={`bi bi-check-circle-fill ${lesson.id === lessonId ? 'text-white' : 'text-secondary'} ms-auto`}></i>
                )}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Main content area */}
        <div className="col-md-9" style={{ height: 'calc(100vh - 70px)', overflowY: 'auto' }}>
          <div className="p-4">
            <h1 className="mb-4">{foundLesson.title}</h1>
            
            {/* Tabs */}
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'video' ? 'active' : ''}`}
                  onClick={() => setActiveTab('video')}
                >
                  Video Lesson
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'transcript' ? 'active' : ''}`}
                  onClick={() => setActiveTab('transcript')}
                >
                  Transcript
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'practice' ? 'active' : ''}`}
                  onClick={() => setActiveTab('practice')}
                >
                  Practice
                </button>
              </li>
            </ul>
            
            {/* Tab content */}
            {activeTab === 'video' && (
              <div>
                <div className="ratio ratio-16x9 mb-4 bg-dark d-flex align-items-center justify-content-center">
                  <div className="text-center text-white">
                    <i className="bi bi-play-circle fs-1 mb-3"></i>
                    <h5>Video content would be displayed here</h5>
                    <p className="text-white-50">Duration: {foundLesson.duration}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <h3>Lesson Overview</h3>
                  <p>{foundLesson.description}</p>
                </div>
              </div>
            )}
            
            {activeTab === 'transcript' && (
              <div>
                <h3 className="mb-3">Lesson Transcript</h3>
                <div className="card">
                  <div className="card-body">
                    <p>
                      Hello and welcome to {foundLesson.title}. In this lesson, we'll explore 
                      {course.level === "Beginner" 
                        ? " the foundational concepts of English language." 
                        : course.level === "Intermediate" 
                          ? " more advanced English language structures and vocabulary."
                          : " complex English language patterns and nuanced expression."
                      }
                    </p>
                    <p>
                      {foundLesson.description} This is extremely important for developing your English proficiency.
                    </p>
                    <p>
                      Throughout this lesson, we'll cover several key points and provide examples to help you understand
                      the concepts better. Let's begin with the first point...
                    </p>
                    <p>
                      [This would be the full transcript of the video lesson content]
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'practice' && (
              <div>
                <h3 className="mb-4">Practice Exercises</h3>
                <div className="card mb-4">
                  <div className="card-header bg-light fw-bold">Exercise 1: Multiple Choice</div>
                  <div className="card-body">
                    <p className="mb-3">Select the correct answer for each question:</p>
                    
                    <div className="mb-4">
                      <p className="fw-medium">1. What is the main topic of this lesson?</p>
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="radio" name="q1" id="q1a" />
                        <label className="form-check-label" htmlFor="q1a">
                          English pronunciation
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="radio" name="q1" id="q1b" />
                        <label className="form-check-label" htmlFor="q1b">
                          {foundLesson.title}
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="radio" name="q1" id="q1c" />
                        <label className="form-check-label" htmlFor="q1c">
                          English writing
                        </label>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="fw-medium">2. Why is this lesson important?</p>
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="radio" name="q2" id="q2a" />
                        <label className="form-check-label" htmlFor="q2a">
                          It helps with basic conversations
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="radio" name="q2" id="q2b" />
                        <label className="form-check-label" htmlFor="q2b">
                          It's required for the test
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="radio" name="q2" id="q2c" />
                        <label className="form-check-label" htmlFor="q2c">
                          It improves overall English proficiency
                        </label>
                      </div>
                    </div>
                    
                    <button className="btn btn-primary">Check Answers</button>
                  </div>
                </div>
                
                <div className="card">
                  <div className="card-header bg-light fw-bold">Exercise 2: Fill in the Blanks</div>
                  <div className="card-body">
                    <p className="mb-3">Complete the sentences by filling in the blanks:</p>
                    
                    <div className="mb-3">
                      <p>1. The ________ of this lesson is to improve your understanding of {foundLesson.title.toLowerCase()}.</p>
                      <input type="text" className="form-control" placeholder="Enter your answer" />
                    </div>
                    
                    <div className="mb-4">
                      <p>2. In English, it's important to practice ________ to improve fluency.</p>
                      <input type="text" className="form-control" placeholder="Enter your answer" />
                    </div>
                    
                    <button className="btn btn-primary">Check Answers</button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation and completion buttons */}
            <div className="d-flex justify-content-between mt-5">
              <div>
                {prevLesson && (
                  <Link to={`/lessons/${prevLesson.id}`} className="btn btn-outline-primary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Previous Lesson
                  </Link>
                )}
              </div>
              <div className="d-flex gap-2">
                {!lessonCompleted ? (
                  <button 
                    className="btn btn-success"
                    onClick={handleMarkComplete}
                  >
                    Mark as Complete
                  </button>
                ) : (
                  <button 
                    className="btn btn-outline-success" 
                    disabled
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Completed
                  </button>
                )}
                
                {nextLesson ? (
                  <Link to={`/lessons/${nextLesson.id}`} className="btn btn-primary">
                    Next Lesson
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                ) : (
                  <Link to={`/courses/${courseId}`} className="btn btn-primary">
                    Finish Course
                    <i className="bi bi-flag ms-2"></i>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
