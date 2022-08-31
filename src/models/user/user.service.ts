import { ageValidate } from '@/common/utils/user';
import { CreateUserDTO, UpdateUserDTO } from '@/models/user/dtos/user.dto';
import { PrismaService } from '@/providers/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  user: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  constructor(
    private prisma: PrismaService,
    private httpService: HttpService
  ) {
    this.user = this.prisma.user;
  }

  async index() {
    return await this.user.findMany();
  }

  async find(id?: string) {
    const user = await this.user.findFirst({ where: { id: parseInt(id) } });

    if(!user) throw new NotFoundException('User not found');

    return user;
  }

  async create(data: CreateUserDTO) {
    const { zipcode } = data;
    const user = await this.user.findFirst({ where: { document: data.document } });

    if(user) throw new BadRequestException('User already exists');

    if (ageValidate(data.birthdate) < 18) throw new BadRequestException(`User must be over 18 yo.`);

    const { data: fetchAddress } = await this.httpService.axiosRef.get(`https://viacep.com.br/ws/${zipcode}/json/`);
    if (!fetchAddress) throw new BadRequestException(`Zipcode: ${zipcode}, does not exist`);

    data.state = fetchAddress.uf;
    data.neighborhood = fetchAddress.bairro;
    data.city = fetchAddress.localidade;
    data.street = fetchAddress.logradouro;

    return await this.user.create<{ data: any }>({ data });
  }

  async update(id: string, data: UpdateUserDTO) {
    const user = await this.find(id);

    if(!user) throw new NotFoundException('User not found');

    data.updatedAt = new Date();

    return await this.user.update({ data, where: { id: user.id } });
  }

  async delete(id: string) {
    const user = await this.find(id);

    if(!user) throw new NotFoundException('User not found');

    return await this.user.delete({ where: { id: user.id } });
  }
}
