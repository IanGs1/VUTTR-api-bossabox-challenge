import { ToolsRepository } from "@/repositories/tools-repository";


export class ListAllToolsUseCase {
  constructor(private toolsRepository: ToolsRepository) {}
  
  async execute() {
    const listAllToolsResponse = await this.toolsRepository.listAll();

    return listAllToolsResponse;
  }
}