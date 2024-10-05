'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DateTimePicker from '@/components/ui/date-picker';
import { useAuth } from "@/context/authContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ManageCoursesPage: React.FC = () => {
  const { authUser } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    zoom_link: '',
    price: 0,
    class_slots: [{ start_datetime: '', end_datetime: '' }],
  });
  const [selectedDates, setSelectedDates] = useState<{ start: Date | undefined, end: Date | undefined }>({ start: undefined, end: undefined });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/tutor/${authUser?.id}/courses`);
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
      setLoading(false);
    };

    fetchCourses();
  }, [authUser]);

  const handleAddSlot = () => {
    setForm({
      ...form,
      class_slots: [...form.class_slots, { start_datetime: '', end_datetime: '' }],
    });
  };

  const handleRemoveSlot = (index: number) => {
    const slots = [...form.class_slots];
    slots.splice(index, 1);
    setForm({ ...form, class_slots: slots });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/users/tutor/${authUser?.id}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Course created successfully!');
        // Refresh or update course list here
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error creating course:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">My Courses</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create a New Course</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Course Title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Input id="description" name="description" value={form.description} onChange={handleChange} placeholder="Course Description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zoom_link">Zoom Link</Label>
              <Input id="zoom_link" name="zoom_link" value={form.zoom_link} onChange={handleChange} placeholder="Zoom Link" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" />
            </div>
            <div className="space-y-2">
              <Label>Class Slots</Label>
              {form.class_slots.map((slot, index) => (
                <div key={index} className="flex space-x-2">
                  <DateTimePicker
                    date={selectedDates.start}
                    setDate={(date: any) => setSelectedDates({ ...selectedDates, start: date })}
                  />
                  <DateTimePicker
                    date={selectedDates.end}
                    setDate={(date: any) => setSelectedDates({ ...selectedDates, end: date })}
                  />
                  <Button variant="outline" onClick={() => handleRemoveSlot(index)}>Remove</Button>
                </div>
              ))}
              <Button variant="outline" onClick={handleAddSlot}>Add Slot</Button>
            </div>
            <div className="flex space-x-4">
              <Button type="submit" disabled={loading}>Save Course</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses?.map(course => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>${course.price}</TableCell>
                  <TableCell>
                    <Button variant="outline">Edit</Button>
                    <Button variant="outline">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageCoursesPage;