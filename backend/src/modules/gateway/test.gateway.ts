// import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

// @WebSocketGateway({
//     cors: {
//         origin: ['*'],
//         credentials: true,
//     },
//     transports: ['websocket', 'polling'],
//     // namespace: 'test'
// })
// export class TestGateway{
//     @WebSocketServer()
//     server:any;

//     // @SubscribeMessage('otherWay')
//     // handleEvent(
//     //     @MessageBody() data: string,
//     //     @ConnectedSocket() client: any,
//     // ): string {
//     //     console.log(data, client)
//     //     return data;
//     // }

//     // @SubscribeMessage('otherWay')
//     // handleMessage(client, data): void {
//     //     console.log(client)
//     //     console.log(data)
//     // } //outra forma de pegar mensagem

//     @SubscribeMessage('test')
//     handleMessage(@MessageBody() message: string): void {
//         this.server.emit('test', message); //broadcast message to everyone on server
//     }
// }