import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
} from '@ioc:Adonis/Lucid/Orm'

export default class Nft extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public owner_wallet: string

  @column()
  public eventId: string

  @column()
  public tokenId: string

  @column()
  public metadata: JSON

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
