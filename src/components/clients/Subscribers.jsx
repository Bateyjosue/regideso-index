import { fetcher } from '../../data/api'
// import { Suspense } from 'react'
import { Dna } from 'react-loader-spinner'
import useSWR from 'swr'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import getToken from '../../data/auth'
import { Link } from 'react-router-dom'


const url = 'https://regi-api.bingwainnovationhub.com/v1/subscribers?params={"page":"1", "limit":"100"}'
const baseUrl = 'https://regi-api.bingwainnovationhub.com/v1/'
const token = getToken()


function Subscribers() {
  const { data, error, isLoading } = useSWR(url, fetcher)
  const [subscriberId, setSubscriberId] = useState(null)
  const [loadDelete, setLoadDelete] = useState(false)

  useEffect(() => {
    setLoadDelete(true)
  fetch(`${baseUrl}subscribers?params={"id":"${subscriberId}"}`, {
    method: "DELETE",
    cache: "reload",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  .then(response => {
    if (response.ok) {
      toast.success('Request was successful')
      setSubscriberId(undefined)
      setLoadDelete(false)

    } else {
        toast.error(`Error: ${response.statusText}`);
    }
  })
  .catch(error => {
    // Handle fetch-related errors
    console.error("Fetch error:", error);
    toast.error("An error occurred while processing your request.");
  });
    setLoadDelete(false)
}, [subscriberId, loadDelete]);

  if (isLoading) {
    return <section className="mt-14 w-full h-full flex justify-center items-center">
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </section>
  }
  if (error) {
    toast.error(error?.message)
  }

  const subscriber = data.subscribersResponse.rows
  
  return (
    <main className='mt-14'>
      <section className='overflow-auto'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
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
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
          </thead>
          <tbody>
          {
            subscriber.length ? (
              subscriber.map(sub => (
                <tr key={sub.id} className="bg-white border-b  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <Link to={`${sub.id}`} className='flex gap-2 items-center'>
                      <span className="material-symbols-outlined text-green-500">qr_code_2</span>
                      <span>
                        {sub.full_name}
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    {sub.telephone}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {sub.physic_address}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {sub.is_active ? 'active' : 'not active'}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 flex gap-2 items-center">
                    <span
                      className="material-symbols-outlined text-red-400 cursor-pointer hover:text-green-400"
                      id={sub.id}
                      onClick={(e)=> setSubscriberId(e.target.id)}
                    >
                      {
                        loadDelete ? 'loading' : 'delete'
                      }
                    </span>
                      <span className="material-symbols-outlined cursor-pointer">edit</span>
                  </td>
              </tr>
              ))
            )
              : (
                <>No data available at the moment</>
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
