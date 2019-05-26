import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
    @IsNotEmpty()
    readonly code: string;

    @IsString()
    readonly description: string;
}
