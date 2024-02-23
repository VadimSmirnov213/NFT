import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import { schema } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
    protected ownerAdressSchema = schema.create({
        owner_adress: schema.string(),
    });

    public async getAllNfts(ctx: HttpContextContract) {
        const page = ctx.request.input('page', 1);
        const payload = await ctx.request.validate({
            schema: this.ownerAdressSchema,
            messages: {
                required: 'поле {{ field }} обязательно для заполнения',
            },
        });
        const limit = 20;

        const userNfts = await Database.from('nfts').where('owner_wallet', payload.owner_adress).paginate(page, limit);

        return userNfts;
    }

    public async getAllEvents(ctx: HttpContextContract) {
        const page = ctx.request.input('page', 1);
        const payload = await ctx.request.validate({
            schema: this.ownerAdressSchema,
            messages: {
                required: 'поле {{ field }} обязательно для заполнения',
            },
        });
        const limit = 20;

        const userEvents = await Database.from('events').where('owner_adress', payload.owner_adress).paginate(page, limit);

        return userEvents;
    }
}
