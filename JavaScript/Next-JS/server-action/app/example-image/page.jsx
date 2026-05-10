import React from 'react'
import Image from 'next/image'

function ExampleImage() {
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <Image src="/vercel.svg"

                alt="Example Image" width={100} height={100} />
        </div>
    )
}

export default ExampleImage