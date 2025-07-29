import React from 'react';
import {
  Leaf,
  Cloud,
  Droplet,
  Shield,
  Sprout,
  Zap,
  ArrowRight,
} from 'lucide-react';
import NumberAnimation from '../components/NumberAnimation';

export default function SustainabilityPage() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen font-sans text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[700px] sm:h-[800px] lg:h-[900px] flex items-center justify-center text-white hero-clip-path-v2 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-zoom-in"
          style={{
            backgroundImage:
              "url('https://raw.githubusercontent.com/Solved-Overnight/arvana-clothing/refs/heads/main/img/sustainability/Sustainable.jpg')",
          }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-900/50 to-transparent backdrop-blur-sm opacity-90" />
        <div className="absolute inset-0 bg-pattern-green opacity-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-left max-w-2xl animate-fade-in-left-stagger">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg animate-text-reveal-stagger">
              Our Commitment <br /> to a Greener Future
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-xl mb-10 drop-shadow-md animate-text-reveal-stagger-2">
              Driving sustainable change through innovation and responsible practices.
            </p>
            <a
              href="#our-initiatives"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold shadow-lg bg-green-200 text-green-900 hover:bg-green-300 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 animate-pulse-button animate-fade-in-left-stagger-3"
            >
              Explore Our Initiatives
              <ArrowRight className="ml-3 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28">
        {/* Numbers Section */}
        <section className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-green-100 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-12">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Zap className="text-green-600" />, label: 'Renewable Energy Use', value: 75, color: 'green' },
              { icon: <Cloud className="text-blue-600" />, label: 'Carbon Footprint Reduction', value: 30, color: 'blue' },
              { icon: <Droplet className="text-teal-600" />, label: 'Water Recycled', value: 50, color: 'teal' },
              { icon: <Sprout className="text-purple-600" />, label: 'Sustainable Materials', value: 60, color: 'purple' },
            ].map(({ icon, label, value, color }, index) => (
              <div key={index} className={`flex flex-col items-center p-6 bg-${color}-50 rounded-xl shadow-md`}>
                <div className="w-12 h-12 mb-4">{icon}</div>
                <p className={`text-4xl font-extrabold text-${color}-800 mb-2`}>
                  <NumberAnimation target={value} suffix="%" />
                </p>
                <p className="text-lg text-gray-700">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Initiatives Section Header */}
        <section id="our-initiatives" className="text-center space-y-6 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-700">Our Core Sustainability Initiatives</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We are dedicated to integrating sustainable practices across our entire value chain, focusing on key areas to minimize our environmental footprint and maximize social impact.
          </p>
        </section>

        {/* Sustainability Sections */}
        {[
          {
            title: 'Sustainable Fibers',
            icon: <Sprout className="text-yellow-600" />,
            color: 'yellow-800',
            image: 'SustainableProduct.jpg',
            points: [
              'Utilizing recycled polyester and nylon.',
              'Innovating with bio-based and blended materials.',
              'Reducing reliance on water-intensive crops.',
            ],
            text: 'Increasing the use of recycled, manmade, and blended fibers to reduce water consumption and environmental impact compared to traditional materials.',
          },
          {
            title: 'Renewable Energy',
            icon: <Zap className="text-green-600" />,
            color: 'green-800',
            image: 'WareHouse.jpg',
            points: [
              'Investing in on-site solar panels.',
              'Purchasing certified green energy.',
              'Optimizing energy efficiency in facilities.',
            ],
            text: 'Powering our operations with clean, renewable sources like solar and wind energy to reduce reliance on fossil fuels and lower carbon emissions.',
          },
          {
            title: 'Carbon Footprint Reduction',
            icon: <Cloud className="text-blue-600" />,
            color: 'blue-800',
            image: 'CarbonFootPrint.jpg',
            reverse: true,
            points: [
              'Optimizing transportation routes.',
              'Adopting low-carbon manufacturing processes.',
              'Promoting remote work and digital solutions.',
            ],
            text: 'Implementing strategies to significantly decrease greenhouse gas emissions across our supply chain, from production to logistics.',
          },
          {
            title: 'Effluent & Water Treatment',
            icon: <Droplet className="text-teal-600" />,
            color: 'teal-800',
            image: 'ETP.png',
            points: [
              'Closed-loop water recycling systems.',
              'Strict adherence to discharge standards.',
              'Reducing fresh water intake.',
            ],
            text: 'Implementing advanced water treatment systems to purify wastewater and minimize water consumption in our manufacturing processes.',
          },
          {
            title: 'Safe & Green Working Environment',
            icon: <Shield className="text-purple-600" />,
            color: 'purple-800',
            image: 'SafeWorkSpace.png',
            reverse: true,
            points: [
              'Ergonomic workstations and safety training.',
              'Green building certifications.',
              'Waste segregation and recycling programs.',
            ],
            text: 'Ensuring a healthy, safe, and environmentally conscious workplace for all employees, promoting well-being and sustainable practices.',
          },
        ].map((section, index) => (
          <section
            key={index}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up ${
              section.reverse ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className="animate-fade-in-left">
              <img
                src={`https://raw.githubusercontent.com/Solved-Overnight/arvana-clothing/refs/heads/main/img/sustainability/${section.image}`}
                alt={section.title}
                className={`rounded-3xl shadow-xl border transform hover:scale-[1.02] transition-transform duration-500 border-${section.color.split('-')[0]}-200`}
              />
            </div>
            <div className="text-gray-700 animate-fade-in-right">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 mr-4">{section.icon}</div>
                <h3 className={`text-3xl font-bold text-${section.color}`}>{section.title}</h3>
              </div>
              <p className="text-lg leading-relaxed mb-4">{section.text}</p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-600">
                {section.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="text-center bg-white py-16 px-8 rounded-3xl shadow-xl border border-green-100 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-6">
            Partner with ARVANA for a Greener Business
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Are you a business looking to integrate sustainable practices into your supply chain? ARVANA offers eco-conscious products and ethical partnerships that align with your values. Let's build a sustainable future together.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full shadow-lg bg-green-600 text-white hover:bg-green-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 animate-pulse-button"
          >
            Contact Our B2B Team
            <Leaf className="ml-3 h-5 w-5" />
          </a>
        </section>
      </main>
    </div>
  );
}
