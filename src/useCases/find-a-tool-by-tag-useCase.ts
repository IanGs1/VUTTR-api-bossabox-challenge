import { ToolsRepository } from "@/repositories/tools-repository";

export class FindAToolByTagUseCase {
  constructor(private toolsRepository: ToolsRepository) {};

  async execute(tag: string) {
    const findByTagResponse = await this.toolsRepository.findByTags(tag);

    if (!findByTagResponse) {
      return [];
    }

    return findByTagResponse;
  }
}