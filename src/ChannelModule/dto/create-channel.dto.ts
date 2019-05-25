import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChannelDto {
    @IsNotEmpty()
    readonly uuid: string;

    readonly description: string;

    @IsNotEmpty()
    readonly createdBy: string;
}
