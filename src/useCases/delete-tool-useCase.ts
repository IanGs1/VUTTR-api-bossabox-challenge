import { ToolsRepository } from "@/repositories/tools-repository";

export class DeleteToolUseCase {
  constructor(private toolsRepository: ToolsRepository) {};

  async execute(id: string, user_id: string) {
    const toolExists = await this.toolsRepository.findById(id, user_id);
    if (!toolExists) {
      throw new Error("This is not a valid ID!");
    };

    const deleteToolResponse = this.toolsRepository.delete(id, user_id);

    return deleteToolResponse;
  }
}