import React from 'react'
import { Table } from 'reactstrap'
import Empty from '../Empty/Index'

const TodoLists = ({ data }) => {
  return (
    <>
      <div className='table-responsive'>
        <Table hover={true} className='table-border-horizontal table-light'>
          <thead>
            <tr>
              <th scope='col'>Sl.No</th>
              <th scope='col'>Name</th>
              <th scope='col'>Chips</th>
              <th scope='col'>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.chips}</td>
                <td>
                  {
                    item.status === false && (
                      <span className={`badge badge-light-danger`}>DEACTIVE</span>
                    )
                  }
                  {
                    item.status === true && (
                      <span className={`badge badge-light-success`}>ACTIVE</span>
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {
        data?.length <= 0 && (
          <Empty type='small'/>
        )
      }
    </>
  )
}

export default TodoLists