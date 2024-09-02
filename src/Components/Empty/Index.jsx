import React from 'react'
// import { Card, Col, Row } from 'react-bootstrap'
import emptyImg from '../../assets/images/no_data.jpg'

const Empty = ({ type }) => {
    return (
        <>
            {type === 'small' && <div className='empty-title h-full p-2 align-items-center justify-content-center'>No Record Found</div>}
            {!type &&
                <div className='empty-container'>
                    <div className="img-container">
                        <img src={emptyImg} alt="" />
                        <div className='empty-title'>No Record Found</div>
                    </div>
                </div>
            }
        </>
    )
}

export default Empty