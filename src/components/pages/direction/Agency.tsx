import { PropsWithChildren } from "react";
import Breadcrumb from "../../ui/Breadcrumb";
import TableUI from "../../ui/Table";
import { ITableProps } from "../../../data/types";

const data: ITableProps[] = [
  {
    id: '1',
    name: 'Itebero',
    createdAt: new Date('2024-10-20'),
    code_direction: 'code_direction',
  },
  {
    id: '1',
    name: 'Itebero',
    createdAt: new Date('2024-10-20'),
    code_direction: 'code_direction',
  },
  {
    id: '1',
    name: 'Itebero',
    createdAt: new Date('2024-10-20'),
    code_direction: 'code_direction',
  }
]

const Agency:React.FC = () => {
  return (
    <div>
      <Breadcrumb pageName="Agency" />
      <section>
        <TableUI label="Agency" tableData={data}/>
      </section>
    </div>
  )
}

export default Agency;