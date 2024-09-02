import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { H5, H6 } from '../../../AbstractElements';
import RadialChart from './RadialChart';
import { dispatched, returnbox, product, category, freshLeeds } from '../../../Data/svgIcons';

const SocialWidget = (props) => {
  const num = props.increment ? props.increment : 0
  const chart = {
    color: [props.color],
    series: [num]
  };

  return (
    <Card className='social-widget widget-hover'>
      <CardBody>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center gap-2'>
            <div className='social-icons d-flex align-items-center justify-content-center'>
              {props.icon === 'user' && (<>{category}</>)}
              {props.icon === 'admin' && (<>{freshLeeds}</>)}
              {props.icon === 'agent' && (<>{dispatched}</>)}
              {props.icon === 'return' && (<>{returnbox}</>)}
              {props.icon === 'later' && (<>{product}</>)}
              {/* {props.title === 'Status' && (<>{neworder}</>)} */}
            </div>
          </div>
        </div>
        {/* <div>
          <H5 attrH5={{ className: 'mb-1' }}>{props.data}</H5>
        </div> */}
        <div className='pt-2'>
          <H6 attrH6={{ className: 'f-light' }} >{props.title}</H6>
        </div>
        <div className='social-content'>
          <div>
            <H5 attrH5={{ className: 'mb-1 f-light' }}>{props.data}</H5>
          </div>
          <div className='social-chart'>
            <RadialChart chartData={chart} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SocialWidget;
