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

@Controller('evidences')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EvidenceController {
  constructor(private readonly evidenceService: EvidenceService) {}

  @Post()
  async create(@Body() dto: CreateEvidenceDto, @Req() req: any) {
    const user = req.user;
    console.log
    return this.evidenceService.create(dto, user.id, user.role);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEvidenceDto, @Req() req: any) {
    const user = req.user;
    return this.evidenceService.update(id, dto, user.id, user.role);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    const user = req.user;
    return this.evidenceService.delete(id, user.id, user.role);
  }

  @Get()
  async getAll(@Req() req: any) {
    const user = req.user;
    return this.evidenceService.getAll(user.id, user.role);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Req() req: any) {
    const user = req.user;
    return this.evidenceService.getById(id, user.id, user.role);
  }
}
