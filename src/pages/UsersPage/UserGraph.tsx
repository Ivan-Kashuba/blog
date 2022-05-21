import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { User } from "../../types/models";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

type props_T = {
  allUsers: Array<User>;
};

const UserGraph = ({ allUsers }: props_T) => {
  let users2021Count = 0;
  let users2022Count = 0;
  let total = 0;

  if (allUsers.length > 500) {
    allUsers.forEach((user) => {
      const date = user.dateCreated?.slice(0, 4);
      total = allUsers.length;
      if (date === "2021") {
        users2021Count++;
      } else if (date === "2022") {
        users2022Count++;
      }
    });
  }

  return (
    <div>
      <div className="userGraph">
        <h3 className="statisticHeader">Users Registration Statistic</h3>
        <Bar
          data={{
            labels: ["Total", "2021", "2022"],
            datasets: [
              {
                label: "Users Registration",
                data: [total, users2021Count, users2022Count],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default UserGraph;
