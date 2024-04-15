import prismaClient from "@/lib/prisma";

import { ICreateTool, ToolsRepository } from "../tools-repository";

export class PrismaToolsRepository implements ToolsRepository{
  async create({ title, description, link, tags }: ICreateTool, user_id: string) {
    const createToolResponse = await prismaClient.tool.create({
      data: {
        title,
        description,
        link,
        user_id,
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

  async listAll(user_id: string) {
    const allToolsResponse = await prismaClient.tool.findMany({
      where: {
        user_id,
      },
    });

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

  async findByTags(tag: string, user_id: string) {
    const allTools = await prismaClient.tool.findMany({
      where: {
        user_id
      },
    });
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

  async findByTitle(title: string, user_id: string) {
    const tool = await prismaClient.tool.findFirst({
        where: {
          title,
          user_id,
        },
    });

    return tool;
  }

  async findById(id: string, user_id: string) {
    const tool = await prismaClient.tool.findFirst({
      where: {
        id,
        user_id,
      }
    });
    
    return tool;
  };

  async delete(id: string, user_id: string) {
    await prismaClient.tag.deleteMany({
      where: {
        tool_id: id,
      },
    });
    
    await prismaClient.tool.delete({
      where: {
        id,
        user_id,
      },
    });

    return {};
  };
};