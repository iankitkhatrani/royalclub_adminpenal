import React, { Fragment } from 'react';
import { Card, CardBody, CardHeader, Container } from 'reactstrap';
import { H5 } from '../../AbstractElements';
import TodoLists from './TodoLists';

const TodoContain = ({ title, data }) => {
  return (
    <Fragment>
      <Container fluid={true} className='email-wrap bookmark-wrap todo-wrap h-full mb-3'>
        <Card className='h-full'>
          <CardHeader className='d-flex align-items-center justify-content-between'>
            <H5 className="f-12">{title}</H5>
          </CardHeader>
          <CardBody className='p-2'>
            <div className='todo'>
              <div className='todo-list-wrappers'>
                <TodoLists data={data} />
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};
export default TodoContain;
