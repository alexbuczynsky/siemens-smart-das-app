
using System;
using System.IO;

using System.Net;
using System.Net.Sockets;

namespace BreakerConfigAPI.Models {
  public class PLCConfiguration {
    private static string TEXT_FILE_NAME = "ip-plc.txt";
    private static string TEXT_FILE_PATH = Path.Combine(Directory.GetCurrentDirectory(), PLCConfiguration.TEXT_FILE_NAME);
    private string _IP = "192.168.1.83";
    public string IP {
      get 
      { 
        readConfiguration();
        return _IP;
      }
      set {
        _IP = IPAddress.Parse(value).ToString();
        saveConfiguration(); 
      }
    }

    private void saveConfiguration(){
      File.WriteAllText(PLCConfiguration.TEXT_FILE_PATH, _IP);
    }

    private void readConfiguration(){
      try{
        _IP = File.ReadAllText(PLCConfiguration.TEXT_FILE_PATH);
      }catch{
        saveConfiguration(); 
      }
      
    }
  }
}