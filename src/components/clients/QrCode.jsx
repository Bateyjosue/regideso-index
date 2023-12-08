/* eslint-disable react/prop-types */
import QRCode from 'react-qr-code'
import { useParams } from 'react-router-dom';


function QrCode() {
  const {id} = useParams()

  return (
    <div className='flex items-center justify-center w- h-full'>
      <QRCode value={id} />
    </div>
  )
}

export default QrCode