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
  import { ComparisonResultService } from './comparison.service';
  import { CreateComparisonResultDto } from './dto/comparison.createDto';
  import { UpdateComparisonResultDto } from './dto/comparison.updateDto';
  import { RolesGuard } from 'src/guards/roles.guard';
  import { JwtAuthGuard } from 'src/auth/jwt.guards';
  
  @Controller('comparison-result')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class ComparisonResultController {
    constructor(private readonly comparisonResultService: ComparisonResultService) {}
  
    @Post()
    async create(@Body() dto: CreateComparisonResultDto, @Req() req: any) {
      const user = req.user;
      return this.comparisonResultService.create(dto, user.id, user.role);
    }
  
    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateComparisonResultDto, @Req() req: any) {
      const user = req.user;
      return this.comparisonResultService.update(id, dto, user.id, user.role);
    }
  
    @Get()
    async getAll(@Req() req: any) {
      const user = req.user;
      return this.comparisonResultService.findAll(user.id, user.role);
    }
  
    @Get(':id')
    async getById(@Param('id') id: string, @Req() req: any) {
      const user = req.user;
      return this.comparisonResultService.findOne(id, user.id, user.role);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string, @Req() req: any) {
      const user = req.user;
      return this.comparisonResultService.remove(id, user.id, user.role);
    }
  }
  