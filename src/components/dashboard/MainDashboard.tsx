import React, { useState } from 'react';

// const StyledMainDashboard = styled.div`
//   color: white;
// `;
// const Button = styled.button``;

const MainDashboard = () => {
  const [userName, setUserName] = useState('');
  const name = localStorage.getItem('name');
  return (
    <div>
      <h1>Welcome back! {name}</h1>
      <h3>ready to stay fit?</h3>
      {/* <WorkoutsView /> */}
    </div>
  );
}
export default MainDashboard;
