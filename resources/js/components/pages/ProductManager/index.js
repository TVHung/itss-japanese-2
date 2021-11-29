import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import "./productManager.scss";
import ProductManagerList from "../../layouts/ProductManagerList";
import imgTest1 from "../../../assets/images/shop.png";
import { fetchShopProduct } from "./../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Detail() {
    const dispatch = useDispatch();
    const fetchShopProducts = () => {
        dispatch(fetchShopProduct());
    };

    useEffect(() => {
        fetchShopProducts();
    }, []);

    const all_shop_product_datas = useSelector(
        (state) => state.product.shop_products
    );

    return (
        <div id="productManagerContainer">
            <div className="product-handler">
                <h3>エクスポート↓</h3>
                <div>
                    <Link to="/product/create">
                        <Button
                            className="btn-action"
                            variant="contained"
                            color="primary"
                            style={{ marginRight: 30 }}
                        >
                            <i className="fas fa-plus-circle icon-btn"></i>
                            新しい商品を追加
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="product-list">
                <ProductManagerList dataList={all_shop_product_datas} />
            </div>
        </div>
    );
}
