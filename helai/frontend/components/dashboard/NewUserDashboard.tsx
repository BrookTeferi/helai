import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Circle, HelpCircle, BookOpen, UserCircle, BrainCircuit, Layout, GraduationCap, Users, Award } from 'lucide-react'
import Link from 'next/link'
import Sidebar from './Sidebar'

interface DashboardProps {
  userName: string;
  nextSteps: string[];
  onboardingStatus: string;
  profileCompletion: number;
}

const stepIcons = {
  "Complete your profile": <UserCircle className="h-5 w-5" />,
  "Take the knowledge assessment": <BrainCircuit className="h-5 w-5" />,
  "Enroll in your first course": <BookOpen className="h-5 w-5" />,
  "Explore the dashboard": <Layout className="h-5 w-5" />,
  "Start learning": <GraduationCap className="h-5 w-5" />,
}

export default function NewUserDashboard({ userName, nextSteps, onboardingStatus, profileCompletion }: DashboardProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const toggleStep = (step: string) => {
    setCompletedSteps(prev => 
      prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step]
    )
  }

  const progress = (completedSteps.length / nextSteps.length) * 100

  return (
    <div className="flex bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <Card className="mb-8 bg-white bg-opacity-90 backdrop-blur-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center heading-gradient">
              <Award className="h-8 w-8 mr-2 text-yellow-500" />
              Welcome to HELAI, {userName}!
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Let's get started on your learning journey. Every journey starts with a single step. Let's take yours together!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary-700">Onboarding Progress</h3>
              <span className="text-sm font-medium text-primary-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full h-2 bg-primary-100" />
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-700">Next Steps</CardTitle>
              <CardDescription>Complete these steps to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {nextSteps.map((step, index) => (
                  <li key={index} className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mr-2"
                      onClick={() => toggleStep(step)}
                    >
                      {completedSteps.includes(step) ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </Button>
                    <span className="flex items-center text-primary-700">
                      {stepIcons[step as keyof typeof stepIcons]}
                      <span className="ml-2">{step}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-700">Quick Access</CardTitle>
              <CardDescription>Explore key areas of the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-primary-100">
                  <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:text-primary-700">Profile</TabsTrigger>
                  <TabsTrigger value="courses" className="data-[state=active]:bg-white data-[state=active]:text-primary-700">Courses</TabsTrigger>
                  <TabsTrigger value="community" className="data-[state=active]:bg-white data-[state=active]:text-primary-700">Community</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-primary-700">Your Profile</CardTitle>
                      <CardDescription>Complete your profile to personalize your experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress value={profileCompletion} className="w-full mb-2 h-2 bg-primary-100" />
                      <p className="text-sm text-gray-500">{profileCompletion}% Complete</p>
                      <Button className="mt-4 btn-primary">
                        <Link href="/profile">Complete Profile</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="courses">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-primary-700">Recommended Courses</CardTitle>
                      <CardDescription>Start with these beginner-friendly courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li>
                          <Link href="/courses/intro-to-ai" className="text-primary-600 hover:text-primary-700 hover:underline">Introduction to AI in Healthcare</Link>
                        </li>
                        <li>
                          <Link href="/courses/medical-ethics" className="text-primary-600 hover:text-primary-700 hover:underline">Medical Ethics and AI</Link>
                        </li>
                      </ul>
                      <Button className="mt-4 btn-primary">
                        <Link href="/courses">Browse All Courses</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="community">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-primary-700">Student Community</CardTitle>
                      <CardDescription>Connect with fellow learners</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Join discussion forums and study groups to enhance your learning experience.</p>
                      <Button className="mt-4 btn-primary">
                        <Link href="/community">Join Community</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Card className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-700">Platform Tour</CardTitle>
              <CardDescription>Get familiar with HELAI</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Take a guided tour to learn about key features of the platform.</p>
              <Button className="mt-4 btn-primary">Start Tour</Button>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary-700">Need Help?</CardTitle>
              <CardDescription>We're here to support you on your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <HelpCircle className="h-5 w-5 mr-2 text-primary-500" />
                <span>Have questions? Check out our FAQs or contact support.</span>
              </div>
              <Button className="btn-secondary">Get Help</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 bg-white bg-opacity-90 backdrop-blur-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary-700 flex items-center">
              <Users className="h-6 w-6 mr-2 text-primary-500" />
              Join the HELAI Community
            </CardTitle>
            <CardDescription>Connect with fellow learners and share your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Engage in discussions, join study groups, and collaborate on projects with students from around the world.</p>
            <Button className="mt-4 btn-primary">Explore Community</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

