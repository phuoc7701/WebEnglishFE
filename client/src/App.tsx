import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "./UserContext";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// User Pages

import MockTestList from "./pages/MockTestList";
import UpgradePage  from "./pages/Update";
import PaymentSuccess from "./pages/PaymentSuccess"
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LessonView from './pages/LessonView';
import Login from './pages/Login';
import Register from './pages/Register';
import LessonList from './pages/LessonList';
import Vocabulary from './pages/Vocabulary';
import UserProfileInfo from './pages/UserProfileInfo';
import WritingPractice from './pages/WritingPractice';
import ListeningPractice from './pages/ListeningPractice';
import SpeakingPractice from './pages/SpeakingPractice';
import ForgotPassword from './pages/ForgotPassword';
import ChangePass from './pages/ChangePass';
import MockTest from './pages/MockTest';

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AdminCourses from "./pages/admin/Courses";
import CourseForm from "./pages/admin/CourseForm";
import AdminLessons from "./pages/admin/Lessons";
import LessonForm from "./pages/admin/LessonForm";
import AdminTests from "./pages/admin/Tests";
import TestForm from "./pages/admin/TestForm";
import AdminUsers from "./pages/admin/Users";
import TestDetail from "./pages/admin/TestForm/TestDetail"
import TestPart from "./pages/admin/TestForm/TestPart"
import TestEdit from "./pages/admin/TestForm/TestEdit"

// Not Found
import NotFound from "./pages/not-found";
import { LogIn } from "lucide-react";

import MomoPayment from "./pages/MomoPayment";

function App() {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("roleAdmin") === "true"
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <UserProvider>
          <Router>
            <Routes>
              {/* User Routes */}
              {!isAdmin && (
                <Route path="/" element={<UserLayout />}>
                  <Route index element={<Home />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="courses/:id" element={<CourseDetail />} />
                  <Route path="lessons/:id" element={<LessonView />} />
                  <Route
                    path="lessons/type/:type/level/:level"
                    element={<LessonList />}
                  />
                  <Route path="courses/vocabulary" element={<Vocabulary />} />
                  <Route path="profile" element={<UserProfileInfo />} />
                  <Route path="practice/writing" element={<WritingPractice />} />
                  <Route path="speaking" element={<SpeakingPractice />} />
                  <Route path="tests/:id" element={<MockTest />} />
                  <Route path="tests" element={<MockTestList />} />
                  <Route path="changepass" element={<ChangePass />} />
                  {/* <Route path="newpass" element={<NewPass />} /> */}
                  <Route path="update" element={<UpgradePage />} />
                  <Route path="update/payment-success" element={<PaymentSuccess />} />
                  <Route path="update/momo-payment" element={<MomoPayment />} />
                  <Route path="*" element={<NotFound />} />
              </Route>
              )}

              {/* Admin Routes */}
              {isAdmin && (
                <Route path="/admin" element={<AdminLayout />}>
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
                  <Route path="profile" element={<UserProfileInfo />} />
                  <Route path="changepass" element={<ChangePass />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              )}

              {/* Redirect based on current view */}
              <Route path="/login" element={<Login toggleView={setIsAdmin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpass" element={<ForgotPassword />} />
              {/* <Route 
                path="*" 
                element={isAdmin ? <Navigate to="/admin" /> : <Navigate to="/" />} 
              /> */}

              {isAdmin && (
                <Route path="/" element={<AdminLayout />}>
                  <Route path="*" element={<NotFound />} />
                </Route>
              )}
            </Routes>
          </Router>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
