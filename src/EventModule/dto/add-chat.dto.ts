import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddChatDto {
    @IsNotEmpty()
    @IsNumber()
    readonly idChat: number;
}
