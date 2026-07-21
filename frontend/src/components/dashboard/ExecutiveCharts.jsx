import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  ComposedChart, Line, Cell, PieChart, Pie, Legend
} from 'recharts';

// Data for Category Based Issues
const categoryData = [
  { name: 'CC', val: 12 },
  { name: 'FC', val: 15 },
  { name: 'PC', val: 2 },
];

// Data for Project Issues Analysis
const projectIssuesData = [
  { name: 'DATL', green: 0, red: -10 },
  { name: 'ADTPL', green: 5, red: 0 },
  { name: 'MKTPL', green: 8, red: 0 },
  { name: 'JUHPL', green: 0, red: -5 },
  { name: 'NKTPL', green: 12, red: 0 },
  { name: 'MSHP', green: 0, red: -2 },
  { name: 'WMPTL', green: 9, red: 0 },
];

// Data for Condition Based Rating
const conditionData = [
  { name: 'PC', barVal: 8.27, lineVal: 8.113 },
  { name: 'CC', barVal: 8.27, lineVal: 8.172 },
  { name: 'FC', barVal: 8.29, lineVal: 8.129 },
];

// Data for Project Rating Summary (Dummy Data to match visual)
const allProjects = [
  { name: 'DHMEPL', rating: 9.64, change: 'up' },
  { name: 'KETPL', rating: 9.09, change: 'up' },
  { name: 'NKTPL', rating: 9.08, change: 'up' },
  { name: 'MSHP', rating: 9.04, change: 'up' },
  { name: 'JUHPL', rating: 8.91, change: 'up' },
  { name: 'SIPL', rating: 8.89, change: 'up' },
  { name: 'MKTPL', rating: 8.78, change: 'up' },
  { name: 'MHPL', rating: 8.64, change: 'up' },
  { name: 'SMTPL', rating: 8.58, change: 'down' },
  { name: 'SPPL', rating: 8.52, change: 'up' },
  { name: 'WVEL', rating: 8.44, change: 'up' },
  { name: 'WMPTL', rating: 8.24, change: 'down' },
];

const donutData = [
  { name: '> 8', value: 19, fill: '#22C55E' },
  { name: '6 - 7', value: 6, fill: '#3B82F6' },
  { name: '< 6', value: 2, fill: '#EF4444' }
];

const DivisionTable = ({ title, data, bg }) => (
  <div className="border border-gray-200 text-[9px] h-full flex flex-col">
    <div className={`font-bold text-center py-1 ${bg} text-white`}>{title}</div>
    <div className="grid grid-cols-4 bg-gray-100 font-bold p-1 border-b border-gray-200">
      <div>Asset</div>
      <div className="text-right">Total</div>
      <div className="text-right">Variance</div>
      <div className="text-right">Density</div>
    </div>
    <div className="flex-1 p-1">
      {data.map((row, i) => (
        <div key={i} className="grid grid-cols-4 py-0.5 border-b border-gray-100 last:border-0">
          <div>{row.name}</div>
          <div className="text-right">{row.total}%</div>
          <div className="text-right text-red-500">{row.var}%</div>
          <div className="text-right text-green-500 font-bold">{row.den}%</div>
        </div>
      ))}
    </div>
  </div>
);

