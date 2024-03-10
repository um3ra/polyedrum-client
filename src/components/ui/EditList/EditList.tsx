import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Input } from "../../ui";
import styles from "./EditList.module.css";
import { IGenre } from "../../../@types/genreType";
import { useGetGenresQuery } from "../../../store/genre/genreAPI";
import { useFieldArray } from "react-hook-form";

interface EditListProps {
    messages: {
        success?: string;
        error?: string;
    };
    list?: IGenre[];
    deleteCallback: (name: string) => void;
    addCallback: () => void;
    title?: string;
    registerBtn: any;
}

const EditList: React.FC<EditListProps> = ({
    messages,
    list,
    deleteCallback,
    addCallback,
    title,
    registerBtn
}) => {
    const { success, error } = messages;

    return (
        <div>
            <h3>{title}</h3>
            {list?.length ? (
                <ul className={styles.editList}>
                    {list.map((item) => {
                        return (
                            <li key={item.id}>
                                <div onClick={() => deleteCallback(item.name)}>
                                    <AiOutlineDelete
                                        cursor={"pointer"}
                                        color={"red"}
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <span>No {title}</span>
            )}
            {error && (
                <div>
                    <span className={"errorMessage"}>{error}</span>
                </div>
            )}
            {success && (
                <div>
                    <span className={"successMessage"}>{success}</span>
                </div>
            )}
            <p>add new genre</p>

            <Input {...registerBtn} placeholder={"add new"} />
            <Input
                onClick={addCallback}
                type={"button"}
                value={`add new ${title}`}
            />
        </div>
    );
};

export default EditList;
