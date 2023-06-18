import React, { memo } from 'react';
import { Audio } from 'react-loader-spinner';

export default memo(function AudioLoad() {
    return (
        <div style={{ border: '4px solid #fff', borderRadius: '50%', padding: '6px' }}>
            <Audio
                height="24"
                width="24"
                color="#fff"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
            />
        </div>
    );
});
