import { ITableProps } from "../../data/types";
import SelectForm from "../forms/SelectForm";
import Breadcrumb from "./Breadcrumb";
import CardStats from "./CardStats";
import SubscriberIndex from "./SubscriberIndex";
import TableUI from "./Table";
import TopLeaks from "./TopLeaks";

const Direction = () => {
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

  const directionData: ITableProps[] = [
    {
      id: 'Direct',
      name: 'Goma ville',
      createdAt: new Date('2024-10-20')
    }
  ]
  
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
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Direction name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <button className="flex w-1/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Save
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Input Fields --> */}
          <TableUI label="Direction" tableData={directionData} />
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