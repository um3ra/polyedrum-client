import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import styles from "./AdminContent.module.css";

interface AdminPanelProps {
    data: Record<string, any>[];
    onDelete?: (id: number) => void;
    goEditPage?: (name: string) => void;
}

export const AdminContent = ({
    data,
    onDelete,
    goEditPage
}: AdminPanelProps) => {
    if (!data.length) {
        return <div>Empty</div>;
    }

    const dataKeys = data && Object.keys(data[0]);
    const withButtons = onDelete && goEditPage;

    return (
        <div className={styles.wrapper}>
            {dataKeys.map((key, keyIdx) => (
                <ul key={key} className={styles.keysLists}>
                    <li>
                        <h3>{key.toUpperCase()}</h3>
                        <ul className={styles.valuesList}>
                            {data.map((val, i) => (
                                <li key={val["id"] ? val["id"] : i + val[key]}>
                                    <span>{val[key] || "-"}</span>

                                    {keyIdx + 1 === dataKeys.length &&
                                        withButtons && (
                                            <div className={styles.btnWrapper}>
                                                <button
                                                    onClick={() =>
                                                        goEditPage(
                                                            val["name"] ||
                                                                val["title"]
                                                        )
                                                    }
                                                >
                                                    <AiOutlineEdit />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        onDelete(val["id"])
                                                    }
                                                >
                                                    <AiOutlineDelete />
                                                </button>
                                            </div>
                                        )}
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            ))}
        </div>
    );
};
