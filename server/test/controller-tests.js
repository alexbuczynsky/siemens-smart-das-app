const { expect } = require("chai");
const Axios = require('axios').default;

const client = Axios.create({
  baseURL: 'http://localhost:36666/api/',
  validateStatus: false,
  timeout: 3000,
})

async function asyncFunc(func){
  this.timeout(5000);
  return func;
}

describe("Controller Tests", () => {

  describe("TestPLCConnectionController", () => {
    it("Should read the PLC Connection", async function () {
      this.timeout(5000);
      const response = await client.get('plc/test-connection');
      
      const data = response.data;

      expect(data).to.exist;

      expect(data.code).to.be.a('number');
      expect(data.message).to.be.a('string');
    })
  })

  describe("UpdatePLCIPController", () => {
    it("Should read PLC Network Configuration", async function(){
      this.timeout(5000);
      const response = await client.get('plc/network-configuration');
      expect(response.status).to.equal(200);
      
      const data = response.data;

      expect(data).to.exist;
      expect(data).to.haveOwnProperty('newIP1').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newIP2').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newIP3').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newIP4').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newSubnet1').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newSubnet2').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newSubnet3').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newSubnet4').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newGateway1').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newGateway2').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newGateway3').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newGateway4').and.to.be.a('number');
    })

    it("Should write PLC Network Configuration", async function(){
      this.timeout(5000);

      const testPayload = {
        newIP1: 0,
        newIP2: 0,
        newIP3: 0,
        newIP4: 0,
        newSubnet1: 0,
        newSubnet2: 0,
        newSubnet3: 0,
        newSubnet4: 0,
        newGateway1: 0,
        newGateway2: 0,
        newGateway3: 0,
        newGateway4: 0,
      };

      const response = await client.put('plc/network-configuration', testPayload);
      
      expect(response.status).to.be.oneOf([200]);

      const data = response.data;
      

      expect(data).to.exist;
      expect(data).to.haveOwnProperty('newIP1').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newIP2').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newIP3').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newIP4').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newSubnet1').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newSubnet2').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newSubnet3').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newSubnet4').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newGateway1').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newGateway2').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newGateway3').and.to.be.a('number');
      expect(data).to.haveOwnProperty('newGateway4').and.to.be.a('number');

    })
  })
})