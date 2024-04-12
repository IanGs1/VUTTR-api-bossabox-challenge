import { ToolsRepository } from "@/repositories/tools-repository";

interface ICreateTool {
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export class CreateToolUseCase {
  constructor(private toolsRepository: ToolsRepository) {}

  async execute(data: ICreateTool) {
    const titleAlreadyExists = await this.toolsRepository.findByTitle(data.title);
    if (titleAlreadyExists) {
      throw new Error("This Title already exists in a Tool!");
    };

    const createToolResponse = await this.toolsRepository.create(data);

    return createToolResponse;
  }
}