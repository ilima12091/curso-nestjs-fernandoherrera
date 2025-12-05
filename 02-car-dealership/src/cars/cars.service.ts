import { Injectable, NotFoundException } from '@nestjs/common';

import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dtos';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Ford',
      model: 'Mustang',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car with id '${id}' not found`);
    }

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let storedCar = this.findOneById(id);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        storedCar = { ...storedCar, ...updateCarDto, id };
        return storedCar;
      }

      return car;
    });

    return storedCar;
  }

  delete(id: string) {
    this.findOneById(id);

    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
