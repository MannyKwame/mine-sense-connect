
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, AlertTriangle, MapPin, Download, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    { label: "Total Reports", value: "247", change: "+12%", color: "blue" },
    { label: "Active Cases", value: "89", change: "+5%", color: "orange" },
    { label: "Resolved", value: "158", change: "+18%", color: "green" },
    { label: "Critical Issues", value: "12", change: "-2%", color: "red" }
  ];

  const recentReports = [
    {
      id: "GR-2024-089",
      title: "Water contamination from mining runoff",
      location: "Konongo, Ashanti Region",
      category: "Environmental",
      severity: "High",
      status: "Under Review",
      date: "2024-01-15",
      reporter: "Kwame A."
    },
    {
      id: "GR-2024-088",
      title: "Excessive dust affecting respiratory health",
      location: "Obuasi, Ashanti Region",
      category: "Health & Safety",
      severity: "Medium",
      status: "In Progress",
      date: "2024-01-14",
      reporter: "Ama B."
    },
    {
      id: "GR-2024-087",
      title: "Property damage from blasting operations",
      location: "Tarkwa, Western Region",
      category: "Property Damage",
      severity: "High",
      status: "Resolved",
      date: "2024-01-13",
      reporter: "Kofi C."
    },
    {
      id: "GR-2024-086",
      title: "Unpaid compensation for land acquisition",
      location: "Prestea, Western Region",
      category: "Compensation",
      severity: "Critical",
      status: "Escalated",
      date: "2024-01-12",
      reporter: "Akua D."
    }
  ];

  const hotspots = [
    { location: "Konongo, Ashanti", issues: 23, trend: "↑" },
    { location: "Obuasi, Ashanti", issues: 18, trend: "↓" },
    { location: "Tarkwa, Western", issues: 15, trend: "↑" },
    { location: "Prestea, Western", issues: 12, trend: "→" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'under review': return 'bg-yellow-100 text-yellow-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link to="/" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Community Dashboard</h1>
                  <p className="text-sm text-gray-600">Real-time insights and trends</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
                  <TrendingUp className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Reports */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
                <Link to="/report">
                  <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600">
                    New Report
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{report.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {report.location}
                          </span>
                          <span>#{report.id}</span>
                          <span>{report.date}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getSeverityColor(report.severity)}>
                          {report.severity}
                        </Badge>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Reporter: {report.reporter}</span>
                      <Badge variant="outline">{report.category}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Hotspots & AI Insights */}
          <div className="space-y-6">
            {/* Issue Hotspots */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Issue Hotspots
              </h3>
              <div className="space-y-3">
                {hotspots.map((hotspot, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{hotspot.location}</p>
                      <p className="text-xs text-gray-600">{hotspot.issues} active issues</p>
                    </div>
                    <span className={`text-lg ${
                      hotspot.trend === '↑' ? 'text-red-600' : 
                      hotspot.trend === '↓' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {hotspot.trend}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Insights */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-1">Trend Alert</p>
                  <p className="text-sm text-blue-800">
                    Water complaints have increased by 23% in Zone B over the past 2 weeks, primarily in Konongo area.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-yellow-900 mb-1">Pattern Detected</p>
                  <p className="text-sm text-yellow-800">
                    Dust-related health complaints spike every Monday, likely due to weekend blasting activities.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900 mb-1">Positive Trend</p>
                  <p className="text-sm text-green-800">
                    Response time to compensation claims has improved by 40% this month.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
