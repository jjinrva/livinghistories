// frontend/src/components/Navigation.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Library, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Library className="w-8 h-8 text-amber-600" />
            <span className="text-xl font-bold text-gray-900">Living Histories</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-amber-600 transition-colors">
              Features
            </Link>
            <Link href="#demo" className="text-gray-600 hover:text-amber-600 transition-colors">
              Demo
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-amber-600 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-amber-600 transition-colors">
              About
            </Link>
          </div>
          
          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              asChild
              variant="outline" 
              className="border-amber-600 text-amber-600 hover:bg-amber-50"
            >
              <Link href="/login">Login</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber-200">
            <div className="flex flex-col space-y-4">
              <Link 
                href="#features" 
                className="text-gray-600 hover:text-amber-600 transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#demo" 
                className="text-gray-600 hover:text-amber-600 transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Demo
              </Link>
              <Link 
                href="#pricing" 
                className="text-gray-600 hover:text-amber-600 transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-amber-600 transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="px-4 pt-4">
                <Button 
                  asChild
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}