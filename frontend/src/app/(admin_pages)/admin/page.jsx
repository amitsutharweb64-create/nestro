// app/admin/page.jsx
'use client';

import { useState } from 'react';
import { 
  ShoppingBag, Users, Package, TrendingUp, 
  Eye, ShoppingCart, Star, Clock, 
  ChevronRight, Download, Filter, 
  MoreVertical, CreditCard, Truck,
  ArrowUp, ArrowDown, DollarSign
} from 'lucide-react';

export default function AdminDashboard() {
  const [period, setPeriod] = useState('today');

  // Stats Data
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$48,295', 
      change: '+12.5%', 
      icon: DollarSign, 
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      trend: 'up'
    },
    { 
      title: 'Total Orders', 
      value: '1,284', 
      change: '+8.2%', 
      icon: ShoppingBag, 
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      trend: 'up'
    },
    { 
      title: 'Total Customers', 
      value: '5,643', 
      change: '+23.1%', 
      icon: Users, 
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      trend: 'up'
    },
    { 
      title: 'Products', 
      value: '847', 
      change: '-2.4%', 
      icon: Package, 
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      trend: 'down'
    },
  ];

  // Recent Orders
  const recentOrders = [
    { id: '#ORD-001', customer: 'Sarah Johnson', amount: '$245.00', status: 'Delivered', date: '2 hours ago', items: 3 },
    { id: '#ORD-002', customer: 'Michael Chen', amount: '$189.50', status: 'Processing', date: '4 hours ago', items: 2 },
    { id: '#ORD-003', customer: 'Emily Davis', amount: '$432.00', status: 'Shipped', date: '6 hours ago', items: 5 },
    { id: '#ORD-004', customer: 'James Wilson', amount: '$167.80', status: 'Pending', date: '8 hours ago', items: 1 },
    { id: '#ORD-005', customer: 'Maria Garcia', amount: '$523.00', status: 'Delivered', date: '12 hours ago', items: 4 },
  ];



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-lg border border-gray-200 p-1">
            {['today', 'week', 'month'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                  period === p 
                    ? 'bg-teal-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={`text-sm font-medium flex items-center gap-1 ${
                stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
      </div> 
  )
}
