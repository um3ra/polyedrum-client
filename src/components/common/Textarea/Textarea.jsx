import React from 'react';
import styles from './Textarea.module.css'

const Textarea = ({register, height, error, children, ...props}) => (
    <>
        <textarea {...register}
                  {...props}
                  style={{height: `${height?`${height}px`:'100px'}`}}
                  className={`${styles.textarea} ${error&&styles.error}`}>
            {children}
        </textarea>
        {error&&<div className={"errorMessage"}>{error}</div>}
    </>
);

export default Textarea;