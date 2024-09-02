import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { H4 } from '../../../AbstractElements';
import SvgIcon from '../Component/SvgIcon';
import CountUp from 'react-countup';
const SmallWidgets = ({ color, icon, title, total, gros, prefix, suffix, mainClass }) => {
  return (
    <Card className={`small-widget ${mainClass ? mainClass : ''}`}>
      <CardBody className={color}>
        <span className='f-light'>{title}</span>
        <div className='d-flex align-items-end gap-1'>
          <H4 attrH4={{className:'f-light'}}>
            <CountUp suffix={suffix ? suffix : ''} prefix={prefix ? prefix : ''} duration={0} separator=',' end={total} />
          </H4>
          {
            gros &&
            <span className={`font-${color} f-12 f-w-500`}>
              <i className={`icon-arrow-${gros < 50 ? 'down' : 'up'}`} />
              <span>
                {gros < 50 ? '-' : '+'}
                {gros}%
              </span>
            </span>
          }
        </div>
        <div className='bg-gradient'>
          <SvgIcon iconId={icon} className='stroke-icon svg-fill' />
        </div>
      </CardBody>
    </Card>
  );
};

export default SmallWidgets;
