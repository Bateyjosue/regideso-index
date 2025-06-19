import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const TopPerformingAgencies = () => {
  const agencies = [
    { name: 'Kigali Central', performance: 95, subscribers: 2500, color: '#3B82F6' },
    { name: 'Butare', performance: 92, subscribers: 1800, color: '#10B981' },
    { name: 'Gitarama', performance: 88, subscribers: 1600, color: '#F59E0B' },
    { name: 'Ruhengeri', performance: 85, subscribers: 1400, color: '#EF4444' },
    { name: 'Gisenyi', performance: 82, subscribers: 1200, color: '#8B5CF6' },
  ]

  const data = {
    labels: agencies.map(agency => agency.name),
    datasets: [
      {
        data: agencies.map(agency => agency.subscribers),
        backgroundColor: agencies.map(agency => agency.color),
        borderColor: agencies.map(agency => agency.color),
        borderWidth: 2,
        hoverBorderWidth: 3,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const agency = agencies[context.dataIndex]
            return [
              `Subscribers: ${agency.subscribers}`,
              `Performance: ${agency.performance}%`
            ]
          }
        }
      }
    },
    cutout: '60%',
  }

  return (
    <div className="bg-white dark:bg-boxdark rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Top Performing Agencies
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Performance metrics by subscriber count
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="w-48 h-48 flex-shrink-0">
          <Doughnut data={data} options={options} />
        </div>

        <div className="flex-1 space-y-3 w-full">
          {agencies.map((agency, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: agency.color }}
                ></div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {agency.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {agency.subscribers.toLocaleString()} subscribers
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900 dark:text-white">
                  {agency.performance}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Performance
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">88.4%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Performance</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">8,500</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Subscribers</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopPerformingAgencies