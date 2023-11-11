import React from 'react';
import styles from './Textarea.module.css'

interface TextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    register?: any
    height?: number
    error?: string
    children?: React.ReactNode
}

const Textarea: React.FC<TextAreaProps> = ({register, height, error, children, ...props}) => (
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