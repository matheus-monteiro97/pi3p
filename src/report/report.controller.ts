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
  import { ReportService } from './report.service';
  import { CreateReportDto } from './dto/report.createDto';
  import { UpdateReportDto } from './dto/report.updateDto';
  import { RolesGuard } from 'src/guards/roles.guard';
  import { JwtAuthGuard } from 'src/auth/jwt.guards';
  
  @Controller('reports')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class ReportController {
    constructor(private readonly reportService: ReportService) {}
  
    @Post()
    async create(@Body() dto: CreateReportDto, @Req() req: any) {
      const user = req.user;
      return this.reportService.create(dto, user.id, user.role);
    }
  
    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateReportDto, @Req() req: any) {
      const user = req.user;
      return this.reportService.update(id, dto, user.id, user.role);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string, @Req() req: any) {
      const user = req.user;
      return this.reportService.delete(id, user.id, user.role);
    }
  
    @Get()
    async getAll(@Req() req: any) {
      const user = req.user;
      return this.reportService.getAll(user.id, user.role);
    }
  
    @Get(':id')
    async getById(@Param('id') id: string, @Req() req: any) {
      const user = req.user;
      return this.reportService.getById(id, user.id, user.role);
    }
  }
  