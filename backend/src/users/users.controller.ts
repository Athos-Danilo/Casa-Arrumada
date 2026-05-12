import { Controller, Get, Post, Body, Request, UseGuards, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('ranking')
  getRanking() {
    return this.usersService.getRanking();
  }

  @Get('me')
  async getMe(@Request() req) {
    const user = await this.usersService.findOneById(req.user.userId);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }
    const { passwordHash, ...result } = user;
    return result;
  }

  @Get('redemptions')
  async getRedemptions(@Request() req) {
    return this.usersService.getMyRedemptions(req.user.userId);
  }

  @Post('redeem')
  async redeem(@Request() req, @Body() body: { points: number, rewardTitle: string }) {
    try {
      const user = await this.usersService.redeemPoints(req.user.userId, body.points, body.rewardTitle);
      const { passwordHash, ...result } = user;
      return result;
    } catch (e: any) {
      throw new BadRequestException(e.message);
    }
  }
}
