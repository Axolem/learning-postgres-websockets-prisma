import { useEffect, useState } from "preact/hooks";

import { useAuth } from "../utils/AuthContext";

import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

const Home = () => {
  const { logout, user } = useAuth();

  return (
    <div>
      <Card className="p-0 m-0" role="region">
        <div className="flex justify-content-between">
          <div>
            <h1 className="m-0 p-0">Home</h1>
          </div>
          <div>
            <Avatar
              //label={user.username.substring(0, 2).toUpperCase()}
              size="large"
              style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
              shape="circle"
              className="p-mr-2 cursor-pointer p-shadow-2"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;
