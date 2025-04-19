import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    Patch,
    Delete,
    UseGuards,
    Req,
    Query,
  } from '@nestjs/common';
  import { CaseService } from './case.service';
  import { CreateCaseDto } from './dto/case.createDto';
  import { UpdateCaseDto } from './dto/case.updateDto';
  import { JwtAuthGuard } from 'src/auth/jwt.guards';
  import { RolesGuard } from 'src/guards/roles.guard';
  import { Role } from 'src/decorators/role.decorator';
  import { Request } from 'express';
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Controller('cases')
  export class CaseController {
    constructor(private readonly caseService: CaseService) {}
  
    @Post()
    @Role('ADMIN', 'PERITO')
    async create(@Body() dto: CreateCaseDto, @Req() req: Request) {
      const user = req.user as any;
      return this.caseService.create(dto, user.id);
    }
  
    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateCaseDto, @Req() req: Request) {
      const user = req.user as any;
      return this.caseService.update(id, dto, user);
    }
  
    @Delete(':id')
    @Role('ADMIN', 'PERITO')
    async delete(@Param('id') id: string, @Req() req: Request) {
      const user = req.user as any;
      return this.caseService.delete(id, user);
    }
  
    @Get()
    async getAll(@Req() req: Request, @Query() query) {
      const user = req.user as any;
    
      return this.caseService.getAll(user, {
        startOpeningDate: query.startOpeningDate,
        endOpeningDate: query.endOpeningDate,
        statusCase: query.statusCase,
        managerId: query.managerId,
      });
    }    
    
    @Get(':id')
    async getById(@Param('id') id: string, @Req() req: Request) {
      const user = req.user as any;
      return this.caseService.getById(id, user);
    }
  }
  