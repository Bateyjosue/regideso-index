import { BRAND } from "../../data/types/brand";


const brandData: BRAND[] = [
  {
    name: 'Itebero',
    visitors: 'Joram',
    revenues: '2024-10-20',
    sales: 'tuyaux casser bloquer la route',
  },
  {
    name: 'Itebero',
    visitors: 'Joram',
    revenues: '2024-10-20',
    sales: 'tuyaux casser bloquer la route',
  },
  {
    name: 'Itebero',
    visitors: 'Joram',
    revenues: '2024-10-20',
    sales: 'tuyaux casser bloquer la route',
  },
  {
    name: 'Itebero',
    visitors: 'Joram',
    revenues: '2024-10-20',
    sales: 'tuyaux casser bloquer la route',
  },
  {
    name: 'Itebero',
    visitors: 'Joram',
    revenues: '2024-10-20',
    sales: 'tuyaux casser bloquer la route',
  },
];


const TopLeaks = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Last Leaks
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Avenue
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Agent
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Observation
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-4 sm:grid-cols-4 ${
              key === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center p-2.5 xl:p-5 ">
              <p className="text-black dark:text-white">{brand.visitors}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">${brand.revenues}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.sales}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopLeaks;
