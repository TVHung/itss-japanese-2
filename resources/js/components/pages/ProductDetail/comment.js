import React, { Component } from 'react';
import styled from "styled-components";
import StarIconComment from './starsComment';

const Logo = styled.img`
width: 50px;
height: 50px;
border-radius: 25px;
`;

export default function Comment() {
  return (
    <div className="Comment">
      <div className="row"
        style={{ width: 500, background: "#f1c40f5e", marginBottom: 10 }}>
        <div className="col-2"
          style={{ textAlign: "center" }}
        >
          <Logo src={"https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg"} />
        </div>
        <div className="col-10" >
          <label>Phan Van Tai Em</label>
          <StarIconComment />
          <label>San pham khong co chuc nang chua benh</label>
        </div>
      </div>
    </div>
  );
}
