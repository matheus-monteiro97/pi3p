import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { EvidenceService } from './evidence.service';
import { CreateEvidenceDto } from './dto/evidence.createDto';
import { UpdateEvidenceDto } from './dto/evidence.updateDto';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guards';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Evidências')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('evidences')
export class EvidenceController {
  constructor(private readonly evidenceService: EvidenceService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova evidência' })
  async create(@Body() dto: CreateEvidenceDto, @Req() req: any) {
    const user = req.user;
    return this.evidenceService.create(dto, user.id, user.role);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma evidência' })
  @ApiParam({ name: 'id', description: 'ID da evidência', type: String })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEvidenceDto,
    @Req() req: any,
  ) {
    const user = req.user;
    return this.evidenceService.update(id, dto, user.id, user.role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover (soft delete) uma evidência' })
  @ApiParam({ name: 'id', description: 'ID da evidência', type: String })
  async delete(@Param('id') id: string, @Req() req: any) {
    const user = req.user;
    return this.evidenceService.delete(id, user.id, user.role);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as evidências' })
  async getAll(@Req() req: any) {
    const user = req.user;
    return this.evidenceService.getAll(user.id, user.role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar evidência por ID' })
  @ApiParam({ name: 'id', description: 'ID da evidência', type: String })
  async getById(@Param('id') id: string, @Req() req: any) {
    const user = req.user;
    return this.evidenceService.getById(id, user.id, user.role);
  }
}