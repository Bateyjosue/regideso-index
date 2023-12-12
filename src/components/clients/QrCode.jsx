/* eslint-disable react/prop-types */
import QRCode from 'react-qr-code'
import { useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';


function QrCode() {
  const { id } = useParams()
  const { data, error, loading } = useUser(id)
  
  console.log({
    data, loading, error
  })

  return (
    <div className='flex flex-col items-center justify-center w- h-full'>
      <div className='font-bold py-2'>{data[0].full_name} || {data[0].physic_address
}</div>
      <QRCode value={id} />
    </div>
  )
}

export default QrCode