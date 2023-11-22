import { useLoaderData } from 'react-router-dom'
// import { Suspense } from 'react'

export async function loader() {
  const baseUrl = 'https://regi-api.bingwainnovationhub.com/v1/'
  const subscriberResponse = await fetch(`${baseUrl}subscribers?params={"page":"1", "limit":"100"}`)
  const subscriberData = await subscriberResponse.json()
  // return defer({
  //   subscriber: subscriberData.subscribersResponse.rows
  // })

  return subscriberData.subscribersResponse.rows
}
function Subscribers() {
  const subscriber  = useLoaderData()
  
  return (
  //   <Suspense fallback={<>Loading...</>} errorElement={<>An Error has occured</>}>
  //     <Await resolve={subscriber}>
  //       {
  //         (sub) => {
  //           sub.map(su => (
  //             <div key={su.id} className='border-20 bg-red-500 mt-30'>
  //               <span>{su.full_name}</span>
  //               <span>{su.telephone}</span>
  //               <span>{su.physic_address}</span>
  //             </div>
  //           ))
  //         }
  //       }
    //   </Await>
    // </Suspense >
    <main>
      <section>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-16 py-3">
                      <span className="">Full Name</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Telephone Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Localisation
                </th>
                <th scope="col" className="px-6 py-3">
                      Status
                  </th>
              </tr>
          </thead>
          <tbody>
          {
            subscriber.length ? (
              subscriber.map(leak => (
                <tr key={leak.id} className="bg-white border-b  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    {leak.full_name}
                  </td>
                  <td className="px-6 py-4">
                    {leak.telephone}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {leak.physic_address}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {leak.is_active ? 'active' : 'not active'}
                  </td>
              </tr>
              ))
            )
              : (
                <>Loading</>
              )
            }
          </tbody>
      </table>
  </div>
      </section>
    </main>

  )
}

export default Subscribers
