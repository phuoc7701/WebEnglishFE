import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// User Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LessonView from './pages/LessonView';
import Login from './pages/Login';
import Register from './pages/Register';
import Grammar from './pages/Grammar';
import Vocabulary from './pages/Vocabulary';
import UserProfileInfo from './pages/UserProfileInfo';
import ReadingPractice from './pages/ReadingPractice';
import ListeningPractice from './pages/ListeningPractice';
import MockTest from './pages/MockTest';



// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import AdminCourses from './pages/admin/Courses';
import CourseForm from './pages/admin/CourseForm';
import AdminLessons from './pages/admin/Lessons';
import LessonForm from './pages/admin/LessonForm';
import AdminTests from './pages/admin/Tests';
import TestForm from './pages/admin/TestForm';
import AdminUsers from './pages/admin/Users';


// Not Found
import NotFound from './pages/not-found';
import { LogIn } from 'lucide-react';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleView = () => {
    setIsAdmin(prev => !prev);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            {/* User Routes */}
            {!isAdmin && (
              <Route path="/" element={<UserLayout toggleView={toggleView} />}>
                <Route index element={<Home />} />
                <Route path="courses" element={<Courses />} />
                <Route path="courses/:id" element={<CourseDetail />} />
                <Route path="lessons/:id" element={<LessonView />} />
                <Route path="courses/grammar" element={<Grammar />} />
                <Route path="courses/vocabulary" element={<Vocabulary />} />
                <Route path="profile" element={<UserProfileInfo />} />
                <Route path="reading" element={<ReadingPractice />} />
                <Route path="listening" element={<ListeningPractice />} />
                <Route path="test" element={<MockTest />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            )}

            {/* Admin Routes */}
            {isAdmin && (
              <Route path="/admin" element={<AdminLayout toggleView={toggleView} />}>
                <Route index element={<Dashboard />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="courses/new" element={<CourseForm />} />
                <Route path="courses/edit/:id" element={<CourseForm />} />
                <Route path="lessons" element={<AdminLessons />} />
                <Route path="lessons/new" element={<LessonForm />} />
                <Route path="lessons/edit/:id" element={<LessonForm />} />
                <Route path="tests" element={<AdminTests />} />
                <Route path="tests/new" element={<TestForm />} />
                <Route path="tests/edit/:id" element={<TestForm />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            )}

            {/* Redirect based on current view */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="*" 
              element={isAdmin ? <Navigate to="/admin" /> : <Navigate to="/" />} 
            />
            
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
