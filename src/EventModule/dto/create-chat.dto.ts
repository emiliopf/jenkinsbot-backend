import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
    @IsNotEmpty()
    readonly uuid: string;

    @IsString()
    readonly description: string;

    readonly event: string;
}
