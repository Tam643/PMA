import React from 'react'
import PropTypes from 'prop-types'
import { cn } from '@/Untils/cn'

const Table = ({ children, className, ...props }) => {
  return (
    <>
      <table
        {...props}
        className={cn(['w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400', className])}
      >
        {children}
      </table>
    </>
  )
}

const Thead = ({ children, className, ...props }) => {
  return (
    <thead
      {...props}
      className={
        cn(['text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500', className])
      }
    >
      <tr className='text-nowrap'>
        {children}
      </tr>
    </thead>
  );
}

const Tbody = ({ children, className, ...props }) => {
  return (
    <tbody
      {...props}
      className={className}
    >
      <tr className='bg-'>
        {children}
      </tr>
    </tbody>
  );
}

const Th = ({ children, className, ...props }) => {
  return (
    <th
      {...props}
      className={cn(['px-3 py-2', className])}
    >
      {children}
    </th>
  );
}

const Td = ({ children, className, ...props }) => {
  return (
    <td
      {...props}
      className={className}
    >
      {children}
    </td>
  );
}


export default Table