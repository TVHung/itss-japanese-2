import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiCategory, apiProduct } from "../../constant";
import { getCookie } from "./../../utils/cookie";
import storage from "../../services/firebaseConfig";
import Loading from "../../layouts/Loading";
import "./create.scss";

const maxFileSize = 1024 * 1024;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
class CreateProduct extends Component {
    fileRef = React.createRef();
    constructor(props) {
        super(props);
        this.fileRef = React.createRef();
        this.state = {
            content: "",
            image_link: "",
            category: "",
            file: undefined,
            errormessage: "",
            successmessage: "",
            price: "",
            name: "",
            url: "",
            image: {},
            stock: 1,
            discount: 0,
            categories: [],
            isLoading: false,
            isSubmit: false,
        };
    }

    componentWillUnmount() {
        this.setState({
            content: "",
            image_link: "",
            category: "",
            file: undefined,
            errormessage: "",
            successmessage: "",
            price: "",
            name: "",
            url: "",
            image: {},
            stock: null,
            discount: null,
            categories: [],
            isLoading: false,
            isSubmit: false,
        });
    }

    onBtnClick = () => {
        this.fileRef.current.click();
    };
    handleReturnHomePage = () => {
        this.setState({
            successmessage: "",
        });
        window.location.href = `/product/manager`;
    };
    //xu li ten cua san pham
    handleNameChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            name: event.target.value,
        });
    };

    handleCategoryChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            category: event.target.value,
        });
    };
    //xu li gia cua san pham
    handlePriceChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            price: event.target.value,
        });
    };
    handleContentChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            content: event.target.value,
        });
    };
    handleStockChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            stock: event.target.value,
        });
    };
    handleDiscountChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            discount: event.target.value,
        });
    };

    handleFileChange = (event) => {
        this.setState({
            successmessage: "",
        });
        const file = event.target.files[0];
        if (!imageFileRegex.test(file.name)) {
            this.setState({
                errormessage: "?????????????????????",
            });
        } else if (file.size > maxFileSize) {
            this.setState({
                errormessage: "1MB??????????????????????????????????????????????????????",
            });
        } else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                this.setState({
                    errormessage: "",
                    file: file,
                    url: fileReader.result.split(",")[1],
                    image_link: fileReader.result,
                    image: file,
                });
            };
        }
    };
    handleFormSubmit = (event) => {
        event.preventDefault();
        this.setState({
            successmessage: "",
        });
        if (!this.state.name) {
            this.setState({
                errormessage: "?????????????????????????????????????????????",
            });
        } else if (!this.state.image_link) {
            this.setState({
                errormessage: "?????????????????????????????????????????????",
            });
        } else {
            if (!this.state.content) {
                this.setState({
                    errormessage: "?????????????????????????????????????????????",
                });
            } else {
                if (!this.state.price || this.state.price < 0) {
                    this.setState({
                        errormessage: "?????????????????????????????????????????????????????????",
                    });
                } else {
                    if (isNaN(this.state.price)) {
                        this.setState({
                            errormessage:
                                "?????????????????????????????????????????????????????????",
                        });
                    } else {
                        if (!this.state.category) {
                            this.setState({
                                errormessage: "????????????????????????????????????",
                            });
                        } else {
                            if (!this.state.stock && this.state.stock < 1) {
                                this.setState({
                                    errormessage:
                                        "???????????????????????????1???????????????????????????",
                                });
                            } else {
                                if (
                                    this.state.discount === "" ||
                                    this.state.discount < 0 ||
                                    this.state.discount > 100
                                ) {
                                    this.setState({
                                        errormessage:
                                            "????????????0??????????????????100???????????????????????????????????????",
                                    });
                                } else {
                                    this.setState({
                                        errormessage: "",
                                    });
                                    storage
                                        .ref(
                                            `/product_img/${this.state.image.name}`
                                        )
                                        .put(this.state.image)
                                        .on(
                                            "state_changed",
                                            (snapShot) => {
                                                // console.log(snapShot);
                                            },
                                            (err) => {
                                                console.log(err);
                                            },
                                            () => {
                                                storage
                                                    .ref("product_img")
                                                    .child(
                                                        this.state.image.name
                                                    )
                                                    .getDownloadURL()
                                                    .then((url) => {
                                                        this.setState({
                                                            isLoadLinkImage: true,
                                                        });
                                                        const packets = {
                                                            name: this.state
                                                                .name,
                                                            price: this.state
                                                                .price,
                                                            category_id:
                                                                this.state
                                                                    .category,
                                                            description:
                                                                this.state
                                                                    .content,
                                                            image_link: url,
                                                            stock: this.state
                                                                .stock,
                                                            discount:
                                                                this.state
                                                                    .discount,
                                                        };
                                                        this.onCreateProduct(
                                                            packets
                                                        );
                                                    });
                                            }
                                        );
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    onCreateProduct = async (packets) => {
        this.setState({
            isSubmit: true,
        });
        const headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
        };
        await axios
            .post(apiProduct, packets, {
                headers: headers,
            })
            .then((response) => {
                toast.success("??????????????????????????????????????????");
                this.setState({
                    content: "",
                    image_link: "",
                    category: "",
                    file: undefined,
                    errormessage: "",
                    successmessage: "",
                    price: "",
                    name: "",
                    url: "",
                    image: {},
                    stock: 1,
                    discount: 0,
                });
                setTimeout(() => {
                    window.location.href = `/product/manager`;
                }, 1000);
            })
            .catch((error) => {
                toast.error("????????????????????????????????????!");
                this.setState({
                    isSubmit: false,
                });
            });
    };

    componentDidMount() {
        this.fetchAllData();
    }

    fetchAllData = async () => {
        await axios
            .get(`${apiCategory}`)
            .then((res) => {
                const dataCategories = res.data.data;
                this.setState({
                    categories: dataCategories,
                    isLoading: true,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return (
            <div
                className="row product-create-container"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    marginTop: 80,
                    minWidth: 600,
                }}
            >
                {this.state.isLoading ? (
                    <div className="form-container">
                        <h3>??????????????????</h3>
                        <form
                            className="form-wrap"
                            onSubmit={this.handleFormSubmit}
                        >
                            <div className="form-group file-input">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={this.onBtnClick}
                                >
                                    ??????????????? ...
                                </button>
                                <input
                                    id="file"
                                    type="file"
                                    className="upload-input"
                                    ref={this.fileRef}
                                    accept="image/*"
                                    onChange={this.handleFileChange}
                                />
                            </div>
                            {this.state.image_link ? (
                                <div className="img-container">
                                    <img
                                        src={`${this.state.image_link}`}
                                        alt="productImg"
                                        className="itemImg"
                                    />
                                </div>
                            ) : null}
                            <div className="form-group">
                                <h5>??????</h5>
                                <input
                                    className="form-control"
                                    placeholder="???????????????????????????????????? ..."
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                />
                            </div>
                            <div className="form-group">
                                <h5>??????</h5>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="4"
                                    placeholder="????????????????????????????????? ..."
                                    value={this.state.content}
                                    onChange={this.handleContentChange}
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <h5>???????????????</h5>
                                <select
                                    className="form-control"
                                    name="????????????????????????????????????????????????..."
                                    value={this.state.category}
                                    onChange={this.handleCategoryChange}
                                >
                                    <option>???????????????</option>
                                    {this.state.categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <h5>??????</h5>
                                <input
                                    className="form-control"
                                    placeholder="?????????????????????????????????..."
                                    value={this.state.price}
                                    onChange={this.handlePriceChange}
                                />
                            </div>
                            <div className="form-group">
                                <h5>??????</h5>
                                <input
                                    className="form-control"
                                    placeholder="?????????????????????????????????..."
                                    type="number"
                                    min={1}
                                    value={this.state.stock}
                                    onChange={this.handleStockChange}
                                />
                            </div>
                            <div className="form-group">
                                <h5>???????????????</h5>
                                <input
                                    className="form-control"
                                    placeholder="?????????????????????????????????..."
                                    value={this.state.discount}
                                    type="number"
                                    min={0}
                                    onChange={this.handleDiscountChange.bind(
                                        this
                                    )}
                                />
                            </div>
                            <div className="form-group"></div>
                            {this.state.errormessage ? (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {this.state.errormessage}
                                </div>
                            ) : null}
                            {this.state.successmessage ? (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {this.state.successmessage}
                                </div>
                            ) : null}
                            <div
                                className="form-group"
                                style={{
                                    textAlign: `center`,
                                    marginBottom: 30,
                                }}
                            >
                                <input
                                    type="submit"
                                    className="btn btn-primary"
                                    value="??????"
                                    style={{ marginRight: 10, width: "20%" }}
                                    disabled={this.state.isSubmit}
                                />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={this.handleReturnHomePage}
                                    style={{ marginLeft: 10, width: "20%" }}
                                    disabled={this.state.isSubmit}
                                >
                                    ???????????????
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        );
    }
}

export default CreateProduct;
