import { Payout } from './Payout';

export interface PayoutsResponse {
  total: number;
  equalShare: number;
  payout: Payout;
}
