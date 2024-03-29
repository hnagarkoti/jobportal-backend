import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Skills extends Model<Skills> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  score: number;
}
