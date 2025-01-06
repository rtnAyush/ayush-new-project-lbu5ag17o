'use client' ;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, ArrowRight, User } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl xl:text-7xl/none">
                    Simplify Your Tasks with Our Todo App
                  </h1>
                  <p className="max-w-[600px] md:text-xl">
                    Organize your life effortlessly with our intuitive and powerful todo application.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Get Started
                  </Button>
                  <Button className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Learn More
                  </Button>
                </div>
              </div>
              <img
                src="https://placehold.co/600x400.png"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the powerful features that make our todo app the best choice for managing your tasks.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="flex flex-col items-center justify-center space-y-4">
                <User className="h-12 w-12" />
                <CardHeader>
                  <CardTitle className="text-lg font-bold">User-Friendly Interface</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Navigate through your tasks with an intuitive and clean interface.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center justify-center space-y-4">
                <Check className="h-12 w-12" />
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Efficient Task Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Organize, prioritize, and track your tasks with ease.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center justify-center space-y-4">
                <ArrowRight className="h-12 w-12" />
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Seamless Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Integrate with your favorite tools for a seamless workflow.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">FAQs</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions? We've got answers.
                </p>
              </div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I create a new task?</AccordionTrigger>
                  <AccordionContent>
                    To create a new task, simply click on the "Add Task" button and fill in the details.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I prioritize my tasks?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can prioritize your tasks by assigning them different levels of importance.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Testimonials</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our satisfied users.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs text-muted-foreground">Product Manager</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "This todo app has transformed the way I manage my tasks. It's incredibly easy to use!"
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Sarah Miller</p>
                      <p className="text-xs text-muted-foreground">Software Engineer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "I can't imagine going back to my old system. This app is a game-changer!"
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Michael Johnson</p>
                      <p className="text-xs text-muted-foreground">Designer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The seamless integration with my tools is fantastic. Highly recommend!"
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <Button variant="link">Features</Button>
            <Button variant="link">Integrations</Button>
            <Button variant="link">Pricing</Button>
            <Button variant="link">Security</Button>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Button variant="link">About Us</Button>
            <Button variant="link">Careers</Button>
            <Button variant="link">Blog</Button>
            <Button variant="link">Contact</Button>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Button variant="link">Documentation</Button>
            <Button variant="link">Help Center</Button>
            <Button variant="link">Community</Button>
            <Button variant="link">Templates</Button>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Button variant="link">Privacy Policy</Button>
            <Button variant="link">Terms of Service</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;