import React, { useState, useEffect } from "react";
import "./navigation.scss";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import Logo from "../../../assets/images/shop.png";
import Search from "./Search";
import axios from "axios";
import { apiLogout } from "../../constant";
import {
    deleteAllCookies,
    deleteCookie,
    getCookie,
} from "./../../utils/cookie";
import { fetchShopId, setShopId } from "./../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { apiGetShop } from "./../../constant/index";

export default function Navigation({ userProfile, loginState }) {
    const [click, setClick] = useState(false);
    const [shopId, setshopId] = useState(null);
    const [shopLink, setShopLink] = useState("");
    const closeMobileMenu = () => setClick(false);
    const dispatch = useDispatch();

    const logout = async () => {
        if (getCookie("access_token") != "") {
            const headers = {
                "Content-type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            };
            await axios
                .post(apiLogout, { data: "mydata" }, { headers: headers })
                .then((res) => {
                    toast.success("Đăng xuất thành công!");
                    deleteCookie("access_token");
                    // deleteAllCookies();
                    window.location.href = `/home`;
                })
                .catch((error) => {
                    toast.error("Đăng xuất không thành công!");
                    console.error(error);
                });
        } else {
            window.location.href = `/home`;
        }
    };
    const fetchShopId = async () => {
        // userProfile.id && dispatch(fetchShopId(userProfile.id))
        const headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
        };
        userProfile.id &&
            (await axios
                .get(`${apiGetShop}/${userProfile.id}`, {
                    headers: headers,
                })
                .then((res) => {
                    const id = res.data;
                    setshopId(id);
                    setShopLink(`/store/${shopId}`);
                    dispatch(setShopId(id));
                })
                .catch((error) => {
                    console.error(error);
                }));
    };

    useEffect(() => {
        fetchShopId();
    }, [userProfile.id, shopId]);

    return (
        <div id="nav">
            <div className="header">
                <div className="logo-nav">
                    <div className="logo-container">
                        <a
                            href="/home"
                            title="Trang chu"
                            style={{
                                padding: 0,
                                margin: 20,
                                backgroundColor: "transparent",
                            }}
                        >
                            <img
                                id="logopersonal"
                                alt="logo"
                                src={Logo}
                                width="50"
                                height="50"
                            />
                        </a>
                        <ul
                            className={
                                click ? "nav-options active" : "nav-options"
                            }
                        >
                            {userProfile.id ? (
                                <>
                                    {shopId ? (
                                        <li className="option">
                                            <a
                                                href={shopLink}
                                                className="underline"
                                            >
                                                ストアのプロフィール
                                            </a>
                                        </li>
                                    ) : (
                                        <li className="option">
                                            <a
                                                href="/store/create"
                                                className="underline"
                                            >
                                                ストアを作成
                                            </a>
                                        </li>
                                    )}
                                </>
                            ) : null}
                            {userProfile.id ? (
                                <li className="option">
                                    <a
                                        href="/product/manager"
                                        className="underline"
                                    >
                                        製品管理
                                    </a>
                                </li>
                            ) : null}
                        </ul>
                    </div>
                </div>
                {!loginState ? (
                    <ul className="signin-up">
                        <li className="sign-in" onClick={closeMobileMenu}>
                            <a href="/login">
                                <i className="fas fa-sign-in-alt icon-btn"></i>
                                ログイン
                            </a>
                        </li>
                        <li className="signup-btn" onClick={closeMobileMenu}>
                            <a href="/register">サインアップ</a>
                        </li>
                    </ul>
                ) : (
                    <ul className="signin-up">
                        <li className="signup-btn" onClick={closeMobileMenu}>
                            <a onClick={() => logout()}>サインアウト</a>
                        </li>
                    </ul>
                )}
            </div>
            <div className="bottomNav">
                <Grid container>
                    <Grid item xs={12} className="searchContainer">
                        <Search />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
