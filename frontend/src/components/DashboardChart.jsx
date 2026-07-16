import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Red', value: 3 },
  { name: 'Yellow', value: 4 },
  { name: 'Blue', value: 4 },
  { name: 'Dark Blue', value: 5 },
];

const COLORS = ['#F85F5F', '#F5A623', '#007BFF', '#1E3A5F'];

const DashboardChart = () => {
  return (
    <div className="relative w-full h-[250px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
