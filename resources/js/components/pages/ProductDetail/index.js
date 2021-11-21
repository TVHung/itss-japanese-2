import React, { Component, useState } from "react";
import MoreDetails from "./moreDetails";
import StarIcon from "./stars"
import Comment from "./comment";
import { Button } from "antd";

export default function ProductDetail() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-7"
                    style={{ marginTop: 10, textAlign: "center" }}
                >
                    <div> <img
                        style={{
                            width: 300,
                            height: 300,
                            marginTop: 30,
                        }}
                        src={"https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg"}
                    />
                    </div>
                    <label style={{ fontSize: 20, fontWeight: 'bold' }}>Điện thoại Samsung Galaxy Z Fold3 5G 512GB</label>
                    <p style={{ fontSize: 25, color: 'red', fontWeight: 'bold' }}>15.000.000</p>
                    <label style={{ width: 200, fontSize: 20, fontWeight: "bold", backgroundColor: "#ff00004d" }}> 平均製品評価</label>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                        <label style={{ paddingRight: 30, fontSize: 20, fontWeight: 'bold' }}> 評価 </label>
                        <StarIcon />
                    </div>
                    <label style={{ width: 200, fontSize: 20, fontWeight: "bold", backgroundColor: "#ff00004d" }}> 同様の製品</label>
                    <div className="row">
                        <div className="col-3"><MoreDetails></MoreDetails></div>
                        <div className="col-3"><MoreDetails></MoreDetails></div>
                        <div className="col-3"><MoreDetails></MoreDetails></div>
                        <div className="col-3"><MoreDetails></MoreDetails></div>
                    </div>
                </div>
                <div className="col-5" style={{ marginTop: 10 }}>
                    <div
                        style={{
                            display: "flex",
                            marginTop: 30,
                        }}>
                        <div className="row">
                            <div className="col-4">
                                <label style={{ fontWeight: "bold", fontSize: 18 }}>店舗詳細</label>
                            </div>
                            <div className="col-8">
                                <label style={{ fontSize: 15 }}>
                                    商品の詳細商品の詳細商品の詳細商品の詳細商品の詳細商品の詳細商品の詳細
                                </label>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <div className="row">
                            <div className="col-4">
                                <label style={{ fontWeight: "bold", fontSize: 18 }}>店舗詳細</label>
                            </div>
                            <div className="col-8">
                                <label style={{ fontSize: 15 }}>
                                    商品の詳細商品の詳細商品の詳細商品の詳細商品の詳細商品の詳細商品の詳細
                                </label>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", marginTop: 10 }}>
                        <label style={{ paddingRight: 30, fontSize: 20, fontWeight: 'bold' }}> 評価 </label>
                        <StarIcon />
                    </div>
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <div className="valuate" style={{ textAlign: 'center', width: 300, border: "2px solid red" }}>
                        <p> Ban Danh Gia san Pham nhu the nao</p>
                        <StarIcon />
                        <form>
                            <input type="text" />
                        </form>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                            <Button style={{ border: 'none' }}>Gui di</Button>
                            <Button style={{ border: 'none' }}>Huy </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}