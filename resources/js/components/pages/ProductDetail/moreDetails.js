import React, { Component } from 'react';
import styled from "styled-components";

const More = styled.div`
margin-top: 25px;
`;
console.log("detail");

const Logo = styled.img`
width: 120px;
height: 120px;
`;

export default function MoreDetails() {
    return (
        <div className="MoreDetails">
            <More>
                <Logo src={"https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg"} />
                <p>Shgfasgffsafsafsafas</p>
            </More>
        </div>
    );
}