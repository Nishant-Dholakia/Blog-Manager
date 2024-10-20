import React, { Children } from 'react'

function Container({Children}) {
  return (
    <div className='w-full'>
        
    {Children}    
    </div>
  )
}

export default Container