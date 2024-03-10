import { useEffect } from "react";
import { getAllProducts } from "../../../store/products/productsSlice";
import styles from "../AdminPage.module.css";
import { Button, SecondLoader } from "../../ui";
import { useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "../../../store/products/productsAPI";
import Pagination from "../../Pagination/Pagination";
import { useAppDispatch } from "../../../store/store";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AdminContent } from "../AdminContent/AdminContent";
import { AdminHeading } from "../AdminHeading/AdminHeading";

const AdminPageProducts = () => {
    const dispatch = useAppDispatch();
    const products = useTypedSelector((state) => state.products.productList);

    const pagination = useTypedSelector(
        (state) => state.products.filter.pagination
    );

    const [deleteProduct, { data: deleteProductData }] =
        useDeleteProductMutation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllProducts({}));
    }, [dispatch, deleteProductData]);

    if (!products) {
        return <SecondLoader />;
    }

    return (
        <div className={styles.adminContentWrapper}>
            <AdminHeading
                btnRender={() => (
                    <Button onClick={() => navigate("create-product")}>
                        Create new
                    </Button>
                )}
                title="Products"
                count={pagination.totalCount}
            />
            <Pagination pagination={pagination} />

            <AdminContent
                data={products}
                onDelete={deleteProduct}
                goEditPage={(name: string) =>
                    navigate(`update-product/${name}`)
                }
            />
        </div>
    );
};

export default AdminPageProducts;
