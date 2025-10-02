import { Controller, Post, Body, HttpCode, HttpStatus, Patch, Param, Delete, Get } from '@nestjs/common';
import { CreatePlanUseCase } from 'src/memberships/application/planes/create-plan.use-case';
import { CreatePlanDto } from './dtos/planes/create-plan.dto';
import { UpdatePlanDto } from './dtos/planes/update-plan.dto';
import { UpdatePlanUseCase } from 'src/memberships/application/planes/update-plan.use-case';
import { DeactivatePlanUseCase } from 'src/memberships/application/planes/deactivate-plan.use-case';
import { ActivatePlanUseCase } from 'src/memberships/application/planes/activate-plan.use-case';
import { FindAllPlansUseCase } from 'src/memberships/application/planes/find-all-plans.use-case';
import { FindOnePlanUseCase } from 'src/memberships/application/planes/find-one-plan.use-case';
import { PlanResponseDto } from './dtos/planes/plan-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Plans')
@Controller('plans')
export class MembershipsController {
    constructor(
        private readonly createPlanUseCase: CreatePlanUseCase,
        private readonly updatePlanUseCase: UpdatePlanUseCase,
        private readonly deactivatePlanUseCase: DeactivatePlanUseCase,
        private readonly activatePlanUseCase: ActivatePlanUseCase,
        private readonly findAllPlansUseCase: FindAllPlansUseCase,
        private readonly findOnePlanUseCase: FindOnePlanUseCase,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Crear un nuevo plan de membresía' })
    @ApiResponse({ status: 201, description: 'El plan fue creado exitosamente.' })
    @ApiResponse({ status: 400, description: 'Los datos proporcionados son inválidos.' })
    async findAll(): Promise<PlanResponseDto[]> {
        return this.findAllPlansUseCase.execute();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obtener una lista de todos los planes' })
    @ApiResponse({ status: 200, description: 'Lista de planes recuperada exitosamente.', type: [PlanResponseDto] })
    async findOne(@Param('id') id: string): Promise<PlanResponseDto> {
        return this.findOnePlanUseCase.execute({ id });
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Obtener un plan por su ID' })
    @ApiParam({ name: 'id', description: 'El ID del plan a buscar (UUID)' })
    @ApiResponse({ status: 200, description: 'Plan encontrado.', type: PlanResponseDto })
    @ApiResponse({ status: 404, description: 'El plan con el ID especificado no fue encontrado.' })
    async create(@Body() createPlanDto: CreatePlanDto): Promise<void> {
        await this.createPlanUseCase.execute(createPlanDto);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Modificar un plan existente' })
    @ApiParam({ name: 'id', description: 'El ID del plan a modificar (UUID)' })
    @ApiResponse({ status: 204, description: 'El plan fue modificado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Plan no encontrado.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    async update(
        @Param('id') id: string,
        @Body() updatePlanDto: UpdatePlanDto,
    ): Promise<void> {
        await this.updatePlanUseCase.execute({ id, ...updatePlanDto });
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Desactivar un plan (Soft Delete)' })
    @ApiParam({ name: 'id', description: 'El ID del plan a desactivar (UUID)' })
    @ApiResponse({ status: 204, description: 'El plan fue desactivado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Plan no encontrado.' })
    async delete(@Param('id') id: string): Promise<void> {
        await this.deactivatePlanUseCase.execute({ id });
    }

    @Post(':id/activate')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Reactivar un plan desactivado' })
    @ApiParam({ name: 'id', description: 'El ID del plan a reactivar (UUID)' })
    @ApiResponse({ status: 204, description: 'El plan fue reactivado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Plan no encontrado.' })
    async activate(@Param('id') id: string): Promise<void> {
        await this.activatePlanUseCase.execute({ id });
    }
}