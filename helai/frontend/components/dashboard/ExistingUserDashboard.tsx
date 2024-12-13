import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, BarChart2, Users, Award } from 'lucide-react'
import Link from 'next/link'
import Sidebar from './Sidebar'

interface DashboardProps {
  userName: string;
  courseProgress: number;
  totalCourses: number;
  completedCourses: number;
}

export default function ExistingUserDashboard({ userName, courseProgress, totalCourses, completedCourses }: DashboardProps) {
  return (
    <div className="flex bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <Card className="mb-8 bg-white bg-opacity-90 backdrop-blur-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center heading-gradient">
              <Award className="h-8 w-8 mr-2 text-yellow-500" />
              Welcome back, {userName}!
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Continue your learning journey with HELAI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary-700">Overall Progress</h3>
              <span className="text-sm font-medium text-primary-600">{courseProgress}% Complete</span>
            </div>
            <Progress value={courseProgress} className="w-full h-2 bg-primary-100" />
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-700">Your Learning</CardTitle>
              <CardDescription>Track your progress and continue learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-600">{totalCourses}</p>
                  <p className="text-sm text-gray-600">Total Courses</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-600">{completedCourses}</p>
                  <p className="text-sm text-gray-600">Completed Courses</p>
                </div>
              </div>
              <Button className="w-full mt-6 btn-primary">
                <Link href="/courses">Continue Learning</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-700">Quick Access</CardTitle>
              <CardDescription>Jump back into your learning</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="courses" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-primary-100">
                  <TabsTrigger value="courses" className="data-[state=active]:bg-white data-[state=active]:text-primary-700">Courses</TabsTrigger>
                  <TabsTrigger value="progress" className="data-[state=active]:bg-white data-[state=active]:text-primary-700">Progress</TabsTrigger>
                  <TabsTrigger value="community" className="data-[state=active]:bg-white data-[state=active]:text-primary-700">Community</TabsTrigger>
                </TabsList>
                <TabsContent value="courses">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-primary-700">Your Courses</CardTitle>
                      <CardDescription>Continue where you left off</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li>
                          <Link href="/courses/ai-fundamentals" className="text-primary-600 hover:text-primary-700 hover:underline">AI Fundamentals</Link>
                        </li>
                        <li>
                          <Link href="/courses/medical-imaging" className="text-primary-600 hover:text-primary-700 hover:underline">AI in Medical Imaging</Link>
                        </li>
                      </ul>
                      <Button className="mt-4 btn-primary">
                        <Link href="/courses">View All Courses</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="progress">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-primary-700">Your Progress</CardTitle>
                      <CardDescription>Track your learning journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>You've completed {completedCourses} out of {totalCourses} courses.</p>
                      <Button className="mt-4 btn-primary">
                        <Link href="/progress">View Detailed Progress</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="community">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-primary-700">Community</CardTitle>
                      <CardDescription>Connect with fellow learners</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Join discussions and collaborate with peers.</p>
                      <Button className="mt-4 btn-primary">
                        <Link href="/community">Explore Community</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 bg-white bg-opacity-90 backdrop-blur-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary-700 flex items-center">
              <Users className="h-6 w-6 mr-2 text-primary-500" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Stay updated with the latest HELAI events</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>AI in Healthcare Webinar</span>
                <span className="text-sm text-gray-600">June 15, 2023</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Medical Ethics Workshop</span>
                <span className="text-sm text-gray-600">June 22, 2023</span>
              </li>
            </ul>
            <Button className="mt-4 btn-primary">View All Events</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

