// frontend/src/pages/dashboard.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Library, Users, BookOpen, MessageSquare, Settings, 
  Plus, Search, Filter, Eye, Play, BarChart3,
  Clock, CheckCircle, AlertTriangle, User
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { CharacterLibrary } from '@/components/dashboard/CharacterLibrary';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    activeStudents: 24,
    totalConversations: 156,
    averageEngagement: 8.7,
    completedAssignments: 18
  };

  const recentActivity = [
    {
      id: 1,
      studentName: "Sarah Johnson",
      character: "Clara Barton",
      activity: "Completed conversation about Civil War medicine",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      studentName: "Mike Chen",
      character: "Frederick Douglass",
      activity: "Started discussion on abolition movement", 
      time: "4 hours ago",
      status: "in_progress"
    },
    {
      id: 3,
      studentName: "Emma Davis",
      character: "Benjamin Franklin",
      activity: "Asked about scientific discoveries",
      time: "6 hours ago",
      status: "needs_review"
    }
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: "Civil War Medicine Discussion",
      character: "Clara Barton",
      dueDate: "Tomorrow",
      studentsCompleted: 12,
      totalStudents: 24
    },
    {
      id: 2,
      title: "Founding Fathers Debate",
      character: "Benjamin Franklin",
      dueDate: "Friday",
      studentsCompleted: 3,
      totalStudents: 24
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening in your history classroom.</p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4 mr-2" />
              New Assignment
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStats stats={stats} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Student Activity</CardTitle>
                  <CardDescription>Latest interactions and conversations</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.studentName}</p>
                          <p className="text-sm text-gray-600">
                            Chatting with <span className="font-medium">{activity.character}</span>
                          </p>
                          <p className="text-sm text-gray-500">{activity.activity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          activity.status === 'completed' ? 'default' :
                          activity.status === 'in_progress' ? 'secondary' : 'destructive'
                        }>
                          {activity.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {activity.status === 'in_progress' && <Clock className="w-3 h-3 mr-1" />}
                          {activity.status === 'needs_review' && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {activity.status.replace('_', ' ')}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Assignments Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Assignments</CardTitle>
                <CardDescription>Track assignment progress and due dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAssignments.map((assignment) => (
                    <div key={assignment.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                          <p className="text-sm text-gray-600">Character: {assignment.character}</p>
                        </div>
                        <Badge variant="outline">Due {assignment.dueDate}</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{assignment.studentsCompleted}/{assignment.totalStudents} completed</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-amber-600 h-2 rounded-full" 
                              style={{ width: `${(assignment.studentsCompleted / assignment.totalStudents) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="ml-4">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Character Library Quick Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Library className="w-5 h-5 mr-2 text-amber-600" />
                  Character Library
                </CardTitle>
                <CardDescription>Available historical figures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Clara Barton", era: "Civil War", interactions: 45 },
                    { name: "Frederick Douglass", era: "Abolition", interactions: 38 },
                    { name: "Benjamin Franklin", era: "Colonial", interactions: 52 },
                    { name: "Harriet Tubman", era: "Underground Railroad", interactions: 29 }
                  ].map((character, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{character.name}</p>
                        <p className="text-xs text-gray-600">{character.era}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{character.interactions} chats</p>
                        <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                          <Play className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  <Library className="w-4 h-4 mr-2" />
                  Browse All Characters
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Assignment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Students
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>

            {/* Class Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Class Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Students</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active This Week</span>
                    <span className="font-medium text-green-600">22</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg. Session Time</span>
                    <span className="font-medium">12 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Engagement Score</span>
                    <div className="flex items-center">
                      <span className="font-medium text-amber-600">8.7/10</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}