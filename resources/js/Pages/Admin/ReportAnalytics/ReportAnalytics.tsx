import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ReportAnalytics({ auth, analyticsData }:any) {
    // Fallback to ensure data is valid
    const validData = Array.isArray(analyticsData) ? analyticsData : [];

    // Prepare data for the Bar Chart
    const labels = validData.map((data) => data.user_name); // Use user names as labels
    const monthlyVisitData = validData.map((data) => data.monthly_visit_count); // Monthly visits data

    // Data object for Chart.js Bar chart
    const data = {
        labels: labels.length > 0 ? labels : ['No data'], // Fallback label
        datasets: [
            {
                label: 'Monthly Visit Count',
                data: monthlyVisitData.length > 0 ? monthlyVisitData : [0], // Fallback data
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Visit Count by User',
            },
        },
    };

    return (
        <AdminLayout user={auth.user}>
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
                {/* Main Content */}
                <main className="flex-1">
                    <Head title="Dashboard" />

                    {/* Overview Section */}
                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-8">
                            Report Analytics
                        </h2>

                        {/* Table Section */}
                        <div className="overflow-x-auto rounded-lg shadow-lg">
                            <div className="overflow-y-auto max-h-96"> {/* Adjust height for responsive scroll */}
                                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                                    <thead className="bg-gray-100 border-b-2 border-gray-300">
                                        <tr>
                                            <th className="py-4 px-6 text-left text-gray-600 font-semibold tracking-wider">
                                                User Name
                                            </th>
                                            <th className="py-4 px-6 text-left text-gray-600 font-semibold tracking-wider">
                                                Link
                                            </th>
                                            <th className="py-4 px-6 text-left text-gray-600 font-semibold tracking-wider">
                                                Created At
                                            </th>
                                            <th className="py-4 px-6 text-left text-gray-600 font-semibold tracking-wider">
                                                Daily Visit Count
                                            </th>
                                            <th className="py-4 px-6 text-left text-gray-600 font-semibold tracking-wider">
                                                Monthly Visit Count
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {Array.isArray(analyticsData) && analyticsData.length > 0 ? (
                                            analyticsData.map((data, index) => (
                                                <tr
                                                    key={index}
                                                    className="hover:bg-gray-50 transition duration-150"
                                                >
                                                    <td className="py-4 px-6 text-gray-900 whitespace-nowrap">
                                                        {data.user_name}
                                                    </td>
                                                    <td className="py-4 px-6 text-blue-600 hover:underline whitespace-nowrap">
                                                        <a
                                                            href={data.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {data.link.length > 30
                                                                ? `${data.link.substring(0, 30)}...`
                                                                : data.link}
                                                        </a>
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-600 whitespace-nowrap">
                                                        {data.created_at}
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-600 whitespace-nowrap">
                                                        {data.daily_visit_count}
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-600 whitespace-nowrap">
                                                        {data.monthly_visit_count}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="py-4 px-6 text-center text-gray-500">
                                                    No data available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Bar Chart Section */}
                        <div className="mt-8">
                        {/* options ={options}  */}
                            <Bar data={data}/>
                        </div>
                    </section>
                </main>
            </div>
        </AdminLayout>
    );
}
