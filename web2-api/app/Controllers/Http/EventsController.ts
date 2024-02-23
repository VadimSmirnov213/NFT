import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import Event from 'App/Models/Event'

export default class EventsController {

    public async getConcrete(ctx: HttpContextContract) {
        const eventId = ctx.params.eventId
        const event = await Event.findOrFail(eventId);

        return event;
    }

    public async getAll(ctx: HttpContextContract) {
        const page = ctx.request.input('page', 1);
        const limit = 20;

        const event = await Database.from('events').paginate(page, limit);

        return event;
    }

    public async create(ctx: HttpContextContract) {
        try {
            const newEventSchema = schema.create({
                owner_adress: schema.string(),
                contract_id: schema.string(),
                title: schema.string(),
                description: schema.string(),
                nft_name: schema.string(),
                nft_symbol: schema.string(),
                date_event: schema.date(),
                img: schema.string(),
            });
    
            const payload = await ctx.request.validate({
                schema: newEventSchema,
                messages: {
                    required: 'поле {{ field }} обязательно для заполнения',
                },
            });        

            await Event.create({
                contractId: payload.contract_id,
                ownerAdress: payload.owner_adress,
                title: payload.title,
                description: payload.description,
                dateEvent: payload.date_event,
                img: payload.img,
                nftName: payload.nft_name,
                nftSymbol: payload.nft_symbol,
            }).catch((err) => {
                throw err;
            });
    
            return {
              status: 'success',  
            };
        } catch (error) {
            return error;
        }
    }
    
}
