import { SubmitHandler, useForm } from "react-hook-form";
import SelectForm from "../forms/SelectForm";
import Breadcrumb from "./Breadcrumb";
import TableUI from "./Table";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "../forms/Input";
import { addAgency, addAvenue, addDirection, getAgency, getAvenue, getDirections } from "../../data/direction/directionService";
import { PostgrestError } from "@supabase/supabase-js";
import {IAvenue, IDirection} from '../../data/types/'
import toast from "react-hot-toast";
import { FallingLines } from 'react-loader-spinner'

const Direction = () => {
  const [directionName, setDirectionName] = useState<string>('')
  const [agencyName, setAgencyName] = useState<string>('')
  const [agencySelect, setAgencySelect] = useState<string | null>(null)
  const [avenueName, setAvenueName] = useState<string>('')
  const [avenueSelect, setAvenueSelect] = useState<string | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [directionData, setDirectionData] = useState<IDirection[]>([])
  const [agencyData, setAgencyData] = useState<IAvenue[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors } } = useForm<IDirectionInput>()
  const { register: registerAgency, handleSubmit: submitAgency, formState: { errors: errorsAgency } } = useForm<IAgencyInput>()
  const { register: registerAvenue, handleSubmit: submitAvenue, formState: { errors: errorsAvenue } } = useForm<IAvenueInput>()
  const handleSubmitDirection: SubmitHandler<IDirectionInput> = async (directionData) => {
    try {
      setLoading(true)
      const { data, error } = await addDirection(directionData.name)
      
      if (data) {
        setLoading(false)
        setDirectionData(data)
        setDirectionName('')
      }

      if (error) {
        setLoading(false)
        throw error
      }
    } catch (error: PostgrestError | any) {
      setLoading(false)
      setError(error)
    }
  }

  const handleSubmitAgency: SubmitHandler<IAgencyInput> = async (agencyData) => {
    try {
      const { data, error } = await addAgency(agencyData)
      
      if (data) {
        setAgencyName('')
        setAgencySelect(null)
        toast.success('Agency added successfully')
      }

      if (error) {
        throw error
      }

    
    } catch (error: PostgrestError | any) {
      setError(error)
      toast.error(error.message)
      // handle error, e.g., display error message
    }
  }

  const handleSubmitAvenue: SubmitHandler<IAvenueInput> = async (avenueData) => {
    console.log(avenueData);
    try {
      const { data, error } = await addAvenue(avenueData)

      console.log(data, error);
      
      if (data) {
        setAvenueName('')
        setAvenueSelect(null)
        toast.success('Avenue added successfully')
      }

      if (error) {
        throw error
      }

    
    } catch (error: PostgrestError | any) {
      setError(error)
      toast.error(error.message)
      // handle error, e.g., display error message
    }
  }

  const handleInputChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      setDirectionName(e?.target?.value)
    }
  }

  const handleInputChangeAgency = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target instanceof HTMLInputElement) {
      switch (e.target.name) {
        case 'name':
          setAgencyName(e.target.value);
          break;
        case 'direction':
          setAgencySelect(e.target.value);
          break;
        default:
          break;
      }
    }
  }

  const handleInputChangeAvenue = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target instanceof HTMLInputElement) {
      switch (e.target.name) {
        case 'avenue_name':
          setAvenueName(e.target.value);
          break;
        case 'agency':
          setAvenueSelect(e.target.value);
          break;
        default:
          break;
      }
    }
  }

  useEffect(() => { 
    (
      async () => {
        try {
          const { data, error } = await getDirections()
          if (data) {
            setDirectionData(data)
          }

          if (error) {
            throw error
          }
        } catch (error: PostgrestError | any) {
          setError(error)
        }
      }
    )()
  }, [0])

  useEffect(() => { 
    (
      async () => {
        try {
          const { data, error } = await getAgency()
          if (data) {
            setAgencyData(data)
          }

          if (error) {
            throw error
          }
        } catch (error: PostgrestError | any) {
          setError(error)
        }
      }
    )()
  }, [0])

  if (error) {
    toast.error(error.message)
  }

  const optionsData = directionData.map((direction) => { 
    return {
      id: direction.id,
      name: direction.name,
    }
  })

  const avenueption = agencyData.map((agency) => {
    return {
      id: agency.id,
      name: agency.name
    }
  })

  return (
    <div className="">
      <Breadcrumb pageName="Direction" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9 border p-4">
          {/* <!-- Input Fields --> */}
          <h3 className="font-extrabold text-2xl text-black dark:text-white">
                Direction Information
              </h3>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-extrabold text-xl text-black dark:text-white">
                Direction Creating
              </h3>
            </div>
            <form onSubmit={handleSubmit(handleSubmitDirection)} className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <Input
                  type="text"
                  label="name"
                  placeholder="Direction name"
                  value={directionName}
                  register={register}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {
                  errors?.name && (<p> {errors?.name.message}</p>)
                }
              </div>
              <div>
                <button className="flex w-1/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Save
                </button>
              </div>
            </form>
          </div>
          {/* <!-- Input Fields --> */}

          <TableUI label="Direction" loading={loading} tableData={directionData} />
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-fit">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-extrabold text-2xl text-black dark:text-white">
              Agency Information
              {
                loading && (
                  <FallingLines
                    color="#4fa94d"
                    width="100"
                    visible={true}
                    // ariaLabel="falling-circles-loading"
                  />
                )
              }
              </h3>
            </div>
            <form onSubmit={submitAgency(handleSubmitAgency)} className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <Input
                  type="text"
                  label="name"
                  name='name'
                  value={agencyName ?? ''}
                  placeholder="Agency name"
                  register={registerAgency}
                  onChange={handleInputChangeAgency}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <SelectForm
                  onChangeSelect={handleInputChangeAgency}
                  label="code_direction"
                  options={optionsData}
                  value={agencySelect}
                  register={registerAgency}
                  name="direction"
              />
              {
                errorsAgency.name && (<p>{errorsAgency.name.message}</p>)
              }
              </div>
              <div>
                <button className="flex w-1/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Save
                </button>
              </div>
            </form>
        </div>
        <form onSubmit={submitAvenue(handleSubmitAvenue)} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-extrabold text-2xl text-black dark:text-white">
                Avenue Information
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <Input
                  type="text"
                  label="avenue_name"
                  name='avenue_name'
                  value={avenueName ?? ''}
                  placeholder="Avenue name"
                  register={registerAvenue}
                  onChange={handleInputChangeAvenue}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>
            <div>
                <SelectForm
                  onChangeSelect={handleInputChangeAvenue}
                  label="code_agency"
                  options={avenueption}
                  value={avenueSelect}
                  register={registerAvenue}
                  name="agency"
                />
              </div>
              <div>
                <button className="flex w-1/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Save
                </button>
              </div>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Direction;

interface IDirectionInput {
  name: string
}

interface OptionData {
  id: number;
  name: string;
}

interface IAgencyInput {
  name: string | null
  code_direction: string
}

interface IAvenueInput {
  name: string | null
  code_agency: string
}