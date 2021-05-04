import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@material-ui/core";
import { Pod } from "../../interfaces";
import { podApi } from "../../services/pod-api";

interface PodPickerProps {
  pods?: Pod[];
  onChange?: (pod?: Pod) => void;
}

export function PodPicker({ pods: podsParameter, onChange }: PodPickerProps) {
  const [pods, setPods] = useState(podsParameter);

  useEffect(() => {
    if (!podsParameter) {
      podApi.get().then(({ data }) => {
        setPods(data);
      });
    }
  }, [podsParameter]);

  return (
    <Select
      onChange={(event) =>
        event.target &&
        onChange &&
        pods?.find((p) => p.id === event.target.value) &&
        onChange(pods?.find((p) => p.id === event.target.value))
      }>
      <MenuItem value=''>
        <em>Nenhuma Pod Selecionada</em>
      </MenuItem>
      {pods?.map((pod) => (
        <MenuItem value={pod.id}>{pod.name}</MenuItem>
      ))}
    </Select>
  );
}
