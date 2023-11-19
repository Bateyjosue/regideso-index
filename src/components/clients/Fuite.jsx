import { useLoaderData} from 'react-router-dom'

export async function loader() {
  const baseUrl = 'https://regi-api.bingwainnovationhub.com/v1/'

  const fuiteResponse = await fetch(`${baseUrl}water-leaks?params={"page":"1", "limit":"1000"}`)
  const fuiteData = await fuiteResponse.json()

  const agentResponse = await fetch(`${baseUrl}users?params={"page":"1", "limit":"1000"}`)
  const agentData = await agentResponse.json()
  
  const leakAgent = fuiteData.waterLeaksResponse.rows.map(leak => {
    const agent = agentData.usersResponse.rows.find(agent => agent.id.toLowerCase() === leak.user_id.toLowerCase())
    return {
      ...agent,
      ...leak,
    }
  })

  return leakAgent
}

function Fuite() {
  const leakes = useLoaderData()

  return (
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-16 py-3">
                      <span className="">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Agent
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Localisation
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
              </tr>
          </thead>
          <tbody>
            {
              leakes.map(leak => (
                <tr key={leak.id} className="bg-white border-b  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                      <img src={leak.pictures[0]} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {leak.fullname}
                  </td>
                  <td className="px-6 py-4">
                      <a href={`http://maps.google.com/?q=${leak.latitude},${leak.longitude}`} className="font-medium text-red-600 dark:text-red-500 hover:underline" target='_blank' rel="noreferrer">see map</a>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {leak.description}
                  </td>
              </tr>
              ))
            }
          </tbody>
      </table>
  </div>
  )
}

export default Fuite