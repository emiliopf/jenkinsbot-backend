import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChannelDto {
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsNotEmpty()
    readonly createdBy: string;

    readonly isActive: boolean;
}
