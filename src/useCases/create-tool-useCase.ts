import { ToolsRepository } from "@/repositories/tools-repository";

interface ICreateTool {
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export class CreateToolUseCase {
  constructor(private toolsRepository: ToolsRepository) {}

  async execute(data: ICreateTool, user_id: string) {
    const titleAlreadyExists = await this.toolsRepository.findByTitle(data.title, user_id);
    if (titleAlreadyExists) {
      throw new Error("This Title already exists in a Tool!");
    };

    const createToolResponse = await this.toolsRepository.create(data, user_id);

    return createToolResponse;
  }
}