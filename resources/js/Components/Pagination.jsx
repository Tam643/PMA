import { cn } from '@/Untils/cn'
import { Link } from '@inertiajs/react'
import React from 'react'

const Pagination = ({links}) => {
  return (
    <nav className='text-center mt-4'>
        {
            links.map(link => (
               <React.Fragment key={link.label}>
                    {
                        link.url && !link.active ?
                        (
                            <Link 
                            href={link.url}
                            dangerouslySetInnerHTML={{__html: link.label}}
                            className={cn(['inline-block py-2 px-3 rounded-lg text-gray-200 text-sm hover:bg-gray-950'
                            ])}
                            ></Link>
                        ) : (
                            <span 
                            dangerouslySetInnerHTML={{__html: link.label}}
                            className={cn(['inline-block py-2 px-3 rounded-lg text-gray-200 text-sm cursor-not-allowed',
                                {'bg-gray-950' : link.active},
                                {'text-gray-500' : !link.url} 
                            ])}
                            ></span>
                        )
                    }
               </React.Fragment>
            ))
        }
    </nav>
  )
}

export default Pagination