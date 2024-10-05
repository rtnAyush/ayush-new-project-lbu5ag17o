'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";

const EnrolledCoursesPage: React.FC = () => {
  const { authUser } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/student/${authUser?.id}/enrollments`);
        const data = await response.json();
        if (response.ok) {
          setCourses(data.enrollments);
        } else {
          setErrorMessage('Failed to retrieve courses.');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setErrorMessage('An error occurred. Please try again.');
      }
      setLoading(false);
    };

    fetchEnrolledCourses();
  }, [authUser]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Enrolled Courses</h1>
      {loading && <p>Loading...</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {courses.length === 0 && !loading && !errorMessage && <p>No courses enrolled.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((course: any) => (
          <Card key={course.course_id} className="mb-4">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => window.open(course.zoom_link, '_blank')}>
                Join Class
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCoursesPage;