import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users_tokens')
class UserToken {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { UserToken };
