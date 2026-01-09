// src/components/About.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Users,
  Globe,
  Heart,
  Shield,
  Truck,
  Clock,
  Sparkles,
  TrendingUp,
  Target,
  Star,
  ArrowRight,
  Play,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Leaf,
  ShoppingBag,
  Smile,
  Rocket,
  Briefcase,
  Calendar,
  Globe2,
  Eye,
  Users2,
  ShieldCheck,
  Trophy,
  Gem,
  Package,
  Truck as Delivery,
  Headphones,
  Smartphone,
  BookOpen
} from "lucide-react";

const About = () => {
  const [activeTab, setActiveTab] = useState("story");
  const [activeTeam, setActiveTeam] = useState(null);
  const [activeYear, setActiveYear] = useState("2024");

  const teamMembers = [
    {
      id: 1,
      name: "Alex Chen",
      role: "CEO & Founder",
      image:
        "https://i.pinimg.com/736x/f6/61/ea/f661ea61616909838a9fbfeda0d2ea14.jpg",
      bio: "Former tech executive with 15+ years in e-commerce.",
      skills: ["Leadership", "Strategy", "Innovation"]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Chief Design Officer",
      image:
        "https://i.pinimg.com/736x/39/6c/74/396c741c3d37ad0199ac220d16169e3e.jpg",
      bio: "Award-winning designer focused on user-centric experiences.",
      skills: ["UI/UX", "Branding", "Product Design"]
    }
  ];

  const milestones = [
    { year: "2018", title: "Company Founded", icon: <Rocket /> },
    { year: "2020", title: "Series A Funding", icon: <TrendingUp /> },
    { year: "2024", title: "Sustainability Initiative", icon: <Leaf /> }
  ];

  const stats = [
    { label: "Happy Customers", value: "2.5M+", icon: <Smile /> },
    { label: "Products", value: "50K+", icon: <Package /> },
    { label: "Countries", value: "50+", icon: <Globe2 /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/30">
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 4V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        <div className="relative container mx-auto px-6 py-24 text-center text-white">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Our Story Since 2018</span>
          </div>

          <h1 className="text-5xl font-bold mb-6">
            More Than Just
            <span className="block text-yellow-300">An Online Store</span>
          </h1>

          <p className="text-xl max-w-2xl mx-auto mb-8">
            We build meaningful shopping experiences with technology and trust.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:scale-105 transition"
          >
            <ShoppingBag className="w-5 h-5" />
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="container mx-auto px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <div className="mb-3 text-blue-600">{s.icon}</div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex gap-3 mb-10">
          {[
            { id: "story", label: "Our Story", icon: <BookOpen size={16} /> },
            { id: "team", label: "Our Team", icon: <Users size={16} /> },
            { id: "journey", label: "Journey", icon: <TrendingUp size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* STORY */}
        {activeTab === "story" && (
          <div className="max-w-3xl text-lg text-gray-600">
            <p>
              Founded in 2018, our mission is to make premium technology
              accessible for everyone through trust, innovation, and design.
            </p>
          </div>
        )}

        {/* TEAM */}
        {activeTab === "team" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map(m => (
              <div
                key={m.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <img src={m.image} alt={m.name} />
                <div className="p-5">
                  <h3 className="font-bold text-xl">{m.name}</h3>
                  <p className="text-sm text-gray-500">{m.role}</p>
                  <p className="text-gray-600 mt-2">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* JOURNEY */}
        {activeTab === "journey" && (
          <div className="space-y-6">
            {milestones.map(m => (
              <div
                key={m.year}
                onClick={() => setActiveYear(m.year)}
                className={`p-5 rounded-xl border cursor-pointer ${
                  activeYear === m.year
                    ? "border-blue-600 shadow"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  {m.icon}
                  <strong>{m.year}</strong>
                </div>
                <p className="text-gray-600">{m.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CONTACT */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Let’s Build Something Amazing
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold"
          >
            <Mail className="w-5 h-5" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
