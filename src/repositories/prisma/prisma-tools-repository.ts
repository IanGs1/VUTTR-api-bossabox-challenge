import prismaClient from "@/lib/prisma";

import { ICreateTool, ToolsRepository } from "../tools-repository";

export class PrismaToolsRepository implements ToolsRepository{
  async create({ title, description, link, tags }: ICreateTool) {
    const createToolResponse = await prismaClient.tool.create({
      data: {
        title,
        description,
        link,
      }
    });

    tags.forEach(async (tag) => {
      await prismaClient.tag.create({
        data: {
          name: tag,
          tool_id: createToolResponse.id,
        }
      })
    })

    return {
      ...createToolResponse,
      tags,
    };
  };

  async listAll() {
    const allToolsResponse = await prismaClient.tool.findMany();

    const allTags = await prismaClient.tag.findMany();
    const allToolsWithTags = allToolsResponse.map((tool) => {
      const tags = allTags.filter(tag => tag.tool_id === tool.id);

      return {
        ...tool,
        tags: tags.map(tag => tag.name),
      }
    });

    return allToolsWithTags;
  };

  async findByTags(tag: string) {
    const allTools = await prismaClient.tool.findMany();
    const allTags = await prismaClient.tag.findMany();
    
    const allTagsWithTheSameName = await prismaClient.tag.findMany({
      where: {
        name: tag,
      }
    });

    const toolsWithTags = allTagsWithTheSameName.map(tag => {
      const [tool] = allTools.filter(tool => tool.id === tag.tool_id);
      const tags = allTags.filter(tag => tag.tool_id === tool.id);

      return {
        ...tool,
        tags: tags.map(tag => tag.name),
      };
    });

    return toolsWithTags
  }

  async findByTitle(title: string) {
    const tool = await prismaClient.tool.findFirst({
        where: {
          title,
        }
    });

    return tool;
  }

  async findById(id: string) {
    const tool = await prismaClient.tool.findFirst({
      where: {
        id,
      }
    });
    
    return tool;
  };

  async delete(id: string) {
    await prismaClient.tool.delete({
      where: {
        id,
      }
    });

    return {};
  };
};