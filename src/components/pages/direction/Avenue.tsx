import { ITableProps } from "../../../data/types";
import Breadcrumb from "../../ui/Breadcrumb";
import TableUI from "../../ui/Table";

const data: ITableProps[] = [
  {
    id: '1',
    name: 'Itebero',
    createdAt: new Date('2024-10-20'),
    code_agency: 'code_agency',
  },
  {
    id: '1',
    name: 'Itebero',
    createdAt: new Date('2024-10-20'),
    code_agency: 'code_agency',
  },
  {
    id: '1',
    name: 'Itebero',
    createdAt: new Date('2024-10-20'),
    code_agency: 'code_agency',
  }
]

const Avenue = () => {
  return (
    <div>
      <Breadcrumb pageName="Agency" />
      <section>
        <TableUI label="Avenue" tableData={data}/>
      </section>
    </div>
  )
}

export default Avenue;