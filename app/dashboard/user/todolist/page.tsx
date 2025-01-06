"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoaderCircleIcon } from "@/components/ui/loader-circle-icon"; // Ensure this path is correct and the component exists

// Zod schema for todo item
const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

type TodoFormData = z.infer<typeof todoSchema>;

const TodoListPage: React.FC = () => {
  const { data: session } = useSession();
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<any | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    if (!session) return;
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/users/${session?.user?.id}/todos`);
        setTodos(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [session]);

  const onSubmit = async (data: TodoFormData) => {
    try {
      const response = await api.post(
        `/api/users/${session?.user?.id}/todos`,
        data
      );
      if (response.data.success) {
        toast.success("Todo item added successfully");
        setTodos((prev) => [...prev, response.data.data]);
        reset();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleEdit = async (todo: any) => {
    setEditingTodo(todo);
  };

  const handleUpdate = async (data: TodoFormData) => {
    try {
      const response = await api.patch(
        `/api/users/${session?.user?.id}/todos/${editingTodo?.todoId}`,
        data
      );
      if (response.data.success) {
        toast.success("Todo item updated successfully");
        setTodos((prev) =>
          prev.map((todo) =>
            todo.todoId === editingTodo?.todoId ? response.data.data : todo
          )
        );
        setEditingTodo(null);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleDelete = async (todoId: string) => {
    try {
      const response = await api.delete(
        `/api/users/${session?.user?.id}/todos/${todoId}`
      );
      if (response.data.success) {
        toast.success("Todo item deleted successfully");
        setTodos((prev) => prev.filter((todo) => todo.todoId !== todoId));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Todo List</h1>
      <Card className="mb-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Add Todo Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                {...register("title")}
                placeholder="Enter todo title"
                className="w-full"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div>
              <Textarea
                {...register("description")}
                placeholder="Enter todo description"
                className="w-full"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <LoaderCircleIcon /> : "Add Todo"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div>
        {todos?.map((todo) => (
          <Card key={todo?.todoId} className="mb-4">
            <CardHeader>
              <CardTitle>{todo?.title}</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(todo)}
              >
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your todo item.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      onClick={() => handleDelete(todo?.todoId)}
                    >
                      Yes, Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardHeader>
            <CardContent>
              <p>{todo?.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingTodo && (
        <Dialog>
          <DialogTrigger>Edit Todo</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Todo Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <Input
                {...register("title")}
                defaultValue={editingTodo?.title}
                placeholder="Enter todo title"
                className="w-full"
              />
              <Textarea
                {...register("description")}
                defaultValue={editingTodo?.description}
                placeholder="Enter todo description"
                className="w-full"
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <LoaderCircleIcon /> : "Update Todo"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TodoListPage;