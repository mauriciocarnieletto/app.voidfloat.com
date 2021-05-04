export interface NetworkConfiguration {
  id?: number;
  name?: string;
  clientId: number;
  sshPort?: string;
  hostname?: string;
  gatewayIp?: string;
  localIp?: string;
  publicIp?: string;
  subnet?: string;
  podPingEndpoint?: string;
  podPort?: number;
}

export interface PodCommandDTO {
  id: number;
  time?: number;
  command: number;
}
