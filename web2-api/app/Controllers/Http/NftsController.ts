import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Nft from "App/Models/Nft";
import fs from 'fs';
import Application from '@ioc:Adonis/Core/Application';

export default class NftsController {

    public async get(ctx: HttpContextContract) {
        const nftId = ctx.params.nftId
        const nft = await Nft.findOrFail(nftId);

        return nft;
    }

    public async create(ctx: HttpContextContract) {
        const newNftSchema = schema.create({
            owner_wallet: schema.string(),
            event_id: schema.string(),
            token_id: schema.string(),
            metadata: schema.string(),
        });

        const payload = await ctx.request.validate({
            schema: newNftSchema,
            messages: {
                required: 'поле {{ field }} обязательно для заполнения',
            },
        });

        if (!fs.opendirSync(Application.publicPath(`metadata/${payload.event_id}`))) {
            fs.mkdirSync(Application.publicPath(`metadata/${payload.event_id}`));
        }
        fs.writeFileSync(Application.publicPath(`metadata/${payload.event_id}/${payload.token_id}.json`), payload.metadata);

        await Nft.create({
            owner_wallet: payload.owner_wallet,
            eventId: payload.event_id,
            tokenId: payload.token_id,
            metadata: JSON.parse(payload.metadata), //можно добавить связь один ко одному к метадате (я просто не успел)
        }).catch(() => {
            return {
                status: "failed create nft", 
            };
        });

        return {
            status: "succes", 
        };  
    }

}
