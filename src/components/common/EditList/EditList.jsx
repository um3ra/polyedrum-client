import React from 'react';
import {AiOutlineDelete} from "react-icons/ai";
import {Input} from "../../common";
import styles from "./EditList.module.css";

const EditList = ({
                      messages,
                      list,
                      deleteCallback,
                      addCallback,
                      title,
                      registerBtn
                  }) => {

    const {success, error} = messages;

    return (
        <div>
            <h3>
                {title}
            </h3>


            {list.length ?
                <ul className={styles.editList}>
                    {list.map(item => {
                        return (
                            <li key={item.id}>
                                <span>{item.name}</span>
                                <div onClick={() => deleteCallback(item.name)}>
                                    <AiOutlineDelete cursor={"pointer"} color={"red"}/>
                                </div>
                            </li>
                        )
                    })}
                </ul> :
                <span>No {title}</span>
            }

            {error &&
                <div><span className={"errorMessage"}>{error}</span></div>}
            {success &&
                <div><span className={"successMessage"}>{success}</span></div>
            }
            <p>add new genre</p>

            <Input register={{
                ...registerBtn
            }} placeholder={"add new"}/>
            <Input onClick={addCallback} type={"button"} value={`add new ${title}`}/>
        </div>
    );
};

export default EditList;