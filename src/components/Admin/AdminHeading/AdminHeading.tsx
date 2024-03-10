import styles from "./AdminHeading.module.css";

interface AdminHeadingProps {
    title: string;
    count?: number | null;
    btnRender?: () => JSX.Element;
}

export const AdminHeading = ({
    title,
    btnRender,
    count
}: AdminHeadingProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <h2>{title}</h2>
                <span>{count}</span>
            </div>

            {btnRender && <div>{btnRender()}</div>}
        </div>
    );
};
