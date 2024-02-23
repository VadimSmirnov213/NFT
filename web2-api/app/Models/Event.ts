import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public contractId: string

  @column()
  public ownerAdress: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public img: string

  @column()
  public nftName: string

  @column()
  public nftSymbol: string

  @column.dateTime()
  public dateEvent: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
