import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({
  cors: true,
})
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify<JwtPayload>(token);
      await this.messagesWsService.registerClient(client, payload.id);
    } catch (error) {
      console.log(error);
      client.disconnect();
      return;
    }

    // Se agrega al cliente a un room general (funciona para agrupar clientes)
    await client.join('general');
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    // Emite solamente al cliente que hizo el mensaje
    // client.emit('message-from-server', {
    //   fullName: client.id,
    //   message: payload.message ?? 'No message',
    // });

    // Emite a todos los clientes conectados, menos al que hizo el mensaje
    // client.broadcast.emit('message-from-server', {
    //   fullName: client.id,
    //   message: payload.message ?? 'No message',
    // });

    // Emite a todos los clientes conectados, incluyendo al que hizo el mensaje
    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message ?? 'No message',
    });
  }
}
