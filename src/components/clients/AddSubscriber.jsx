import { useForm } from "react-hook-form"
import Input from "../forms/Input"
import { nanoid } from "nanoid"
import { Dna } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Navigate} from 'react-router-dom'
import getToken from "../../data/auth"
import { useState } from "react"

const url = 'https://regi-api.bingwainnovationhub.com/v1/subscribers'
const token = getToken()

function AddSubscriber() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [addedData, setData] = useState(null)

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm()

  const onSubmit = (data) => {
    setLoading(true)
    fetch(url, {
      method: "POST",
      cache: "reload",
      mode: "cors",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    },).then(response => response.json())
      .then(data => {
        if (data.status === 201) {
          setData(data)
        }
        if (data.status !== 201){
        setError(data)
        }
        setLoading(false)
        
      })
      .catch(err => console.log(err.message))
  }
  
  if (loading) {
    return <section className="mt-14">
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

  if (addedData?.status === 201) return <Navigate to='/subscriber' replace/>

  return (
    <main className="mt-14 mx-8">
      <section className="my-12">
        <h1 className="my-6 text-2xl underline underline-offset-8 font-bold opacity-40">Ajouter Un Nouvel Abonne</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)} className=" w-4/5 leading-loose">
          <Input
            placeholder="identification code"
            type="text"
            label="identification_code"
            register={register}
            value={nanoid(10)}
          />
          
          
          <Input
            placeholder="Nom Complet Ex: Josue Batey"
              type="text"
              label="full_name"
            register ={register}
            />
          {errors.full_name && <span className="text-sm text-red-400 -mt-4">This field is required</span>}
          
          <Input
            placeholder="Numerom de telephone Ex: +243998877654"
              type="number"
              label="telephone"
            register ={register}
          />
          {errors.telephone && <span className="text-sm text-red-400 -mt-4">This field is required</span>}
          
          <Input
            placeholder="Adresse Physique Ex: Goma Ville, Karisimbi"
              type="text"
              label="physic_address"
            register ={register}
            />
          {errors.physic_address && <span className="text-sm text-red-400 -mt-4">This field is required</span>}

          <div>
            <button className="rounded-full bg-blue-500 w-2/4 mx-auto my-4 text-sm py-2 text-white font-bold" type="submit">Ajouter Abonne</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default AddSubscriber