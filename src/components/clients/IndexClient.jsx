import {useRef} from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useLoaderData} from 'react-router-dom'

const baseUrl = 'https://regi-api.bingwainnovationhub.com/v1/'
    

export async function  loader() {
    const subscribe = await fetch(`${baseUrl}subscribers?params={"page":"1", "limit":"10"}`)
    const subscribeData = await subscribe.json()

    const indexResponse = await fetch(`${baseUrl}index-samples?params={%22page%22:%221%22,%20%22limit%22:%22100%22}`)
    const indexData = await indexResponse.json()

    const subIndex = indexData.indexSamplesResponse.rows.map((index) => {
        const subInd = subscribeData.subscribersResponse.rows.find(sub => sub.id === index.subscriber_id)
        return {
            ...subInd,
            ...index
        }
    })
    return subIndex
}

function IndexClient() {
    const tableRef = useRef(null)
    const indexInfo =  useLoaderData()

const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Users table',
    sheet: 'Users'
})

  return (
      <main className='mt-14'>
        <button onClick={onDownload} className='my-12 bg-green-600 px-4 text-white rounded-full'> Export excel </button><div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-12 ">
          <table ref={tableRef} className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Tournee
                </th>
                <th scope="col" className="px-6 py-3">
                    Reference PDI
                </th>
                <th scope="col" className="px-6 py-3">
                    Index Number
                </th>
                <th scope="col" className="px-6 py-3">
                    Abonne
                </th>
                <th scope="col" className="px-6 py-3">
                    M3 Consumed
                </th>
                <th scope="col" className="px-6 py-3">
                    Pour le Mois de?
                </th>
            </tr>
            </thead>
            <tbody>
                { 
                  indexInfo ? (
                    indexInfo.map(index => (
                      <tr
                        key={index.id}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        
                            <td>
                                ODmfmf
                        </td>
                        <td>ODKFNm</td>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowra">
                            {index.id}
                        </td>
                        <td className="px-6 py-4">
                            {index.full_name}
                        </td>
                        <td className="px-6 py-4">
                            {index.consumed_water}
                        </td>
                        <td className="px-6 py-4">
                            {index.updated_at}
                        </td>
                      </tr>
                    ))
                  ) : (<tr>No Index Found</tr>)
                }
              </tbody>
          </table>
      </div></main>
  )
}
export default IndexClient