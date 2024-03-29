import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id'),
      table.string('owner_adress', 255).notNullable(),
      table.string('contract_id', 255).notNullable(),
      table.string('title', 255).notNullable(),
      table.string('description', 255).notNullable(),
      table.string('nft_name', 255).notNullable(),
      table.string('nft_symbol', 255).notNullable(),
      table.string('img', 255).notNullable(),
      table.timestamp('date_event', { useTz: true }).notNullable(),

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }),
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
