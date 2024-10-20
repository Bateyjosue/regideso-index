import { PropsWithChildren } from "react";
import { BRAND } from "../../data/types/brand";
import { ITableProps } from "../../data/types";
import classNames from 'classnames';


interface ItableProps {
  label?: string
  tableData: ITableProps[]
}


const TableUI: React.FC<PropsWithChildren<ItableProps>> = (props) => {
  const { label,tableData } = props
  const TableStyle = classNames({
    'grid rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4': !(label === 'Direction'),
    'grid rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3': label === 'Direction',
  })

  const rowStyle = classNames({
    'grid grid-cols-4 sm:grid-cols-4': !(label === 'Direction'),
    'grid grid-cols-3 sm:grid-cols-3': label === 'Direction',
  })

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-bold font-semibold text-black dark:text-white">
        {label}
      </h4>

      <div className="flex flex-col">
        <div className={TableStyle}>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Local ID
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Created Date
            </h5>
          </div>
          {
            !(label === 'Direction') && (
              <div className={`${label === 'Direction'? 'hidden' : ''} p-2.5 text-center sm:block xl:p-5`}>
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Code {label}
                </h5>
              </div>

            )
          }
        </div>

        {tableData.map((data, key) => (
          <div
            className={`${rowStyle} ${
              key === tableData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white sm:block">
                {data.id}
              </p>
            </div>

            <div className="flex items-center p-2.5 xl:p-5 ">
              <p className="text-black dark:text-white">{data.name}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{data?.createdAt.toDateString()}</p>
            </div>
          
            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {
                  (label === 'Agency')
                    ? data.code_direction
                    : (label === 'Avenue')
                      ? data.code_agency
                      : ''
                }
              </p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableUI;