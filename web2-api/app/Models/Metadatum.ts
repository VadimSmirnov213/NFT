import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Metadatum extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public metadata: JSON

  @column()
  public eventId: string

  @column()
  public tokenId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
