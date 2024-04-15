import { ToolsRepository } from "@/repositories/tools-repository";

export class FindAToolByTagUseCase {
  constructor(private toolsRepository: ToolsRepository) {};

  async execute(tag: string, user_id: string) {
    const findByTagResponse = await this.toolsRepository.findByTags(tag, user_id);

    if (!findByTagResponse) {
      return [];
    }

    return findByTagResponse;
  }
}