import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  firstName: string;

  @Column({ length: 50, nullable: false })
  lastName: string;

  @Column({ length: 100, nullable: false, unique: true })
  email: string;

  @Column({ length: 20, nullable: false, unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  password: string;

  @CreateDateColumn()
  dateOfBirth: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastModifiedAt: Date;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  verificationCode: string;

  @Column({ nullable: true })
  verificationCodeExpirationTime: Date;

  @Column({ nullable: true })
  googleToken: string;

  @Column({ nullable: true })
  appleToken: string;
}
