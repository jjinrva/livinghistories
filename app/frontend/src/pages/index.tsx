// frontend/src/pages/index.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Shield, Sparkles, ArrowRight, Library, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Navigation />
      
      {/* Hero Section - Library Theme */}
      <section className="relative pt-20 pb-32 px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[url('/library-pattern.svg')] bg-repeat"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Historical Education
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your
                <span className="text-amber-600 block">History Classroom</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Step into our digital library where students engage in authentic conversations 
                with historical figures. From Clara Barton's medical insights to Frederick Douglass's 
                powerful speeches, bring history to life through AI-powered dialogue.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg"
                >
                  <Link href="/login">
                    Enter the Library
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-3 text-lg"
                >
                  <Link href="#demo">
                    Explore Demo
                  </Link>
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">Trusted by educators at:</p>
                <div className="flex flex-wrap gap-6 text-gray-400">
                  <div className="text-sm font-medium">Metro School District</div>
                  <div className="text-sm font-medium">Innovation Academy</div>
                  <div className="text-sm font-medium">History Teachers Association</div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 shadow-2xl">
                <div className="absolute top-4 left-4">
                  <Library className="w-8 h-8 text-amber-600" />
                </div>
                
                {/* Book Spines Illustration */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="h-32 w-8 bg-red-500 rounded-sm shadow-md"></div>
                    <div className="h-28 w-8 bg-blue-600 rounded-sm shadow-md"></div>
                    <div className="h-36 w-8 bg-green-600 rounded-sm shadow-md"></div>
                    <div className="h-30 w-8 bg-purple-600 rounded-sm shadow-md"></div>
                    <div className="h-34 w-8 bg-yellow-600 rounded-sm shadow-md"></div>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-amber-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">CB</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Clara Barton</h4>
                        <p className="text-sm text-gray-600">Civil War Nurse</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 italic">
                      "I remember the battlefield hospitals where we saved countless lives..."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Your Digital History Library
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every feature designed to create authentic historical learning experiences 
              while maintaining the highest educational standards.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-amber-600 mb-4" />
                <CardTitle className="text-xl">Authentic Characters</CardTitle>
                <CardDescription>
                  50+ historically accurate AI personalities based on extensive primary source research.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="w-12 h-12 text-amber-600 mb-4" />
                <CardTitle className="text-xl">Curriculum Aligned</CardTitle>
                <CardDescription>
                  Seamlessly integrates with state standards and existing lesson plans.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-amber-600 mb-4" />
                <CardTitle className="text-xl">Safe & Monitored</CardTitle>
                <CardDescription>
                  Advanced safety systems with real-time teacher oversight and FERPA compliance.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-amber-600 mb-4" />
                <CardTitle className="text-xl">Teacher Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive monitoring tools, assignment creation, and student progress tracking.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Sparkles className="w-12 h-12 text-amber-600 mb-4" />
                <CardTitle className="text-xl">Engaging Dialogue</CardTitle>
                <CardDescription>
                  Students build historical knowledge through natural conversation and inquiry.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Library className="w-12 h-12 text-amber-600 mb-4" />
                <CardTitle className="text-xl">Rich Resources</CardTitle>
                <CardDescription>
                  Access to primary sources, historical context, and supplementary materials.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="demo" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How Living Histories Works
            </h2>
            <p className="text-xl text-gray-600">
              [PLACEHOLDER: Detailed explanation of how the platform works, student experience, 
              teacher benefits, and educational outcomes. This section will include screenshots, 
              demo videos, and step-by-step walkthroughs once you provide the content.]
            </p>
          </div>
          
          {/* Demo placeholder */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Library className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive Demo</h3>
                <p className="text-gray-600">Experience a conversation with a historical character</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-amber-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your History Classroom?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Join forward-thinking educators who are bringing history to life with AI-powered conversations.
          </p>
          
          <Button 
            asChild
            size="lg" 
            className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            <Link href="/login">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Library className="w-6 h-6 mr-2 text-amber-400" />
                Living Histories
              </h3>
              <p className="text-gray-400">
                AI-powered historical education platform bringing the past to life.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Demo</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white">Support</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Living Histories, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}