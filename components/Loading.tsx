import React from 'react'
import { MoonLoader } from 'react-spinners'


const Loading = ({ loading, size }: any) => {

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    return (
        <div className='my-10'>
            <MoonLoader
                color="gray"
                loading={loading}
                cssOverride={override}
                size={size}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Loading