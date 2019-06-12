import axios, { AxiosInstance } from 'axios';
import { BreakerSetupObject } from '../../models';

const isRunningInElectron = navigator.userAgent.toLowerCase().includes(' electron/');

export class SmartDASClient {

  public config: SmartDAS.Models.BreakerSetupObject[];
  public static readonly numberOfBreakers = 9;

  private axios: AxiosInstance;

  constructor(public readonly port: number) {
    this.port = port;


    let hostname = window.location.hostname;
    if (isRunningInElectron) {
      hostname = 'localhost';
    }

    console.log({ hostname })

    this.axios = axios.create({
      baseURL: `http://${hostname}:${this.port}/api/`,
    });

    this.config = new Array(9).fill(new BreakerSetupObject())
  }

  async getSiteSetupStructure() {
    const response = await this.axios.get<SmartDAS.Models.SiteSetupStructure>('site-setup-structure')

    return response.data;
  }

  async setSiteSetupStructure(data: SmartDAS.Models.SiteSetupStructure) {
    const response = await this.axios.put<SmartDAS.Models.SiteSetupStructure>('site-setup-structure', data)

    return response.data;
  }

  async getPLCConfig() {
    const response = await this.axios.get<SmartDAS.Models.PLCConfig>('plc-config')

    return response.data;
  }

  async setPLCConfig(data: SmartDAS.Models.PLCConfig) {
    const response = await this.axios.put<SmartDAS.Models.PLCConfig>('plc-config', data)

    return response.data;
  }

  async getBreakerConfig() {
    const response = await this.axios.get<SmartDAS.Models.BreakerSetupObject[]>('breaker-config')

    return response.data;
  }

  async getBreakerConfigByIndex(index: number) {
    const response = await this.axios.get<SmartDAS.Models.BreakerSetupObject>(`breaker-config/${index}`)

    return response.data;
  }

  async updateBreakerConfigByIndex(index: number, data: SmartDAS.Models.BreakerSetupObject) {
    const response = await this.axios.put<SmartDAS.Models.BreakerSetupObject>(`breaker-config/${index}`, data)

    return response.data;
  }




}