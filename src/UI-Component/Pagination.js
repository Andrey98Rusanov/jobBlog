import React from 'react';
import { Pagination } from 'antd';
import "./Pagination.css"
const Paginations = () => <Pagination className='pagination' defaultCurrent={1} total={50} />;
export default Paginations;