import React, { useEffect } from "react";

import GridItem from "../../../layout/components/Grid/GridItem";
import GridContainer from "../../../layout/components/Grid/GridContainer";
import { PodCard } from "../../../pod/components/PodCard/PodCard";
import { podApi } from "../../../pod/services/pod-api";

import { Pod } from "../../../pod/interfaces";

// import sound from "../../../assets/sounds/bell.mp3";
// import useStyles from "./dashboardStyle";

export function DashboardPage() {
  // const classes = useStyles();
  const [pods, setPods] = React.useState<Pod[]>();

  // function soundAlarm() {
  //   var audio = new Audio(sound);

  //   const interval = setInterval(() => {
  //     audio.play();
  //   }, 2000);
  // }

  useEffect(() => {
    async function fetchPods() {
      const newPods = await podApi.get();
      setPods(newPods);
    }

    fetchPods();
  }, []);

  return (
    <div>
      <GridContainer>
        {pods?.map((pod) => (
          // @ts-ignore */}
          <GridItem key={pod.id} xs={12} sm={6} md={4}>
            <PodCard pod={pod} />
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
}
