import { useForm } from "react-hook-form"
import Input from "../forms/Input"
import { nanoid } from "nanoid"
import { postData, addData } from "../../data/api"
import  useSWR from 'swr'
import { Dna } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import axios from "axios"
import getToken from "../../data/auth"
import { useState } from "react"

const url = 'https://regi-api.bingwainnovationhub.com/v1/subscribers'
const token = getToken()

function AddSubscriber() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [addedData, setData] = useState([null])

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm()

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const subScribeResponse = await axios.post(url,data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        }, manuel: true
      })

      const subScribeData = await subScribeResponse.data
      console.log(subScribeData)
      if (subScribeData.status >= 200 && subScribeData.status <= 209) {
        setData(subScribeData)
      }
      if (subScribeData.status < 200 && subScribeData.status > 209) {
        setError(subScribeData)
      }
      setLoading(false)
    } catch (e) {
      setError(e)
    }
  }

  // if (loading) {
  //   return <Dna
  //     visible={true}
  //     height="80"
  //     width="80"
  //     ariaLabel="dna-loading"
  //     wrapperStyle={{}}
  //     wrapperClass="dna-wrapper"
  //   />
  // }

  // if (error) {
  //   toast.error(error?.message)
  //   // return toast.error(error?.response.data.message)
  // }
  

  console.log(error)
  console.log(addData)


  return (
    <main>
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