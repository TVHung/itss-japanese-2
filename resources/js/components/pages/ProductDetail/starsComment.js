import React, { useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

export default function StarIconComment() {
    const [rate, setRate] = useState(0)

    const logItem = (id) => {
        setRate(id)
        console.log(rate);
    }
    return (
        <div>
            <FaStar onClick={() => { logItem(1) }} style={{
                fontSize: 15,
                color:
                    1 <= rate
                        ? "#fcec00"
                        : "grey"
            }} />
            <FaStar onClick={() => { logItem(2) }} style={{
                fontSize: 15,
                color:
                    2 <= rate
                        ? "#fcec00"
                        : "grey"
            }} />
            <FaStar onClick={() => { logItem(3) }} style={{
                fontSize: 15,
                color:
                    3 <= rate
                        ? "#fcec00"
                        : "grey"
            }} />
            <FaStar onClick={() => { logItem(4) }} style={{
                fontSize: 15,
                color:
                    4 <= rate
                        ? "#fcec00"
                        : "grey"
            }} />
            <FaStar onClick={() => { logItem(5) }} style={{
                fontSize: 15,
                color:
                    5 <= rate
                        ? "#fcec00"
                        : "grey"
            }} />
        </div >
    );
}