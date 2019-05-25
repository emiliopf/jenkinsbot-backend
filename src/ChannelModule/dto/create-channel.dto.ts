import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChannelDto {
    @IsNotEmpty()
    readonly name: string;

    readonly description: string;

    @IsNotEmpty()
    readonly createdBy: string;
}
