import { ToolsRepository } from "@/repositories/tools-repository";


export class ListAllToolsUseCase {
  constructor(private toolsRepository: ToolsRepository) {}
  
  async execute(user_id: string) {
    const listAllToolsResponse = await this.toolsRepository.listAll(user_id);

    return listAllToolsResponse;
  }
}