const ExecutiveCharts = () => {
  return (
    <div className="flex flex-col gap-4">
      
      {/* ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Category Based Issues */}
        <div className="border border-gray-300 rounded shadow-sm bg-white p-2">
          <h3 className="text-green-700 font-bold text-sm mb-2 uppercase border-b pb-1">Category Based Issues</h3>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{top: 10, right: 10, left: -20, bottom: 0}}>
                <XAxis dataKey="name" tick={{fontSize: 10}} />
                <YAxis tick={{fontSize: 10}} />
                <Bar dataKey="val" fill="#EF4444" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <table className="w-full text-[9px] mt-2 border-collapse border border-gray-200 text-center">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="border border-gray-200 p-1">Category</th>
                <th className="border border-gray-200 p-1">Issue Density</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-200 p-1">CC</td><td className="border border-gray-200 p-1 text-red-500">24.5%</td></tr>
              <tr><td className="border border-gray-200 p-1">FC</td><td className="border border-gray-200 p-1 text-red-500">22.8%</td></tr>
              <tr><td className="border border-gray-200 p-1">PC</td><td className="border border-gray-200 p-1 text-green-500">3.8%</td></tr>
            </tbody>
          </table>
        </div>

        {/* Project Issues Analysis */}
        <div className="border border-gray-300 rounded shadow-sm bg-white p-2">
          <h3 className="text-green-700 font-bold text-sm mb-2 uppercase border-b pb-1">Project Issues Analysis</h3>
          <div className="flex justify-between text-[10px] font-bold mb-2">
            <span className="text-green-600">Highest Increase: DATL</span>
            <span className="text-red-500">Highest Decrease: ADTPL</span>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectIssuesData} layout="vertical" margin={{top: 0, right: 10, left: 10, bottom: 0}} barGap={0} barCategoryGap="10%">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{fontSize: 9}} width={40} />
                <Tooltip />
                <Bar dataKey="green" stackId="a" fill="#22C55E" />
                <Bar dataKey="red" stackId="a" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Condition Based Rating */}
        <div className="border border-gray-300 rounded shadow-sm bg-white p-2">
          <h3 className="text-green-700 font-bold text-sm mb-2 uppercase border-b pb-1">Condition Based Rating</h3>
          <table className="w-full text-[9px] mb-2 border-collapse border border-gray-200 text-center">
            <thead>
              <tr className="bg-gray-100 font-bold">
                <th className="border border-gray-200 p-1">Type</th>
                <th className="border border-gray-200 p-1">Avg SevR</th>
                <th className="border border-gray-200 p-1">Cumulative</th>
              </tr>
            </thead>
            <tbody>
              {conditionData.map((d, i) => (
                <tr key={i}>
                  <td className="border border-gray-200 p-1">{d.name}</td>
                  <td className="border border-gray-200 p-1">{d.barVal}</td>
                  <td className="border border-gray-200 p-1">{d.lineVal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={conditionData} margin={{top: 10, right: 10, left: -20, bottom: 0}}>
                <XAxis dataKey="name" tick={{fontSize: 10}} />
                <YAxis domain={[8, 8.5]} tick={{fontSize: 10}} />
                <Bar dataKey="barVal" fill="#3B82F6" barSize={40} />
                <Line type="monotone" dataKey="lineVal" stroke="#EF4444" strokeWidth={2} dot={{r: 4}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Division Based Issues */}
        <div className="border border-gray-300 rounded shadow-sm bg-white p-2 flex flex-col">
          <h3 className="text-green-700 font-bold text-sm mb-2 uppercase border-b pb-1">Division Based Issues</h3>
          <div className="grid grid-cols-2 gap-2 flex-1">
            <DivisionTable title="ATMS" bg="bg-orange-400" data={[{name: 'VMS', total: '5.5', var: '0.1', den: '2.1'}]} />
            <DivisionTable title="RW" bg="bg-purple-600" data={[{name: 'DEL', total: '1.7', var: '0.2', den: '4.8'}]} />
            <DivisionTable title="TMS" bg="bg-black" data={[{name: 'AST', total: '8.8', var: '0.3', den: '1.2'}]} />
            <DivisionTable title="PTR" bg="bg-yellow-400" data={[{name: 'BBV', total: '25.1', var: '4.5', den: '1.2'}]} />
            <div className="col-span-2 grid grid-cols-2 gap-2 mt-2">
              <div className="flex gap-2">
                <div className="bg-red-50 text-red-600 font-bold text-center p-2 rounded flex-1 text-xs border border-red-100">
                  Assets With Rise<br/><span className="text-xl">18</span>
                </div>
                <div className="bg-green-50 text-green-600 font-bold text-center p-2 rounded flex-1 text-xs border border-green-100">
                  Assets With Fall<br/><span className="text-xl">21</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Rating Summary */}
        <div className="border border-gray-300 rounded shadow-sm bg-white p-2">
          <h3 className="text-green-700 font-bold text-sm mb-2 uppercase border-b pb-1">Project Rating Summary – May 26</h3>
          <div className="flex gap-4">
            
            {/* Left List */}
            <div className="flex-1 border-r pr-2">
              <div className="grid grid-cols-3 bg-blue-600 text-white text-[9px] font-bold p-1 mb-1">
                <div>Project</div>
                <div className="text-center">Rating</div>
                <div className="text-right">SevR Change</div>
              </div>
              <div className="space-y-0.5 overflow-y-auto max-h-[250px] custom-scrollbar pr-1">
                {allProjects.map((p, i) => (
                  <div key={i} className="grid grid-cols-3 text-[10px] items-center border-b border-gray-100 pb-0.5">
                    <div className="font-bold text-gray-700">{p.name}</div>
                    <div className="w-full bg-gray-200 h-3 rounded overflow-hidden relative">
                      <div className="bg-green-500 h-full text-[8px] text-white flex items-center px-1 font-bold" style={{width: `${(p.rating/10)*100}%`}}>
                        {p.rating}
                      </div>
                    </div>
                    <div className={`text-right font-bold ${p.change === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {p.change === 'up' ? '↑' : '↓'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Summary */}
            <div className="w-[180px] flex flex-col gap-2">
              <div className="border border-red-200 text-center rounded p-1">
                <div className="text-[9px] text-red-500 font-bold uppercase">Average Monthly Rating</div>
                <div className="text-xl font-black text-gray-800">8.28</div>
              </div>
              
              <div className="border border-green-200 text-center rounded p-1">
                <div className="text-[9px] text-green-500 font-bold uppercase">Projects Improved</div>
                <div className="text-xl font-black text-green-600">19</div>
              </div>

              <div className="border border-red-200 text-center rounded p-1">
                <div className="text-[9px] text-red-500 font-bold uppercase">Projects Declined</div>
                <div className="text-xl font-black text-red-600">8</div>
              </div>

              <div className="flex-1 mt-2">
                <div className="text-[9px] font-bold text-center mb-1 bg-blue-600 text-white py-0.5">Rating Distribution</div>
                <div className="h-[100px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={donutData} innerRadius={25} outerRadius={40} dataKey="value" paddingAngle={2}>
                        {donutData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ExecutiveCharts;
