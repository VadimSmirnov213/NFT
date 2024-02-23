import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Metadatum from 'App/Models/Metadatum'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class MetadataController {
    public async get(ctx: HttpContextContract) {
        const eventId = ctx.params.eventId
        const nftId = ctx.params.nftId

        const metaData = await Metadatum.query().where('eventId', eventId).where('tokenId', nftId).firstOrFail();

        return metaData.metadata;
    }

    public async create(ctx: HttpContextContract) {
        const newMetaDataSchema = schema.create({
            event_id: schema.string(),
            token_id: schema.string(),
            metadata: schema.string(),
        });

        const payload = await ctx.request.validate({
            schema: newMetaDataSchema,
            messages: {
                required: 'поле {{ field }} обязательно для заполнения',
            },
        });

        await Metadatum.create({
            eventId: payload.event_id,
            tokenId: payload.token_id,
            metadata: JSON.parse(payload.metadata),
        }).catch(() => {
            return {
                status: "failed", 
            };
        });

        return {
            status: "succes", 
        };  
    }

}
