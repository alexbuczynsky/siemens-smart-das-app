using BreakerConfigAPI.Models;

namespace BreakerConfigAPI.Database {
  /// <summary>
  /// Primative In Memory storage of breaker configuration
  /// </summary>
  public class DB {
    public static BreakerConfigManager breakerConfigManager = new BreakerConfigManager();
  }
}