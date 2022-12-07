import { User } from '../models/user';
import { Card } from '../models/card';

export interface BoxMistery {
  user: User;
  card: Card;
}
