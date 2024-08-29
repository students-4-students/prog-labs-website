import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DataSource,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => UserEvent, (userEvent) => userEvent.userId)
  events!: UserEvent[];
}

@Entity()
class UserEvent {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  eventName!: string;

  @Column()
  language!: string;

  @Column()
  rating!: number;

  @Column()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  userId!: number;
}

export { User, UserEvent };

export const Postgres = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [User, UserEvent],
  subscribers: [],
  migrations: [],
});

let initialized = false;

export const getOrInitializePostgres = async () => {
  if (initialized) return Postgres;
  else {
    await Postgres.initialize();
    initialized = true;
    return Postgres;
  }
};
