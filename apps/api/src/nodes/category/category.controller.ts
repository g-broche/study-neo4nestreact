import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JsonQueryResponse } from 'src/interface/jsonResponse';

@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async findAll(): Promise<JsonQueryResponse> {
    const queryResult = await this.categoryService.getCategories();
    return { data: queryResult };
  }
}
