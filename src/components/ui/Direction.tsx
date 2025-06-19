import { SubmitHandler, useForm } from "react-hook-form";
import SelectForm from "../forms/SelectForm";
import Breadcrumb from "./Breadcrumb";
import TableUI from "./Table";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "../forms/Input";
import { addAgency, addAvenue, addDirection, getAgency, getAvenue, getDirections } from "../../data/direction/directionService";
import { IAvenue, IDirection } from '../../data/types/';
import toast from "react-hot-toast";
import { FallingLines } from 'react-loader-spinner';

interface IDirectionInput {
  name: string;
}

interface IAgencyInput {
  name: string;
  code_direction: string;
}

interface IAvenueInput {
  name: string;
  code_agency: string;
}

const Direction = () => {
  const [directionName, setDirectionName] = useState<string>('');
  const [agencyName, setAgencyName] = useState<string>('');
  const [agencySelect, setAgencySelect] = useState<string>('');
  const [avenueName, setAvenueName] = useState<string>('');
  const [avenueSelect, setAvenueSelect] = useState<string>('');
  const [error, setError] = useState<any>(null);
  const [directionData, setDirectionData] = useState<IDirection[]>([]);
  const [agencyData, setAgencyData] = useState<IAvenue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IDirectionInput>();
  const { register: registerAgency, handleSubmit: submitAgency, formState: { errors: errorsAgency }, reset: resetAgency } = useForm<IAgencyInput>();
  const { register: registerAvenue, handleSubmit: submitAvenue, formState: { errors: errorsAvenue }, reset: resetAvenue } = useForm<IAvenueInput>();

  const handleSubmitDirection: SubmitHandler<IDirectionInput> = async (directionData) => {
    try {
      setLoading(true);
      const { data, error } = await addDirection(directionData.name);
      
      if (data) {
        setLoading(false);
        setDirectionData(prev => [...prev, ...data]);
        setDirectionName('');
        reset();
        toast.success('Direction added successfully');
      }

      if (error) {
        setLoading(false);
        throw error;
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
      toast.error(error.message || 'Failed to add direction');
    }
  };

  const handleSubmitAgency: SubmitHandler<IAgencyInput> = async (agencyData) => {
    try {
      const { data, error } = await addAgency(agencyData);
      
      if (data) {
        setAgencyName('');
        setAgencySelect('');
        resetAgency();
        toast.success('Agency added successfully');
      }

      if (error) {
        throw error;
      }
    } catch (error: any) {
      setError(error);
      toast.error(error.message || 'Failed to add agency');
    }
  };

  const handleSubmitAvenue: SubmitHandler<IAvenueInput> = async (avenueData) => {
    try {
      const { data, error } = await addAvenue(avenueData);
      
      if (data) {
        setAvenueName('');
        setAvenueSelect('');
        resetAvenue();
        toast.success('Avenue added successfully');
      }

      if (error) {
        throw error;
      }
    } catch (error: any) {
      setError(error);
      toast.error(error.message || 'Failed to add avenue');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDirectionName(e.target.value);
  };

  const handleInputChangeAgency = (e: ChangeEvent<HTMLInputElement>) => {
    setAgencyName(e.target.value);
  };

  const handleInputChangeAvenue = (e: ChangeEvent<HTMLInputElement>) => {
    setAvenueName(e.target.value);
  };

  const handleSelectChangeAgency = (e: ChangeEvent<HTMLSelectElement>) => {
    setAgencySelect(e.target.value);
  };

  const handleSelectChangeAvenue = (e: ChangeEvent<HTMLSelectElement>) => {
    setAvenueSelect(e.target.value);
  };

  useEffect(() => { 
    const fetchDirections = async () => {
      try {
        const { data, error } = await getDirections();
        if (data) {
          setDirectionData(data);
        }
        if (error) {
          throw error;
        }
      } catch (error: any) {
        setError(error);
        toast.error(error.message || 'Failed to fetch directions');
      }
    };

    fetchDirections();
  }, []);

  useEffect(() => { 
    const fetchAgencies = async () => {
      try {
        const { data, error } = await getAgency();
        if (data) {
          setAgencyData(data);
        }
        if (error) {
          throw error;
        }
      } catch (error: any) {
        setError(error);
        toast.error(error.message || 'Failed to fetch agencies');
      }
    };

    fetchAgencies();
  }, []);

  const optionsData = directionData.map((direction) => ({ 
    id: direction.code_direction,
    name: direction.name,
  }));

  const avenueOptions = agencyData.map((agency) => ({
    id: agency.code_agency,
    name: agency.name
  }));

  return (
    <div className="">
      <Breadcrumb pageName="Direction" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9 border p-4">
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
                {errors?.name && <p className="mt-1 text-sm text-red-600">Name is required</p>}
              </div>
              <div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex w-1/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>

          <TableUI label="Direction" loading={loading} tableData={directionData} />
        </div>

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-fit">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-extrabold text-2xl text-black dark:text-white">
              Agency Information
              {loading && (
                <FallingLines
                  color="#4fa94d"
                  width="100"
                  visible={true}
                />
              )}
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
                name="name"
                value={agencyName}
                placeholder="Agency name"
                register={registerAgency}
                onChange={handleInputChangeAgency}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errorsAgency.name && <p className="mt-1 text-sm text-red-600">Name is required</p>}
            </div>
            <div>
              <SelectForm
                onChangeSelect={handleSelectChangeAgency}
                label="Direction"
                options={optionsData}
                value={agencySelect}
                register={registerAgency}
                name="code_direction"
              />
              {errorsAgency.code_direction && <p className="mt-1 text-sm text-red-600">Direction is required</p>}
            </div>
            <div>
              <button 
                type="submit"
                className="flex w-1/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
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
                label="name"
                name="name"
                value={avenueName}
                placeholder="Avenue name"
                register={registerAvenue}
                onChange={handleInputChangeAvenue}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errorsAvenue.name && <p className="mt-1 text-sm text-red-600">Name is required</p>}
            </div>
            <div>
              <SelectForm
                onChangeSelect={handleSelectChangeAvenue}
                label="Agency"
                options={avenueOptions}
                value={avenueSelect}
                register={registerAvenue}
                name="code_agency"
              />
              {errorsAvenue.code_agency && <p className="mt-1 text-sm text-red-600">Agency is required</p>}
            </div>
            <div>
              <button 
                type="submit"
                className="flex w-1/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Direction;