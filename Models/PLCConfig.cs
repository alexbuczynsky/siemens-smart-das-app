using System.Net;
using System.Net.Sockets;

namespace PLCConfig.models {
  public class PLCConfiguration {
    private string _IP = "192.168.1.83";
    public string IP {
      get 
      { 
        return _IP;
      }
      set {
        _IP = IPAddress.Parse(value).ToString();
        saveConfiguration(); 
      }
    }

    private void saveConfiguration(){
      // TODO: Save to a text file or something
    }
  }
}