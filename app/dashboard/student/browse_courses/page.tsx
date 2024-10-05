'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/authContext';

const BrowseCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [paymentDetails, setPaymentDetails] = useState({ amount: '', paymentMethod: '' });
  const [enrollmentMessage, setEnrollmentMessage] = useState<string>('');
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
      setIsLoading(false);
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: any) => {
    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: authUser?.id,
          courseId,
          payment: paymentDetails,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setEnrollmentMessage('Enrollment successful!');
      } else {
        setEnrollmentMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setEnrollmentMessage('Failed to enroll. Please try again.');
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      {isLoading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {courses?.map((course) => (
            <Card key={course.id} className="p-4">
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{course.description}</p>
                <p className="mt-2">Price: ${course.price}</p>
                <p className="mt-2">Tutor: {course.tutor.name}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mt-4">View Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{course.title}</DialogTitle>
                    </DialogHeader>
                    <div className="p-4 space-y-4">
                      <p>{course.description}</p>
                      <p>Zoom Link: <a href={course.zoomLink} target="_blank" rel="noopener noreferrer">{course.zoomLink}</a></p>
                      <div>
                        <h4>Available Slots:</h4>
                        {course.slots?.map((slot: any, index: number) => (
                          <p key={index}>{new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}</p>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" value={paymentDetails.amount} onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value })} />

                        <Label htmlFor="payment-method">Payment Method</Label>
                        <Input id="payment-method" value={paymentDetails.paymentMethod} onChange={(e) => setPaymentDetails({ ...paymentDetails, paymentMethod: e.target.value })} />
                      </div>
                      <Button onClick={() => handleEnroll(course.id)}>Enroll</Button>
                      {enrollmentMessage && <p>{enrollmentMessage}</p>}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};

export default BrowseCoursesPage;