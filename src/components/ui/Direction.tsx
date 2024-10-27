import { SubmitHandler, useForm } from "react-hook-form";
import { ITableProps } from "../../data/types";
import SelectForm from "../forms/SelectForm";
import Breadcrumb from "./Breadcrumb";
import CardStats from "./CardStats";
import SubscriberIndex from "./SubscriberIndex";
import TableUI from "./Table";
import TopLeaks from "./TopLeaks";
import { useEffect, useState } from "react";
import Input from "../forms/Input";
import { addDirection, getDirections } from "../../data/direction/directionService";
import { PostgrestError } from "@supabase/supabase-js";
import {IDirection} from '../../data/types/'
import toast from "react-hot-toast";

const Direction = () => {
  const [directionName, setDirectionName] = useState<string | null>(null)
  const [directionError, setDirectionError] = useState<PostgrestError | null>(null)
  const [directionData, setDirectionData] = useState<IDirection[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const optionsData = [
    {
      id: 1,
      name: 'Option 1',
    },
    {
      id: 2,
      name: 'Option 2',
    },
    {
      id: 3,
      name: 'Option 3',
    },
    {
      id: 4,
      name: 'Option 4',
    },
  ]

  const { register, handleSubmit, formState: { errors } } = useForm<IDirectionInput>()
  const handleSubmitDirection: SubmitHandler<IDirectionInput> = async (directionData) => {
    console.log(directionData);
    try {
      const { data, error } = await addDirection(directionData.name)
      
      if (data) {
      setDirectionData(data)
      setDirectionName('')
    }

    if (error) {
      throw error
    }
    } catch (error: PostgrestError | any) {
      setDirectionError(error)
    }
  }

  const handleInputChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      setDirectionName(e?.target?.value)
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
          setDirectionError(error)
        }
      }
    )()
  }, [directionData])

  if (directionError) {
    toast.error(directionError.message)
  }

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
                  errors?.name && (<p> errors.name</p>)
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
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Agency name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <SelectForm label="Select Direction" options={optionsData} />
              </div>
              <div>
                <button className="flex w-1/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Save
                </button>
              </div>
            </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                <input
                  type="text"
                  placeholder="Avenue name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>
            <div>
                <SelectForm label="Select Agency" options={optionsData} />
              </div>
              <div>
                <button className="flex w-1/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Save
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Direction;

interface IDirectionInput {
  name: string
}