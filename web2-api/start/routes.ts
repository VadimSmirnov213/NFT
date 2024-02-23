/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.group(() => {
        Route.post('/create', 'EventsController.create');
        Route.post('/get/:eventId', 'EventsController.getConcrete');
        Route.post('/getAll', 'EventsController.getAll');
    }).prefix('/events')
    Route.group(() => {
        Route.post('/create', 'NftsController.create');
        Route.post('/get/:nftId', 'NftsController.get');
    }).prefix('/nfts')
    Route.group(() => {
        Route.post('/getAllEvents', 'UsersController.getAllEvents');
        Route.post('/getAllNfts', 'UsersController.getAllNfts');
    }).prefix('/user')
}).prefix('/v1');




