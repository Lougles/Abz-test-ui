import React from 'react';
import Token from "../components/Token";
import Positions from "../components/Positions";
import User from "../components/User";


const MainPage = () => {
  return (
    <div style={{minHeight: '300vh'}}>
      <Token />
      <Positions />
      <User />
    </div>
  )
}

export default MainPage;
