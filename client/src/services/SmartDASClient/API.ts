import axios, { AxiosInstance } from 'axios';
import { BreakerSetupObject } from '../../models';

const isRunningInElectron = navigator.userAgent.toLowerCase().includes(' electron/');

export class SmartDASClient {

  public config: SmartDAS.Models.BreakerSetupObject[];
  public static readonly numberOfBreakers = 9;

  public client: AxiosInstance;

  constructor(public readonly port: number) {
    this.port = port;


    let hostname = window.location.hostname;
    if (isRunningInElectron) {
      hostname = 'localhost';
    }

    console.log({ hostname })

    const client = axios.create({
      baseURL: `http://${hostname}:${this.port}/api/`,
    });

    this.client = client;

    this.config = new Array(9).map((_, ii) => new BreakerSetupObject(ii + 1))
  }

  async getSiteSetupStructure() {
    const response = await this.client.get<SmartDAS.Models.SiteSetupStructure>('site-setup-structure')

    return response.data;
  }

  async setSiteSetupStructure(data: SmartDAS.Models.SiteSetupStructure) {
    const response = await this.client.put<SmartDAS.Models.SiteSetupStructure>('site-setup-structure', data)

    return response.data;
  }

  async getPLCConfig() {
    const response = await this.client.get<SmartDAS.Models.PLCConfig>('plc-config')

    return response.data;
  }

  async setPLCConfig(data: SmartDAS.Models.PLCConfig) {
    const response = await this.client.put<SmartDAS.Models.PLCConfig>('plc-config', data)

    return response.data;
  }

  async getBreakerConfig() {
    const response = await this.client.get<SmartDAS.Models.BreakerSetupObject[]>('breaker-config')

    return response.data;
  }

  async setBreakerConfig(breakers: BreakerSetupObject[], switchType: SmartDAS.Models.SiteSwitchType) {

    return this.setSiteSetupStructure(BreakerSetupObject.ConvertToSiteSetupStructure(breakers, switchType))
  }

  async getBreakerConfigByIndex(index: number) {
    const response = await this.client.get<SmartDAS.Models.BreakerSetupObject>(`breaker-config/${index}`)

    return response.data;
  }

  async updateBreakerConfigByIndex(index: number, data: SmartDAS.Models.BreakerSetupObject) {
    const response = await this.client.put<SmartDAS.Models.BreakerSetupObject>(`breaker-config/${index}`, data)

    return new BreakerSetupObject(index, response.data);
  }

  async getDASStatus() {
    const response = await this.client.get<SmartDAS.Models.DASStatusPayload>('das/status');

    return response.data;
  }

  async getDASActiveCommands() {
    const response = await this.client.get<SmartDAS.Models.DASActivatePayload>('das/commands');

    return response.data;
  }

  async setDASActiveCommands(data: SmartDAS.Models.DASActivatePayload) {
    const response = await this.client.put<SmartDAS.Models.DASActivatePayload>('das/commands', data);

    return response.data;
  }

  async getActiveAlarms() {
    const response = await this.client.get<SmartDAS.Models.BreakerAlarmPayload>('breaker-alarms');

    return response.data;
  }

  async getPLCNetworkConfig() {
    const response = await this.client.get<SmartDAS.Models.PLCNetworkConfig>('plc/network-configuration');

    return response.data;
  }

  async setPLCNetworkConfig(data: SmartDAS.Models.PLCNetworkConfig) {
    const response = await this.client.put<SmartDAS.Models.PLCNetworkConfig>('plc/network-configuration', data);

    return response.data;
  }

  async getPLCConnectionStatus() {
    const response = await this.client.get<SmartDAS.Models.PLCConnectionStatusPayload>('plc/test-connection');

    return response.data;
  }





}