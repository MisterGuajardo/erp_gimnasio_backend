import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Get,
    Param,
    Patch,
    Delete,
    ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RegisterMemberDto } from './dtos/miembros/register-member.dto';
import { UpdateMemberDto } from './dtos/miembros/update-member.dto';
import { MemberResponseDto } from './dtos/miembros/member-response.dto';
import { RegisterMemberUseCase } from '../../application/miembros/register-member.use-case';
import { FindAllMembersUseCase } from '../../application/miembros/find-all-members.use-case';
import { FindMemberByIdUseCase } from '../../application/miembros/find-member-by-id.use-case';
import { UpdateMemberProfileUseCase } from '../../application/miembros/update-member-profile.use-case';
import { DeactivateMemberUseCase } from '../../application/miembros/deactivate-member.use-case';
import { ActivateMemberUseCase } from '../../application/miembros/activate-member.use-case';

@ApiTags('Members')
@Controller('members')
export class MembersController {
    constructor(
        private readonly registerMemberUseCase: RegisterMemberUseCase,
        private readonly findAllMembersUseCase: FindAllMembersUseCase,
        private readonly findMemberByIdUseCase: FindMemberByIdUseCase,
        private readonly updateMemberUseCase: UpdateMemberProfileUseCase,
        private readonly deactivateMemberUseCase: DeactivateMemberUseCase,
        private readonly activateMemberUseCase: ActivateMemberUseCase,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Registrar un nuevo miembro y asignarle una membresía' })
    @ApiResponse({ status: 201, description: 'Miembro registrado exitosamente.' })
    @ApiResponse({ status: 404, description: 'El plan especificado no fue encontrado.' })
    @ApiResponse({ status: 409, description: 'El email proporcionado ya está en uso (Conflict).' })
    async register(@Body() registerMemberDto: RegisterMemberDto): Promise<void> {
        await this.registerMemberUseCase.execute(registerMemberDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obtener una lista de todos los miembros' })
    @ApiResponse({ status: 200, description: 'Lista de miembros recuperada exitosamente.', type: [MemberResponseDto] })
    async findAll(): Promise<MemberResponseDto[]> {
        return this.findAllMembersUseCase.execute();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obtener los detalles de un miembro por su ID' })
    @ApiParam({ name: 'id', description: 'El ID del miembro a buscar (UUID v4)', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
    @ApiResponse({ status: 200, description: 'Miembro encontrado.', type: MemberResponseDto })
    @ApiResponse({ status: 404, description: 'El miembro con el ID especificado no fue encontrado.' })
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<MemberResponseDto> {
        return this.findMemberByIdUseCase.execute({ id });
    }

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Actualizar el perfil de un miembro (nombre y/o apellido)' })
    @ApiParam({ name: 'id', description: 'El ID del miembro a modificar (UUID v4)' })
    @ApiResponse({ status: 204, description: 'El miembro fue modificado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Miembro no encontrado.' })
    @ApiResponse({ status: 400, description: 'Los datos proporcionados son inválidos.' })
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMemberDto: UpdateMemberDto): Promise<void> {
        await this.updateMemberUseCase.execute({ id, ...updateMemberDto });
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Desactivar un miembro (Soft Delete)' })
    @ApiParam({ name: 'id', description: 'El ID del miembro a desactivar (UUID v4)' })
    @ApiResponse({ status: 204, description: 'El miembro fue desactivado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Miembro no encontrado.' })
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.deactivateMemberUseCase.execute({ id });
    }

    @Post(':id/activate')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Reactivar un miembro previamente desactivado' })
    @ApiParam({ name: 'id', description: 'El ID del miembro a reactivar (UUID v4)' })
    @ApiResponse({ status: 204, description: 'El miembro fue reactivado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Miembro no encontrado.' })
    async activate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.activateMemberUseCase.execute({ id });
    }
}