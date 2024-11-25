import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RevenueChart from './RevenueChart';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import getBaseUrl from '../../utils/baseURL';
import Loading from '../../components/Loading';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalBooks: 0,
    totalSales: 0,
    totalOrders: 0,
    trendingBooks: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        if (error.response?.status === 401) {
          navigate('/');
        }
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <Loading />;

  const stats = [
    {
      title: "Total Products",
      value: data.totalBooks || 0,
      icon: <ShoppingBag className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Total Revenue",
      value: `$${data.totalSales?.toLocaleString() || 0}`,
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Trending Books",
      value: data.trendingBooks || 0,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: "Total Orders",
      value: data.totalOrders || 0,
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">{stat.value}</h2>
                <p className="text-gray-600">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="md:col-span-2">
          <RevenueChart />
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Customers</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { name: "Annette Watson", score: "9.3", img: "https://randomuser.me/api/portraits/women/82.jpg" },
                { name: "Calvin Steward", score: "8.9", img: "https://randomuser.me/api/portraits/men/81.jpg" },
                { name: "Ralph Richards", score: "8.7", img: "https://randomuser.me/api/portraits/men/80.jpg" },
                { name: "Bernard Murphy", score: "8.2", img: "https://randomuser.me/api/portraits/men/79.jpg" }
              ].map((customer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                      <img 
                        src={`${customer.img}`}
                        alt={`${customer.name} profile`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="ml-3 text-gray-700 font-medium">{customer.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{customer.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-right text-sm text-gray-500">
        Developed by Maram, Farouk, Seif and Zied
      </div>
    </div>
  );
};

export default Dashboard;