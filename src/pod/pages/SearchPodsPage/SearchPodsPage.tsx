import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "@material-ui/core";
import GridItem from "../../../layout/components/Grid/GridItem";
import GridContainer from "../../../layout/components/Grid/GridContainer";
import { PodCard } from "../../components/PodCard/PodCard";
import { Pod } from "../../interfaces";
import { networkConfigurationApi } from "../../../configuration/services/server-configuration-api";
import { NetworkConfiguration } from "../../../configuration/interfaces";
import { PodForm } from "../../components/PodForm";

import useStyles from "./styles";

interface AddPodModalFormProps {
  pod: Pod;
  onSubmit: (pod: Pod) => void;
}

export function AddPodModalForm({ pod, onSubmit }: AddPodModalFormProps) {
  const classes = useStyles();
  return (
    <Modal open>
      <div className={classes.modalBody}>
        <div className={classes.form}>
          <PodForm onAfterSubmit={onSubmit} pod={pod} />
        </div>
      </div>
    </Modal>
  );
}

export function LoadingMessage() {
  return (
    <div>
      <p>Procurando por pods na sua rede.</p>
      <p>Isso pode demorar um pouco.</p>
      <>Loading</>
    </div>
  );
}

export function SearchPodsPage() {
  const classes = useStyles();
  const [pods, setPods] = React.useState<Pod[]>();
  const [addingPod, setAddingPod] = React.useState<Pod>();
  const [
    showServerConfigurationForm,
    setShowServerConfigurationForm,
  ] = React.useState(false);
  const [
    serverNetworkConfiguration,
    setServerNetworkConfiguration,
  ] = React.useState<NetworkConfiguration>();
  const [isLoading, setIsLoading] = React.useState<boolean>();

  function handlePodSubmit(pod: Pod) {
    setAddingPod(undefined);
  }

  function handleAddPodClick(pod: Pod) {
    setAddingPod({
      id: pod.id,
      name: pod.name,
      model: pod.model,
      ipAddress: pod.ipAddress,
      serialNumber: pod.screen?.serial || "",
      hostname: pod.hostname,
    });
  }

  useEffect(() => {
    setIsLoading(true);
    networkConfigurationApi.get().then(({ data: serverConfiguration }) => {
      if (!serverConfiguration) setShowServerConfigurationForm(true);
      setServerNetworkConfiguration(serverConfiguration);
    });
  }, []);

  useEffect(() => {
    if (serverNetworkConfiguration) {
      networkConfigurationApi
        .searchPods()
        .then(({ data }) => {
          if (data) {
            data.forEach((pod) => {
              pod.name = pod.hostname;
            });
          }
          setPods(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [serverNetworkConfiguration]);

  if (showServerConfigurationForm)
    return <>Voc?? precisa configurar o servidor</>;

  if (isLoading) return <LoadingMessage />;

  return pods?.length === 0 ? (
    <div>
      <p>N??o encontramos pods em sua rede autom??ticamente.</p>
      <p>
        Clique <Link to='/pods/create'>aqui</Link> para adicionar uma.
      </p>
    </div>
  ) : (
    <div>
      <GridContainer>
        {pods &&
          pods.length > 0 &&
          pods.map((pod) => (
            <GridItem key={pod.id} xs={12} sm={6} md={4}>
              <div className={classes.cardWrapper}>
                <PodCard pod={pod} />
                {!pod.id && (
                  <div className={classes.cardWrapperOverlay}>
                    <div className={classes.cardWrapperContent}>
                      <Button
                        variant='contained'
                        color='secondary'
                        onClick={() => handleAddPodClick(pod)}>
                        Adicionar aos meus pods
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </GridItem>
          ))}
      </GridContainer>
      {addingPod && (
        <AddPodModalForm pod={addingPod} onSubmit={handlePodSubmit} />
      )}
    </div>
  );
}
