export enum BreakerType {
  UNDEFINED = 0,
  WL_BREAKER = 1,
  VL_BREAKER = 2,
  VA_BREAKER = 3,
}

export function breakerTypeDisplayName(type: BreakerType) {
  switch (type) {
    case BreakerType.UNDEFINED:
      return 'Not Configured';
    case BreakerType.WL_BREAKER:
      return 'WL Breaker';
    case BreakerType.VL_BREAKER:
      return 'VL Breaker';
    case BreakerType.VA_BREAKER:
      return 'VA Breaker';
    default:
      return 'Unknown Device';
  }
}