import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'nfts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id'),
      table.string('owner_wallet', 255).notNullable(),
      table.string('token_id', 255).notNullable(),
      table.integer('event_id', 255),
      table.json('metadata').notNullable(),
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }),
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
